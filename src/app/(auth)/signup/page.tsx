import AuthForm from '@/components/auth/auth-form';

export default function SignupPage() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Get started
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">Create account</h1>
        <p className="text-sm text-slate-500">
          Set up your workspace to track revenue, payouts, and churn.
        </p>
      </div>
      <AuthForm mode="signup" />
    </div>
  );
}
