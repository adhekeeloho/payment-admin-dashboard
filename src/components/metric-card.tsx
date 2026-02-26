interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendDirection?: 'up' | 'down';
  sparkline?: number[];
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend = '2.4% vs last week',
  trendDirection = 'up',
  sparkline,
}) => {
  const points = sparkline
    ? sparkline
        .map((point, index) => `${index * 20},${40 - point}`)
        .join(' ')
    : '';

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{value}</p>
        </div>
        {sparkline ? (
          <svg width="90" height="40" viewBox="0 0 90 40" aria-hidden="true">
            <polyline
              fill="none"
              stroke={trendDirection === 'up' ? '#10b981' : '#f43f5e'}
              strokeWidth="2"
              points={points}
            />
          </svg>
        ) : null}
      </div>
      <div
        className={`text-xs font-semibold ${
          trendDirection === 'up' ? 'text-emerald-600' : 'text-rose-500'
        }`}
      >
        {trendDirection === 'up' ? '↑' : '↓'} {trend}
      </div>
    </div>
  );
};

export default MetricCard;