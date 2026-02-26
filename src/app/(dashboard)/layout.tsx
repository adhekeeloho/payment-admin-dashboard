import Sidebar from '@/components/sidebar';
import TopNav from '@/components/top-nav';
import AuthGate from '@/components/auth/auth-gate';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGate>
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
        <Sidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <TopNav />
          <main className="flex-1 px-4 pb-10 pt-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </AuthGate>
  );
}
