'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Bell, ChevronDown, Search } from 'lucide-react';
import { apiFetch, getStoredSession } from '@/lib/api';

export default function TopNav() {
    const router = useRouter();
    const [profileOpen, setProfileOpen] = useState(false);
    const [notificationsOn, setNotificationsOn] = useState(true);
    const profileRef = useRef<HTMLDivElement | null>(null);
    const [roleLabel, setRoleLabel] = useState('Admin');

    const handleLogout = async () => {
        const session = getStoredSession();
        if (session?.refreshToken) {
            try {
                await apiFetch('/auth/logout', {
                    method: 'POST',
                    body: { refreshToken: session.refreshToken },
                    token: session.accessToken ?? null,
                });
            } catch {
                // Ignore logout errors and clear local session anyway.
            }
        }
        localStorage.removeItem('payflow-auth');
        localStorage.removeItem('payflow-pending');
        router.push('/login');
    };

    useEffect(() => {
        const session = localStorage.getItem('payflow-auth');
        if (session) {
            try {
                const parsed = JSON.parse(session) as { role?: string };
                setRoleLabel(parsed.role === 'super-admin' ? 'Super Admin' : 'Admin');
            } catch {
                setRoleLabel('Admin');
            }
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target as Node)
            ) {
                setProfileOpen(false);
            }
        };

        if (profileOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [profileOpen]);

    return (
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
            <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
                <div className="flex flex-1 items-center gap-3">
                    <div className="relative w-full max-w-md">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        <input
                            type="search"
                            placeholder="Search transactions, customers, payouts..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => setNotificationsOn((prev) => !prev)}
                        className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                            notificationsOn
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200'
                            : 'border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                        aria-pressed={notificationsOn}
                    >
                        <Bell className="h-5 w-5" />
                        {notificationsOn ? 'Notifications on' : 'Notifications off'}
                    </button>

                    <div className="relative" ref={profileRef}>
                        <button
                            type="button"
                            onClick={() => setProfileOpen((prev) => !prev)}
                            className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-2 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                            aria-expanded={profileOpen}
                            aria-haspopup="menu"
                        >
                            <img
                                src="https://i.pravatar.cc/80?img=15"
                                alt="Profile"
                                className="h-8 w-8 rounded-full object-cover"
                            />
                            <span className="hidden text-sm sm:inline">Amara Lewis</span>
                            <span className="hidden rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-semibold text-slate-500 sm:inline dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                {roleLabel}
                            </span>
                            <ChevronDown className="h-5 w-5 text-slate-400" />
                        </button>

                            {profileOpen ? (
                            <div className="absolute right-0 mt-3 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900">
                                <button
                                    type="button"
                                    className="block w-full px-4 py-3 text-left text-sm text-slate-600 transition hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                                >
                                    Profile
                                </button>
                                <button
                                    type="button"
                                    className="block w-full px-4 py-3 text-left text-sm text-slate-600 transition hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                                >
                                    Settings
                                </button>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="block w-full px-4 py-3 text-left text-sm text-rose-500 transition hover:bg-rose-50 dark:hover:bg-rose-500/10"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </header>
    );
}