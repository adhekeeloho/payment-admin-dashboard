'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
    LayoutDashboard,
    ArrowLeftFromLine,
    ArrowRightFromLine,
    ReceiptText,
    Users,
    Wallet,
    Settings,
    Menu,
    X,
    LineChart,
    MessageCircle,
    Shield,
} from 'lucide-react';

const navItems = [
    { label: 'Dashboard', href: '/', icon: LayoutDashboard },
    { label: 'Analytics', href: '/analytics', icon: LineChart },
    { label: 'Transactions', href: '/transactions', icon: ReceiptText },
    { label: 'Customers', href: '/customers', icon: Users },
    { label: 'Payouts', href: '/payouts', icon: Wallet },
    { label: 'Support', href: '/support', icon: MessageCircle },
    { label: 'Settings', href: '/settings', icon: Settings },
];

const superAdminItems = [
    { label: 'Oversight', href: '/oversight', icon: Shield },
];

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const pathname = usePathname();
    const [role, setRole] = useState('admin');

    const closeMobile = () => setIsMobileOpen(false);

    useEffect(() => {
        const session = localStorage.getItem('payflow-auth');
        if (session) {
            try {
                const parsed = JSON.parse(session) as { role?: string };
                setRole(parsed.role ?? 'admin');
            } catch {
                setRole('admin');
            }
        }
    }, []);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsMobileOpen(true)}
                className="fixed left-4 top-4 z-30 rounded-full border border-slate-200 bg-white/90 p-2 text-slate-600 shadow-sm backdrop-blur transition hover:text-slate-900 md:hidden dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-200"
                aria-label="Open sidebar"
            >
                <Menu size={18} />
            </button>

            {isMobileOpen ? (
                <button
                    type="button"
                    onClick={closeMobile}
                    className="fixed inset-0 z-20 bg-slate-900/30 backdrop-blur-sm md:hidden"
                    aria-label="Close sidebar"
                />
            ) : null}

            <aside
                className={`fixed left-0 top-0 z-30 flex h-screen flex-col border-r border-slate-200 bg-white/95 backdrop-blur transition-all md:sticky md:z-10 dark:border-slate-800 dark:bg-slate-900/95 ${
                    isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                } ${isOpen ? 'w-72' : 'w-20'}`}
            >
                <div className="flex items-center justify-between px-5 py-6">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white dark:bg-slate-100 dark:text-slate-900">
                            P
                        </div>
                        <div className={`${isOpen ? 'block' : 'hidden'}`}>
                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Payflow</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Admin Console</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setIsOpen((prev) => !prev)}
                            className="hidden rounded-lg p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 md:inline-flex dark:text-slate-300 dark:hover:bg-slate-800"
                            aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
                        >
                            {isOpen ? <ArrowLeftFromLine size={18} /> : <ArrowRightFromLine size={18} />}
                        </button>
                        <button
                            type="button"
                            onClick={closeMobile}
                            className="rounded-lg p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 md:hidden dark:text-slate-300 dark:hover:bg-slate-800"
                            aria-label="Close sidebar"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                <nav className="flex-1 space-y-2 px-4">
                    {[...navItems, ...(role === 'super-admin' ? superAdminItems : [])].map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={closeMobile}
                                className={`group flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium transition ${
                                    isActive
                                        ? 'bg-slate-900 text-white shadow-sm dark:bg-slate-100 dark:text-slate-900'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                                }`}
                                title={item.label}
                            >
                                <item.icon
                                    className={`h-5 w-5 ${
                                        isActive
                                            ? 'text-white dark:text-slate-900'
                                            : 'text-slate-500 group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-slate-100'
                                    }`}
                                />
                                <span className={`${isOpen ? 'block' : 'hidden'}`}>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="px-5 pb-6">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                        {isOpen ? (
                            <p>
                                Scheduled payout:{' '}
                                <span className="font-semibold text-slate-700 dark:text-slate-200">$12,430</span>
                            </p>
                        ) : (
                            <p className="text-center font-semibold text-slate-600 dark:text-slate-200">$12k</p>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}