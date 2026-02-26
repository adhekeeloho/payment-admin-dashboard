import Link from 'next/link';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f7f2ea] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-[#e6ded3] bg-[#f7f2ea]/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white">
              P
            </div>
            <div>
              <p className="text-sm font-semibold">Payflow</p>
              <p className="text-xs text-slate-500">Payment intelligence</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <Link href="/landing" className="transition hover:text-slate-900">
              Overview
            </Link>
            <Link href="/pricing" className="transition hover:text-slate-900">
              Pricing
            </Link>
            <Link href="/login" className="transition hover:text-slate-900">
              Log in
            </Link>
          </nav>
          <Link
            href="/signup"
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Start free
          </Link>
        </div>
      </header>
      {children}
      <footer className="border-t border-[#e6ded3] bg-[#f7f2ea]">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-10 md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold">Payflow</p>
            <p className="mt-2 text-sm text-slate-500">
              Premium payment operations for modern finance teams.
            </p>
          </div>
          <div className="text-sm text-slate-500">
            <p className="font-semibold text-slate-700">Product</p>
            <p className="mt-2">Analytics</p>
            <p>Payouts</p>
            <p>Security</p>
          </div>
          <div className="text-sm text-slate-500">
            <p className="font-semibold text-slate-700">Contact</p>
            <p className="mt-2">support@payflow.dev</p>
            <p>+1 (212) 555-0194</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
