'use client';

import { CheckCircle2, ShieldAlert, XCircle } from 'lucide-react';
import { useMemo } from 'react';
import { apiFetch } from '@/lib/api';
import { useApi } from '@/lib/swr';
import { useSWRConfig } from 'swr';

type ApprovalItem = {
  id: string;
  title: string;
  requestedBy: string;
  amount: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  time: string;
};

type AuditItem = {
  id: string;
  action: string;
  actor: string;
  time: string;
};

const initialApprovals: ApprovalItem[] = [
  {
    id: 'AP-2041',
    title: 'High-risk payout override',
    requestedBy: 'Ava Morgan',
    amount: '$18,420',
    status: 'Pending',
    time: '9:22 AM',
  },
  {
    id: 'AP-2042',
    title: 'Refund limit increase',
    requestedBy: 'Dylan Brooks',
    amount: '$5,000',
    status: 'Pending',
    time: '10:05 AM',
  },
  {
    id: 'AP-2039',
    title: 'Manual payout release',
    requestedBy: 'Maya Singh',
    amount: '$9,120',
    status: 'Approved',
    time: 'Yesterday',
  },
];

const initialAudit: AuditItem[] = [
  { id: 'AU-101', action: 'Approved payout override AP-2039', actor: 'You', time: 'Yesterday' },
  { id: 'AU-102', action: 'Paused risk rule for EU corridor', actor: 'You', time: '2 days ago' },
  { id: 'AU-103', action: 'Promoted admin access for Ava Morgan', actor: 'You', time: '3 days ago' },
];

export default function OversightPage() {
  const { mutate } = useSWRConfig();
  const { data: approvalsData } = useApi<
    | { items?: ApprovalItem[] }
    | ApprovalItem[]
    | null
  >('/approvals', { fallbackData: null });
  const { data: auditData } = useApi<
    | { items?: AuditItem[] }
    | AuditItem[]
    | null
  >('/approvals/audit-log', { fallbackData: null });

  const approvals = useMemo(() => {
    const items = Array.isArray(approvalsData) ? approvalsData : approvalsData?.items ?? [];
    return items.length ? items : initialApprovals;
  }, [approvalsData]);

  const audit = useMemo(() => {
    const items = Array.isArray(auditData) ? auditData : auditData?.items ?? [];
    return items.length ? items : initialAudit;
  }, [auditData]);

  const updateApproval = async (id: string, status: ApprovalItem['status']) => {
    await apiFetch(`/approvals/${id}/${status === 'Approved' ? 'approve' : 'reject'}` , {
      method: 'POST',
    });
    await mutate('/approvals');
    await mutate('/approvals/audit-log');
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <header>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Super Admin</p>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Oversight</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Review critical changes, approvals, and admin activity across the platform.
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-3">
        {[{ label: 'Global revenue', value: '$2.4M', detail: 'All regions, last 30 days' }, { label: 'Payout risk alerts', value: '14', detail: 'Needs review this week' }, { label: 'Admin actions', value: '82', detail: 'Last 7 days' }].map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">{card.value}</p>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{card.detail}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Approval queue</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">High-impact actions waiting on review</p>
            </div>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-200">
              {approvals.filter((item) => item.status === 'Pending').length} pending
            </span>
          </div>
          <div className="mt-5 space-y-4">
            {approvals.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {item.requestedBy} • {item.amount}
                    </p>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{item.time}</span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className={`text-xs font-semibold ${
                    item.status === 'Approved'
                      ? 'text-emerald-600'
                      : item.status === 'Rejected'
                      ? 'text-rose-500'
                      : 'text-amber-600'
                  }`}>
                    {item.status}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateApproval(item.id, 'Approved')}
                      className="inline-flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-1 text-xs font-semibold text-white"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => updateApproval(item.id, 'Rejected')}
                      className="inline-flex items-center gap-1 rounded-lg bg-rose-500 px-3 py-1 text-xs font-semibold text-white"
                    >
                      <XCircle className="h-3.5 w-3.5" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-5 w-5 text-slate-500 dark:text-slate-300" />
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Admin activity</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Last 30 days</p>
            </div>
          </div>
          <div className="mt-5 space-y-4 text-sm text-slate-500 dark:text-slate-400">
            {audit.map((log) => (
              <div key={log.id} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-slate-400" />
                <div>
                  <p className="text-sm text-slate-900 dark:text-slate-100">{log.action}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {log.actor} • {log.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
