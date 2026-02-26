'use client';

import { ArrowUpRight, Gauge, TrendingUp } from 'lucide-react';
import RevenueGraph from '@/components/revenue-graph';
import { useApi } from '@/lib/swr';

const insights = [
  {
    label: 'Net retention',
    value: '118%',
    note: 'Up 4.2% from last quarter',
  },
  {
    label: 'Average payout time',
    value: '1.8 days',
    note: 'Down 12h week-over-week',
  },
  {
    label: 'Recovery rate',
    value: '92.4%',
    note: 'Healthy dispute resolution',
  },
];

const donutFallback = [
  {
    title: 'Revenue mix',
    value: '$184.3k',
    subtitle: 'Net revenue by channel',
    segments: [
      { label: 'Card', value: 52, color: '#0ea5e9' },
      { label: 'ACH', value: 28, color: '#10b981' },
      { label: 'Wire', value: 20, color: '#f59e0b' },
    ],
  },
  {
    title: 'Customer health',
    value: '82%',
    subtitle: 'Accounts at healthy risk',
    segments: [
      { label: 'Healthy', value: 62, color: '#22c55e' },
      { label: 'Watch', value: 25, color: '#f97316' },
      { label: 'Risk', value: 13, color: '#ef4444' },
    ],
  },
  {
    title: 'Payout coverage',
    value: '94%',
    subtitle: 'On-time disbursements',
    segments: [
      { label: 'On time', value: 74, color: '#6366f1' },
      { label: 'Delayed', value: 18, color: '#f43f5e' },
      { label: 'Manual', value: 8, color: '#38bdf8' },
    ],
  },
];

const chartColors = ['#0ea5e9', '#10b981', '#f59e0b', '#6366f1', '#f43f5e'];

const DonutChart = ({
  segments,
  label,
  value,
}: {
  segments: { label: string; value: number; color: string }[];
  label: string;
  value: string;
}) => {
  const labelWords = label.split(' ');
  const labelLine1 = labelWords[0] ?? '';
  const labelLine2 = labelWords.slice(1).join(' ');
  const size = 120;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
  const safeSegments = total > 0 ? segments : [];
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            className="dark:stroke-slate-800"
          />
          {safeSegments.map((segment) => {
            const length = (segment.value / total) * circumference;
            const dashArray = `${length} ${circumference - length}`;
            const dashOffset = -offset;
            offset += length;

            return (
              <circle
                key={segment.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth={strokeWidth}
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {labelLine1}
          </p>
          {labelLine2 ? (
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {labelLine2}
            </p>
          ) : null}
          <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{value}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        {safeSegments.map((segment) => (
          <span key={segment.label} className="flex items-center gap-1">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: segment.color }}
            />
            {segment.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function AnalyticsPage() {
  const { data: segmentsData } = useApi<
    | {
        segments?: Array<{
          title?: string;
          value?: string;
          subtitle?: string;
          items?: Array<{ label?: string; value?: number }>; 
        }>;
      }
    | Array<{
        title?: string;
        value?: string;
        subtitle?: string;
        items?: Array<{ label?: string; value?: number }>;
      }>
    | null
  >('/analytics/segments', { fallbackData: null });

  const normalizedSegments = Array.isArray(segmentsData)
    ? segmentsData
    : segmentsData?.segments ?? [];

  const donutCharts = normalizedSegments.length
    ? normalizedSegments.map((segment, chartIndex) => ({
        title: segment.title ?? `Segment ${chartIndex + 1}`,
        value: segment.value ?? 'N/A',
        subtitle: segment.subtitle ?? 'Segment breakdown',
        segments:
          segment.items?.map((item, index) => ({
            label: item.label ?? `Group ${index + 1}`,
            value: item.value ?? 0,
            color: chartColors[index % chartColors.length],
          })) ?? [],
      }))
    : donutFallback;
  return (
    <div className="space-y-6 animate-fade-up">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Performance</p>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Analytics</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Deep dive into revenue trends and health signals.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
          <TrendingUp className="h-4 w-4" />
          Generate insight
        </button>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {insights.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{item.label}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">{item.value}</p>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{item.note}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {donutCharts.map((chart) => (
          <div
            key={chart.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="mb-4">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{chart.title}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{chart.subtitle}</p>
            </div>
            <DonutChart
              segments={chart.segments}
              label={chart.title}
              value={chart.value}
            />
          </div>
        ))}
      </section>

      <RevenueGraph />

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <Gauge className="h-5 w-5 text-slate-500 dark:text-slate-300" />
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Cohort velocity</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Month-over-month growth by segment</p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            {['Enterprise', 'Growth', 'Starter'].map((segment) => (
              <div key={segment}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">{segment}</span>
                  <span className="text-slate-900 dark:text-slate-100">{segment === 'Enterprise' ? '24%' : segment === 'Growth' ? '18%' : '12%'}</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-slate-900 dark:bg-slate-100"
                    style={{ width: segment === 'Enterprise' ? '78%' : segment === 'Growth' ? '62%' : '46%' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Alert summaries</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Last 7 days</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
              Stable
            </span>
          </div>
          <div className="mt-5 space-y-4 text-sm text-slate-500 dark:text-slate-400">
            {[
              '3 payout anomalies resolved automatically.',
              '2 high-value renewals flagged for outreach.',
              '1 chargeback threshold exceeded in EMEA.',
            ].map((note) => (
              <div key={note} className="flex items-start gap-2">
                <ArrowUpRight className="mt-0.5 h-4 w-4 text-emerald-500" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
