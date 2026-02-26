import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

const logos = ['Ledgerly', 'Northwind', 'Quasar', 'Openlane', 'Arcspire'];

export default function LandingPage() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -right-24 top-16 h-72 w-72 rounded-full bg-[#f1e9dc]" />
          <div className="absolute left-10 top-40 h-40 w-40 rounded-full bg-[#efe5d6]" />
        </div>
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e6ded3] bg-white/70 px-4 py-1 text-xs font-semibold text-slate-600">
              <Sparkles className="h-3.5 w-3.5" />
              Premium payment operations
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-slate-900 md:text-5xl">
              Beautiful, unified control of revenue, payouts, and customer health.
            </h1>
            <p className="text-lg text-slate-600">
              Payflow combines analytics, alerts, and workflow automation into a
              single executive view built for finance leaders.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Start free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700"
              >
                Request demo
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-slate-500">
              <div>
                <p className="text-2xl font-semibold text-slate-900">$1.2B</p>
                <p>Processed monthly</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-slate-900">98.9%</p>
                <p>On-time payouts</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-slate-900">24/7</p>
                <p>Risk monitoring</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#e6ded3] bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Executive summary</span>
              <span>Feb 2026</span>
            </div>
            <div className="mt-5 space-y-4">
              {[
                ['Net revenue', '$184,320', '+12.4%'],
                ['Recovered churn', '$12,430', '+3.1%'],
                ['Active accounts', '1,284', '+9.7%'],
              ].map((row) => (
                <div
                  key={row[0]}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-[#f7f2ea] px-4 py-3"
                >
                  <div>
                    <p className="text-xs text-slate-500">{row[0]}</p>
                    <p className="text-lg font-semibold text-slate-900">{row[1]}</p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600">{row[2]}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-slate-100 bg-white px-4 py-4">
              <p className="text-xs font-semibold text-slate-500">Risk signals</p>
              <div className="mt-3 flex items-center gap-3 text-sm text-slate-600">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                6 payouts auto-approved in the last 24 hours.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-10">
        <div className="grid gap-6 rounded-3xl border border-[#e6ded3] bg-white px-8 py-10 md:grid-cols-3">
          {[
            ['Revenue forecasting', 'Scenario modeling for board-ready reports.'],
            ['Customer signals', 'Track cohorts, retention, and risk at a glance.'],
            ['Automated payouts', 'Deliver accurate payouts on schedule.'],
          ].map((item) => (
            <div key={item[0]}>
              <p className="text-sm font-semibold text-slate-900">{item[0]}</p>
              <p className="mt-2 text-sm text-slate-500">{item[1]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-[#e6ded3] bg-white px-8 py-10">
            <h2 className="text-2xl font-semibold text-slate-900">
              Built for finance teams that move fast.
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              Combine payment operations, support, and analytics in one clean
              workspace.
            </p>
            <div className="mt-6 space-y-3">
              {[
                'Real-time payment reconciliation',
                'Payout scheduling and approvals',
                'Customer-level health monitoring',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-[#e6ded3] bg-[#131313] px-8 py-10 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">
              Trusted by leaders
            </p>
            <h3 className="mt-4 text-2xl font-semibold">"We cut payout delays by 42%."</h3>
            <p className="mt-4 text-sm text-white/70">
              Payflow gave our finance team a shared source of truth and
              actionable health alerts.
            </p>
            <p className="mt-6 text-sm font-semibold">Avery Chang, CFO @ Ledgerly</p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[#e6ded3] bg-white px-8 py-10">
          <div>
            <p className="text-sm font-semibold text-slate-900">Ready to explore Payflow?</p>
            <p className="mt-2 text-sm text-slate-500">
              Launch in minutes. Cancel any time.
            </p>
          </div>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Start your workspace
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Powering teams at
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-6 text-sm font-semibold text-slate-500">
          {logos.map((logo) => (
            <span key={logo}>{logo}</span>
          ))}
        </div>
      </section>
    </main>
  );
}
