export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-10 lg:flex-row lg:items-stretch">
        <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          {children}
        </div>
        <div className="hidden w-full max-w-sm rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-8 text-slate-700 shadow-sm lg:flex lg:flex-col">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Payment Admin
          </p>
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">
            Manage revenue, payouts, and customer health.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Sign in to review live activity, reconcile payouts, and keep your
            revenue team in sync.
          </p>
          <div className="mt-auto rounded-2xl border border-white/60 bg-white/70 p-4 text-sm text-slate-600">
            Tip: Use a clean email format like name@company.com to preview the
            auth flow.
          </div>
        </div>
      </div>
    </main>
  );
}
