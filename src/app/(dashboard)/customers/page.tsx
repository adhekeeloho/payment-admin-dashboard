'use client';

import { Mail, ShieldCheck, UserPlus } from 'lucide-react';
import { useApi } from '@/lib/swr';

const customersFallback = [
  {
    name: 'Ava Morgan',
    email: 'ava@studio.io',
    plan: 'Enterprise',
    spend: '$14,320',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/80?img=32',
  },
  {
    name: 'Dylan Brooks',
    email: 'dylan@product.co',
    plan: 'Growth',
    spend: '$9,840',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/80?img=12',
  },
  {
    name: 'Maya Singh',
    email: 'maya@team.dev',
    plan: 'Starter',
    spend: '$2,180',
    status: 'At risk',
    avatar: 'https://i.pravatar.cc/80?img=5',
  },
  {
    name: 'Ethan Cole',
    email: 'ethan@agency.co',
    plan: 'Growth',
    spend: '$6,420',
    status: 'Active',
    avatar: 'https://i.pravatar.cc/80?img=22',
  },
];

export default function CustomersPage() {
  const { data: apiData } = useApi<
    | {
        items?: Array<{
          id?: string;
          name?: string;
          email?: string;
          plan?: string;
          spend?: string | number;
          status?: string;
          avatar?: string;
        }>;
      }
    | Array<{
        id?: string;
        name?: string;
        email?: string;
        plan?: string;
        spend?: string | number;
        status?: string;
        avatar?: string;
      }>
    | null
  >('/customers', { fallbackData: null });

  const items = Array.isArray(apiData) ? apiData : apiData?.items ?? [];
  const customers = items.length
    ? items.map((item, index) => ({
        name: item.name ?? `Customer ${index + 1}`,
        email: item.email ?? 'unknown@company.com',
        plan: item.plan ?? 'Growth',
        spend:
          typeof item.spend === 'number'
            ? `$${item.spend.toLocaleString()}`
            : item.spend ?? '$0',
        status: item.status ?? 'Active',
        avatar: item.avatar ?? `https://i.pravatar.cc/80?img=${10 + index}`,
      }))
    : customersFallback;

  return (
    <div className="space-y-6 animate-fade-up">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Relationships</p>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Customers</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Monitor customer health and lifetime value trends.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900">
          <UserPlus className="h-4 w-4" />
          Add customer
        </button>
      </header>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Engagement score</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">82%</p>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            64 customers are in the healthy range this week.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Retention</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">94.1%</p>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Churn risk is down 2.4% compared to last month.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Support SLAs</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">16h</p>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Average response time across enterprise customers.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {customers.map((customer) => (
          <div
            key={customer.email}
            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center gap-4">
              <img
                src={customer.avatar}
                alt={customer.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {customer.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{customer.email}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{customer.spend}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{customer.plan}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Customer signals</p>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Health checks</h2>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            18 accounts need outreach this week.
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {['Usage down', 'Payment retry', 'Invoice overdue', 'Upgrade ready'].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
