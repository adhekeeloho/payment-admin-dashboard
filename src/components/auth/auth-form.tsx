'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { apiFetch } from '@/lib/api';

type AuthMode = 'login' | 'signup';
type UserRole = 'admin' | 'super-admin';

type AuthFormProps = {
  mode: AuthMode;
};

const SESSION_DURATION_MS = 1 * 60 * 1000;

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('admin');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isSignup = mode === 'signup';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail || !password) {
      setError('Please enter an email and password.');
      setIsLoading(false);
      return;
    }

    if (isSignup && password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    if (isSignup && password !== confirmPassword) {
      setError('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      if (isSignup) {
        await apiFetch('/auth/register', {
          method: 'POST',
          body: {
            email: trimmedEmail,
            password,
          },
        });

        // After registration, go to OTP page for account setup/verification
        if (typeof window !== 'undefined') {
          localStorage.setItem(
            'payflow-pending',
            JSON.stringify({
              email: trimmedEmail,
              requestedAt: new Date().toISOString(),
              role,
              source: 'register',
            })
          );
        }

        router.push('/otp');
        setIsLoading(false);
        return;
      }

      // Login — get tokens directly, no OTP step
      const loginResponse = await apiFetch<{
        accessToken?: string;
        refreshToken?: string;
        expiresIn?: number;
      }>('/auth/login', {
        method: 'POST',
        body: {
          email: trimmedEmail,
          password,
          role,
        },
      });

      const expiresAt = loginResponse?.expiresIn
        ? Date.now() + loginResponse.expiresIn * 1000
        : Date.now() + SESSION_DURATION_MS;

      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'payflow-auth',
          JSON.stringify({
            email: trimmedEmail,
            mode: 'login',
            lastLogin: new Date().toISOString(),
            expiresAt,
            role,
            accessToken: loginResponse?.accessToken ?? null,
            refreshToken: loginResponse?.refreshToken ?? null,
          })
        );
      }

      router.push('/');
    } catch (err) {
      setError('Unable to authenticate. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="email">
          Work email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          placeholder="you@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete={isSignup ? 'new-password' : 'current-password'}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
          placeholder={isSignup ? 'Create a secure password' : 'Enter your password'}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="role">
          Role
        </label>
        <select
          id="role"
          value={role}
          onChange={(event) => setRole(event.target.value as UserRole)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
        >
          <option value="admin">Admin</option>
          <option value="super-admin">Super Admin</option>
        </select>
      </div>

      {isSignup ? (
        <div className="space-y-2">
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="confirmPassword"
          >
            Confirm password
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
      ) : null}

      {error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {isLoading
          ? isSignup
            ? 'Creating account...'
            : 'Logging in...'
          : isSignup
          ? 'Create account'
          : 'Log in'}
      </button>

      <p className="text-center text-sm text-slate-500">
        {isSignup ? 'Already have an account?' : 'New to Payflow?'}{' '}
        <a
          className="font-semibold text-slate-900 hover:underline"
          href={isSignup ? '/login' : '/signup'}
        >
          {isSignup ? 'Log in' : 'Create one'}
        </a>
      </p>
    </form>
  );
}
