import AuthForm from '@/components/auth/auth-form';

export default function LoginPage() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Welcome back
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Log in</h1>
        <p className="text-sm text-slate-500">
          Access your payment dashboard and review the latest activity.
        </p>
      </div>
      <AuthForm mode="login" />
    </div>
  );
}
