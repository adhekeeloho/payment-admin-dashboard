'use client';

import { useApi } from '@/lib/swr';

const revenuePoints = [
    58, 20, 22, 24, 68, 32, 36, 40, 75, 50, 54, 60,
];

const monthLabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

export default function RevenueGraph() {
    const { data } = useApi<{ points?: number[]; labels?: string[] } | number[] | null>(
        '/dashboard/graph',
        { fallbackData: null }
    );

    const apiPoints = Array.isArray(data) ? data : data?.points;
    const apiLabels = Array.isArray(data) ? undefined : data?.labels;
    const points = apiPoints && apiPoints.length ? apiPoints : revenuePoints;
    const labels = apiLabels && apiLabels.length ? apiLabels : monthLabels;

    const maxPoint = Math.max(...points);
    const minPoint = Math.min(...points);
    const range = maxPoint - minPoint || 1;
    const chartPoints = points.map((point, index) => {
        const x = (index / (points.length - 1)) * 100;
        const y = 88 - ((point - minPoint) / range) * 60;
        return { x, y };
    });
    const linePoints = chartPoints.map((point) => `${point.x},${point.y}`).join(' ');

    const buildSmoothPath = (points: Array<{ x: number; y: number }>) => {
        if (points.length === 0) {
            return '';
        }
        if (points.length === 1) {
            return `M ${points[0].x} ${points[0].y}`;
        }
        const smoothing = 0.2;
        const path = [`M ${points[0].x} ${points[0].y}`];

        for (let i = 0; i < points.length - 1; i += 1) {
            const current = points[i];
            const next = points[i + 1];
            const prev = points[i - 1] ?? current;
            const after = points[i + 2] ?? next;

            const controlX1 = current.x + (next.x - prev.x) * smoothing;
            const controlY1 = current.y + (next.y - prev.y) * smoothing;
            const controlX2 = next.x - (after.x - current.x) * smoothing;
            const controlY2 = next.y - (after.y - current.y) * smoothing;

            path.push(
                `C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${next.x} ${next.y}`
            );
        }

        return path.join(' ');
    };

    const smoothPath = buildSmoothPath(chartPoints);

    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Revenue Over Time</p>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">$84,320</h2>
                </div>
                <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
                    +12.8% MoM
                </div>
            </div>
            <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 px-2 py-6 sm:px-4 dark:border-slate-800 dark:bg-slate-950">
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-72 w-full">
                    <defs>
                        <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="revenueStroke" x1="0" x2="1" y1="0" y2="0">
                            <stop offset="0%" stopColor="#38bdf8" />
                            <stop offset="100%" stopColor="#0284c7" />
                        </linearGradient>
                    </defs>
                    <g stroke="#e2e8f0" strokeWidth="0.6" className="dark:opacity-20">
                        {[15, 35, 55, 75].map((y) => (
                            <line key={y} x1="0" y1={y} x2="100" y2={y} />
                        ))}
                    </g>
                    <path
                        d={smoothPath}
                        fill="none"
                        stroke="url(#revenueStroke)"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                    />
                    <path
                        d={`${smoothPath} L 100 92 L 0 92 Z`}
                        fill="url(#revenueFill)"
                    />
                    {chartPoints.map((point, index) => (
                        <circle
                            key={`${point.x}-${point.y}`}
                            cx={point.x}
                            cy={point.y}
                            r={index === chartPoints.length - 1 ? 0.9 : 0}
                            fill={index === chartPoints.length - 1 ? '#0284c7' : '#38bdf8'}
                        />
                    ))}
                </svg>
                <div className="mt-4 grid grid-cols-4 gap-2 text-xs text-slate-500 sm:grid-cols-6 lg:grid-cols-12">
                    {labels.map((label) => (
                        <span key={label} className="text-center">
                            {label}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}