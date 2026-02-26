'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type AuthGateProps = {
  children: React.ReactNode;
};

const SESSION_DURATION_MS = 1 * 60 * 1000;

export default function AuthGate({ children }: AuthGateProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const pending = localStorage.getItem('payflow-pending');

    if (pending && !localStorage.getItem('payflow-auth')) {
      router.replace('/otp');
      return;
    }

    if (!localStorage.getItem('payflow-auth')) {
      router.replace('/login');
      return;
    }

    const checkExpiry = () => {
      const session = localStorage.getItem('payflow-auth');
      if (!session) {
        router.replace('/login');
        return;
      }

      try {
        const parsed = JSON.parse(session) as { expiresAt?: number; role?: string };
        if (!parsed.expiresAt) {
          const nextExpiresAt = Date.now() + SESSION_DURATION_MS;
          localStorage.setItem(
            'payflow-auth',
            JSON.stringify({ ...parsed, expiresAt: nextExpiresAt })
          );
          return;
        }
        if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
          localStorage.removeItem('payflow-auth');
          setIsExpired(true);
          return;
        }

        if (pathname.startsWith('/oversight') && parsed.role !== 'super-admin') {
          router.replace('/');
        }
      } catch {
        localStorage.removeItem('payflow-auth');
        setIsExpired(true);
      }
    };

    checkExpiry();
    setIsReady(true);

    const intervalId = window.setInterval(checkExpiry, 1000);
    return () => window.clearInterval(intervalId);
  }, [pathname, router]);

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-500">
        Checking your session...
      </div>
    );
  }

  return (
    <div className="relative">
      <div className={isExpired ? 'blur-sm pointer-events-none select-none' : undefined}>
        {children}
      </div>
      {isExpired ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Session expired
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Your session timed out. Please log in again to continue.
            </p>
            <button
              type="button"
              onClick={() => router.replace('/login')}
              className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900"
            >
              Return to login
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
