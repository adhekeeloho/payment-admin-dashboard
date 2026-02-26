'use client';

import { Banknote, Calendar, CheckCircle2, CircleDashed } from 'lucide-react';
import { useApi } from '@/lib/swr';

const payoutsFallback = [
  {
    id: 'PO-4302',
    date: 'Feb 24, 2026',
    amount: '$18,240',
    status: 'Processing',
  },
  {
    id: 'PO-4301',
    date: 'Feb 21, 2026',
    amount: '$14,920',
    status: 'Completed',
  },
  {
    id: 'PO-4300',
    date: 'Feb 18, 2026',
    amount: '$11,804',
    status: 'Completed',
  },
];

export default function PayoutsPage() {
  const { data: payoutsData } = useApi<
    | {
        items?: Array<{
          id?: string;
          date?: string;
          amount?: string | number;
          status?: string;
        }>;
      }
    | Array<{ id?: string; date?: string; amount?: string | number; status?: string }>
    | null
  >('/payouts', { fallbackData: null });

  const { data: scheduleData } = useApi<{ nextPayoutDate?: string } | null>(
    '/payouts/schedule',
    { fallbackData: null }
  );

  const items = Array.isArray(payoutsData) ? payoutsData : payoutsData?.items ?? [];
  const payouts = items.length
    ? items.map((item, index) => ({
        id: item.id ?? `PO-${4300 + index}`,
        date: item.date ?? 'TBD',
        amount:
          typeof item.amount === 'number'
            ? `$${item.amount.toLocaleString()}`
            : item.amount ?? '$0',
        status: item.status ?? 'Processing',
      }))
    : payoutsFallback;

  const nextPayoutDate = scheduleData?.nextPayoutDate ?? 'Friday, Mar 2';

  return (
    <div className="space-y-6 animate-fade-up">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Treasury</p>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Payouts</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Track disbursements and manage payout schedules.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900">
          <Banknote className="h-4 w-4" />
          Schedule payout
        </button>
      </header>

      <section className="grid gap-4 lg:grid-cols-3">
        {[{ label: 'Next payout', value: '$12,430', meta: 'Scheduled Mar 2' }, { label: 'Available balance', value: '$68,210', meta: 'Across 6 currencies' }, { label: 'Processing fees', value: '$1,420', meta: 'Past 30 days' }].map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">{card.value}</p>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{card.meta}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Upcoming payout</p>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {nextPayoutDate}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Calendar className="h-4 w-4" />
            Auto payouts enabled
          </div>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {payouts.map((payout) => (
            <div
              key={payout.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{payout.id}</p>
                {payout.status === 'Completed' ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                ) : (
                  <CircleDashed className="h-4 w-4 text-amber-500" />
                )}
              </div>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{payout.date}</p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">{payout.amount}</p>
              <span className="mt-3 inline-flex rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                {payout.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
