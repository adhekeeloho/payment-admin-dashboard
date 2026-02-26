'use client';

import { Bell, Lock, Mail, Palette } from 'lucide-react';
import ThemeToggle from '@/components/theme-toggle';
import { apiFetch } from '@/lib/api';
import { useApi } from '@/lib/swr';
import { useEffect, useState } from 'react';

export default function SettingsPage() {
  const { data: settingsData } = useApi<Record<string, string> | null>('/settings', {
    fallbackData: null,
  });
  const [instantAlerts, setInstantAlerts] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [billingEmail, setBillingEmail] = useState('billing@payflow.dev');

  useEffect(() => {
    if (settingsData) {
      setInstantAlerts(settingsData.instantAlerts !== 'false');
      setWeeklySummary(settingsData.weeklySummary !== 'false');
      setBillingEmail(settingsData.billingEmail ?? 'billing@payflow.dev');
    }
  }, [settingsData]);

  const updateSettings = async (updates: Record<string, string>) => {
    await apiFetch('/settings', {
      method: 'PATCH',
      body: updates,
    });
  };
  return (
    <div className="space-y-6 animate-fade-up">
      <header>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Workspace</p>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Settings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Configure branding, notifications, and security controls.
        </p>
      </header>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <Palette className="h-5 w-5 text-slate-500 dark:text-slate-300" />
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Appearance</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Switch between light and dark themes.</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-slate-500 dark:text-slate-400">Theme</span>
            <ThemeToggle />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-slate-500 dark:text-slate-300" />
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Notifications</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Keep your team informed in real time.</p>
            </div>
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <label className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
              <span>Instant payout alerts</span>
              <input
                type="checkbox"
                checked={instantAlerts}
                onChange={(event) => {
                  const next = event.target.checked;
                  setInstantAlerts(next);
                  updateSettings({ instantAlerts: String(next) });
                }}
                className="h-4 w-4 accent-slate-900"
              />
            </label>
            <label className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
              <span>Weekly revenue summary</span>
              <input
                type="checkbox"
                checked={weeklySummary}
                onChange={(event) => {
                  const next = event.target.checked;
                  setWeeklySummary(next);
                  updateSettings({ weeklySummary: String(next) });
                }}
                className="h-4 w-4 accent-slate-900"
              />
            </label>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-slate-500 dark:text-slate-300" />
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Security</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Protect access to your workspace.</p>
            </div>
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center justify-between">
              <span>Two-factor authentication</span>
              <button className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700 dark:text-slate-200">
                Enable
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span>Session timeout</span>
              <span className="text-xs text-slate-400">30 minutes</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-slate-500 dark:text-slate-300" />
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Billing contact</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Manage payment receipts and invoices.</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{billingEmail}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Primary contact</p>
            </div>
            <button
              className="text-xs font-semibold text-slate-600 hover:underline dark:text-slate-300"
              onClick={() => updateSettings({ billingEmail })}
            >
              Update
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
