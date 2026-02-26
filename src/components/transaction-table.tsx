'use client';

import React from 'react';
import { ArrowUpDown } from 'lucide-react';
import { useApi } from '@/lib/swr';

interface Transaction {
  id: string;
  customer: {
    name: string;
    avatar: string;
  };
  date: string;
  amount: number;
  status: 'Pending' | 'Success' | 'Failed';
}

interface TransactionTableProps {
  transactions?: Transaction[];
}

type TransactionResponse = {
  items?: Array<{
    id?: string;
    customer?: { name?: string; avatar?: string };
    date?: string;
    amount?: number;
    status?: string;
  }>;
};

const demoTransactions: Transaction[] = [
  {
    id: 'TXN-1042',
    customer: {
      name: 'Ava Morgan',
      avatar: 'https://i.pravatar.cc/80?img=32',
    },
    date: '2026-02-22',
    amount: 129.0,
    status: 'Success',
  },
  {
    id: 'TXN-1043',
    customer: {
      name: 'Dylan Brooks',
      avatar: 'https://i.pravatar.cc/80?img=12',
    },
    date: '2026-02-22',
    amount: 412.25,
    status: 'Pending',
  },
  {
    id: 'TXN-1044',
    customer: {
      name: 'Maya Singh',
      avatar: 'https://i.pravatar.cc/80?img=5',
    },
    date: '2026-02-21',
    amount: 58.4,
    status: 'Failed',
  },
  {
    id: 'TXN-1045',
    customer: {
      name: 'Ethan Cole',
      avatar: 'https://i.pravatar.cc/80?img=22',
    },
    date: '2026-02-20',
    amount: 982.0,
    status: 'Success',
  },
  {
    id: 'TXN-1046',
    customer: {
      name: 'Nora Patel',
      avatar: 'https://i.pravatar.cc/80?img=44',
    },
    date: '2026-02-19',
    amount: 210.75,
    status: 'Success',
  },
];

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  const { data: apiData } = useApi<TransactionResponse | Transaction[] | null>(
    transactions ? null : '/dashboard/transactions',
    { fallbackData: null }
  );

  const apiItems = Array.isArray(apiData)
    ? apiData
    : (apiData?.items ?? []);

  const mapped = apiItems.map((item, index) => ({
    id: item.id ?? `TXN-${1040 + index}`,
    customer: {
      name: item.customer?.name ?? 'Unknown Customer',
      avatar: item.customer?.avatar ?? 'https://i.pravatar.cc/80?img=16',
    },
    date: item.date ?? new Date().toISOString(),
    amount: item.amount ?? 0,
    status:
      item.status === 'Success' || item.status === 'Pending' || item.status === 'Failed'
        ? item.status
        : 'Pending',
  }));

  const rows = transactions ?? (mapped.length ? mapped : demoTransactions);
  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const statusStyles: Record<Transaction['status'], string> = {
    Success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    Failed: 'bg-rose-50 text-rose-600 border-rose-200',
  };
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Latest transactions</p>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Payment activity</h3>
        </div>
        <button className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800">
          Export CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-400 dark:bg-slate-950 dark:text-slate-500">
            <tr>
              {['Transaction ID', 'Customer', 'Date', 'Amount', 'Status'].map((label) => (
                <th key={label} className="px-4 py-3">
                  <button
                    type="button"
                    className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400 transition hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                  >
                    {label}
                    <ArrowUpDown className="h-3.5 w-3.5" />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {rows.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200">{transaction.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={transaction.customer.avatar}
                      alt={transaction.customer.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-slate-700 dark:text-slate-200">{transaction.customer.name}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">Premium plan</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">
                  {currency.format(transaction.amount)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      statusStyles[transaction.status as Transaction['status']] ?? ''
                    }`}
                  >
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TransactionTable;