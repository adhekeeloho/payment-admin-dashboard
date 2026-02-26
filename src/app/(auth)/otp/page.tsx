'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '@/lib/api';

const SESSION_DURATION_MS = 1 * 60 * 1000;

export default function OtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(Array.from({ length: 6 }, () => ''));
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    const pending = localStorage.getItem('payflow-pending');
    if (!pending) {
      router.replace('/login');
      return;
    }
    try {
      const parsed = JSON.parse(pending);
      setPendingEmail(parsed?.email ?? '');
    } catch {
      // ignore
    }
  }, [router]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) {
      return;
    }
    const next = [...otp];
    next[index] = value;
    setOtp(next);

    if (value && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !otp[index] && inputsRef.current[index - 1]) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    const code = otp.join('');

    if (code.length < 6) {
      setError('Enter the 6-digit code to continue.');
      setIsLoading(false);
      return;
    }

    try {
      const pendingRaw = localStorage.getItem('payflow-pending');
      const pending = pendingRaw ? JSON.parse(pendingRaw) : null;

      const verifyResponse = await apiFetch<{
        accessToken?: string;
        refreshToken?: string;
        expiresIn?: number;
      }>('/auth/otp/verify', {
        method: 'POST',
        body: {
          email: pending?.email,
          code,
          requestId: pending?.requestId,
        },
      });

      const expiresAt = verifyResponse?.expiresIn
        ? Date.now() + verifyResponse.expiresIn * 1000
        : Date.now() + SESSION_DURATION_MS;

      localStorage.setItem(
        'payflow-auth',
        JSON.stringify({
          email: pending?.email,
          mode: 'login',
          lastLogin: new Date().toISOString(),
          expiresAt,
          role: pending?.role ?? 'admin',
          accessToken: verifyResponse?.accessToken ?? null,
          refreshToken: verifyResponse?.refreshToken ?? null,
        })
      );
      localStorage.removeItem('payflow-pending');

      router.push('/');
    } catch (err) {
      setError('OTP verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const pendingRaw = localStorage.getItem('payflow-pending');
      const pending = pendingRaw ? JSON.parse(pendingRaw) : null;
      await apiFetch('/auth/otp/request', {
        method: 'POST',
        body: {
          email: pending?.email,
        },
      });
      setError('A new OTP was requested.');
    } catch (err) {
      setError('Unable to request a new OTP.');
    }
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Account Setup
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Verify your email</h1>
        <p className="text-sm text-slate-500">
          We sent a 6-digit verification code to{' '}
          {pendingEmail ? (
            <span className="font-medium text-slate-700">{pendingEmail}</span>
          ) : (
            'your email address'
          )}
          . Enter it below to complete your registration and get started.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex items-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                inputsRef.current[index] = element;
              }}
              value={digit}
              onChange={(event) => handleChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              inputMode="numeric"
              maxLength={1}
              className="h-12 w-12 rounded-xl border border-slate-200 bg-white text-center text-lg font-semibold text-slate-900 shadow-sm outline-none transition focus:border-slate-400"
            />
          ))}
        </div>

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
          {isLoading ? 'Verifying...' : 'Complete setup'}
        </button>

        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Did not receive a code?</span>
          <button
            type="button"
            className="font-semibold text-slate-900 hover:underline"
            onClick={handleResend}
          >
            Resend
          </button>
        </div>
      </form>
    </div>
  );
}
