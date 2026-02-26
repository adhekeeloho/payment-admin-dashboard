'use client';

import MetricCard from '@/components/metric-card';
import TransactionTable from '@/components/transaction-table';
import RevenueGraph from '@/components/revenue-graph';
import Filters from '@/components/filters';
import { useApi } from '@/lib/swr';

type MetricsResponse = {
  totalRevenue?: number;
  activeSubscriptions?: number;
  pendingPayouts?: number;
  churnRate?: number;
  trends?: {
    totalRevenue?: string;
    activeSubscriptions?: string;
    pendingPayouts?: string;
    churnRate?: string;
  };
};

export default function DashboardPage() {
  const { data: metrics } = useApi<MetricsResponse | null>('/dashboard/metrics', {
    fallbackData: null,
  });

  const totalRevenue = metrics?.totalRevenue ?? 12345;
  const activeSubscriptions = metrics?.activeSubscriptions ?? 123;
  const pendingPayouts = metrics?.pendingPayouts ?? 1234;
  const churnRate = metrics?.churnRate ?? 5;
  const trends = {
    totalRevenue: metrics?.trends?.totalRevenue ?? '12.4% vs last month',
    activeSubscriptions: metrics?.trends?.activeSubscriptions ?? '2.1% vs last week',
    pendingPayouts: metrics?.trends?.pendingPayouts ?? '3.6% vs last week',
    churnRate: metrics?.trends?.churnRate ?? '0.8% vs last month',
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4 animate-fade-up">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Overview</p>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 sm:text-3xl">
            Dashboard
          </h1>
        </div>
        <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
          Updated Feb 26, 2026
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4 animate-fade-up animate-delay-100">
        <MetricCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          trend={trends.totalRevenue}
          trendDirection="up"
          sparkline={[28, 24, 30, 26, 34]}
        />
        <MetricCard
          title="Active Subscriptions"
          value={activeSubscriptions}
          trend={trends.activeSubscriptions}
          trendDirection="up"
        />
        <MetricCard
          title="Pending Payouts"
          value={`$${pendingPayouts.toLocaleString()}`}
          trend={trends.pendingPayouts}
          trendDirection="down"
        />
        <MetricCard
          title="Churn Rate"
          value={`${churnRate}%`}
          trend={trends.churnRate}
          trendDirection="down"
        />
      </div>

      <div className="animate-fade-up animate-delay-200">
        <Filters />
      </div>
      <div className="animate-fade-up animate-delay-300">
        <RevenueGraph />
      </div>
      <div className="animate-fade-up animate-delay-400">
        <TransactionTable />
      </div>
    </div>
  );
}
