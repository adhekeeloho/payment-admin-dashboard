'use client';

import { useState } from 'react';

const Filters: React.FC = () => {
    const [toast, setToast] = useState('');

    const showToast = (message: string) => {
        setToast(message);
        window.setTimeout(() => setToast(''), 2000);
    };

    return (
        <section className="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-end gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="start-date" className="text-xs font-semibold text-slate-500">
                        Start date
                    </label>
                    <input
                        type="date"
                        id="start-date"
                        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="end-date" className="text-xs font-semibold text-slate-500">
                        End date
                    </label>
                    <input
                        type="date"
                        id="end-date"
                        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="status" className="text-xs font-semibold text-slate-500">
                        Status
                    </label>
                    <select
                        id="status"
                        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-300 focus:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                    >
                        <option value="">All</option>
                        <option value="success">Success</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>
                <div className="ml-auto flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => showToast('Filters reset to defaults.')}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                        Reset
                    </button>
                    <button
                        type="button"
                        onClick={() => showToast('Filters applied successfully.')}
                        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900"
                    >
                        Apply filters
                    </button>
                </div>
            </div>
            {toast ? (
                <div className="absolute right-4 top-4 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm animate-fade-in dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                    {toast}
                </div>
            ) : null}
        </section>
    );
};

export default Filters;