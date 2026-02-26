import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: '$129',
    desc: 'For emerging finance teams.',
    features: ['Revenue dashboards', 'Payout automation', 'Email support'],
  },
  {
    name: 'Growth',
    price: '$349',
    desc: 'Scaling with advanced controls.',
    features: ['Forecasting suite', 'Risk monitoring', 'Priority support'],
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'Tailored for global ops.',
    features: ['Custom integrations', 'Dedicated CSM', 'SOC2 & SSO'],
  },
];

export default function PricingPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Pricing
        </p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">Plans that scale with your revenue</h1>
        <p className="mt-4 text-lg text-slate-600">
          Predictable pricing with premium support for every stage.
        </p>
      </header>

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`flex flex-col rounded-3xl border px-6 py-8 shadow-sm ${
              tier.featured
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-[#e6ded3] bg-white text-slate-900'
            }`}
          >
            <p className="text-sm font-semibold">{tier.name}</p>
            <p className="mt-3 text-3xl font-semibold">{tier.price}</p>
            <p className={`mt-2 text-sm ${tier.featured ? 'text-white/70' : 'text-slate-500'}`}>
              {tier.desc}
            </p>
            <div className="mt-6 space-y-3 text-sm">
              {tier.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <CheckCircle2 className={`h-4 w-4 ${tier.featured ? 'text-white' : 'text-emerald-500'}`} />
                  {feature}
                </div>
              ))}
            </div>
            <Link
              href="/signup"
              className={`mt-8 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition ${
                tier.featured
                  ? 'bg-white text-slate-900 hover:bg-slate-100'
                  : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Choose plan
            </Link>
          </div>
        ))}
      </section>

      <section className="mt-12 grid gap-6 rounded-3xl border border-[#e6ded3] bg-white px-8 py-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-slate-900">Need a custom rollout?</p>
          <p className="mt-3 text-sm text-slate-500">
            We can tailor onboarding, data migration, and security reviews for your
            enterprise team.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/login"
            className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700"
          >
            Talk to sales
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white"
          >
            Start trial
          </Link>
        </div>
      </section>
    </main>
  );
}
