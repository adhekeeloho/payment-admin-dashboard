import { ArrowDownRight, ArrowUpRight, DownloadCloud } from 'lucide-react';
import TransactionTable from '@/components/transaction-table';

export default function TransactionsPage() {
  return (
    <div className="space-y-6 animate-fade-up">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Payments</p>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Transactions</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Review and export recent activity across all payment channels.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
          <DownloadCloud className="h-4 w-4" />
          Download report
        </button>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: 'Gross volume',
            value: '$184,320',
            change: '12.4%',
            direction: 'up',
          },
          {
            label: 'Refunds',
            value: '$4,980',
            change: '1.8%',
            direction: 'down',
          },
          {
            label: 'Chargebacks',
            value: '0.42%',
            change: '0.1%',
            direction: 'down',
          },
          {
            label: 'Avg. ticket',
            value: '$62.14',
            change: '3.2%',
            direction: 'up',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{stat.value}</p>
              <span
                className={`flex items-center gap-1 text-xs font-semibold ${
                  stat.direction === 'up'
                    ? 'text-emerald-600 dark:text-emerald-300'
                    : 'text-rose-500 dark:text-rose-300'
                }`}
              >
                {stat.direction === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </section>

      <TransactionTable />
    </div>
  );
}
