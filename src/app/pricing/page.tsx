import Link from "next/link";

const PLANS = [
  {
    name: "Free",
    price: 0,
    description: "Perfect for getting started",
    features: [
      "3 languages",
      "50 XP/day limit",
      "10 AI messages/day",
      "Basic vocabulary decks",
      "Community features",
      "Web access only",
    ],
    notIncluded: [
      "Offline mode",
      "Custom AI personas",
      "Advanced analytics",
      "API access",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Plus",
    price: 9.99,
    description: "Best for serious learners",
    features: [
      "10 languages",
      "200 XP/day limit",
      "100 AI messages/day",
      "Unlimited vocabulary decks",
      "Full offline mode",
      "Advanced analytics",
      "Live classes (some)",
      "Email support",
    ],
    notIncluded: [
      "Custom AI personas",
      "API access",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Pro",
    price: 19.99,
    description: "For language masters",
    features: [
      "Unlimited languages",
      "Unlimited XP",
      "Unlimited AI messages",
      "Custom AI personas",
      "Full offline mode",
      "Advanced analytics",
      "All live classes",
      "API access",
      "Priority support",
      "Early access to features",
    ],
    notIncluded: [],
    cta: "Go Pro",
    popular: false,
  },
];

const COMPARISON = [
  { feature: "Languages", free: "3", plus: "10", pro: "Unlimited" },
  { feature: "Daily XP", free: "50", plus: "200", pro: "Unlimited" },
  { feature: "AI Messages/day", free: "10", plus: "100", pro: "Unlimited" },
  { feature: "Vocabulary Decks", free: "Basic", plus: "Unlimited", pro: "Unlimited" },
  { feature: "Offline Mode", free: false, plus: true, pro: true },
  { feature: "Advanced Analytics", free: false, plus: true, pro: true },
  { feature: "Custom AI Personas", free: false, plus: false, pro: true },
  { feature: "API Access", free: false, plus: false, pro: true },
  { feature: "Live Classes", free: "Limited", plus: "Most", pro: "All" },
  { feature: "Priority Support", free: false, plus: false, pro: true },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-surface-dark">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-surface-dark/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center text-xl font-bold">
              C
            </div>
            <span className="text-xl font-bold gradient-text">Codex Lingua</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/pricing" className="nav-link text-brand-400">Pricing</Link>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Choose the plan that fits your learning goals. All plans include a 14-day money-back guarantee.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {PLANS.map((plan) => (
              <div 
                key={plan.name} 
                className={`glass-card p-8 relative ${
                  plan.popular ? "border-brand-500 ring-2 ring-brand-500/20" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-500 text-white text-sm rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                  <p className="text-slate-400 text-sm">{plan.description}</p>
                </div>

                <div className="text-center mb-6">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className="text-slate-400">/month</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="text-green-400">✓</span>
                      {feature}
                    </li>
                  ))}
                  {plan.notIncluded.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-500">
                      <span className="text-slate-500">×</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link 
                  href={plan.price === 0 ? "/auth/signup" : "/settings/subscription"}
                  className={`block text-center py-3 rounded-xl font-semibold transition-all ${
                    plan.popular 
                      ? "bg-brand-500 hover:bg-brand-600 text-white" 
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="glass-card p-8 mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Feature Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 text-slate-400">Feature</th>
                    <th className="text-center py-4 px-4 text-slate-400">Free</th>
                    <th className="text-center py-4 px-4 text-slate-400">Plus</th>
                    <th className="text-center py-4 px-4 text-slate-400">Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-4 px-4">{row.feature}</td>
                      <td className="text-center py-4 px-4">
                        {typeof row.free === "boolean" ? (
                          row.free ? <span className="text-green-400">✓</span> : <span className="text-slate-500">—</span>
                        ) : (
                          <span className="text-slate-300">{row.free}</span>
                        )}
                      </td>
                      <td className="text-center py-4 px-4">
                        {typeof row.plus === "boolean" ? (
                          row.plus ? <span className="text-green-400">✓</span> : <span className="text-slate-500">—</span>
                        ) : (
                          <span className="text-slate-300">{row.plus}</span>
                        )}
                      </td>
                      <td className="text-center py-4 px-4">
                        {typeof row.pro === "boolean" ? (
                          row.pro ? <span className="text-green-400">✓</span> : <span className="text-slate-500">—</span>
                        ) : (
                          <span className="text-brand-400 font-semibold">{row.pro}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Can I switch plans anytime?</h3>
                <p className="text-slate-400 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-slate-400 text-sm">Yes, Plus comes with a 14-day free trial. No credit card required to start.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-slate-400 text-sm">We accept all major credit cards, PayPal, and Apple Pay.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Do you offer student discounts?</h3>
                <p className="text-slate-400 text-sm">Yes! Students with a valid .edu email get 50% off Plus or Pro plans.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}