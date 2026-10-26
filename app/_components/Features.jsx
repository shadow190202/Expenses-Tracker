import React from "react";
import { ShieldCheck, Database, BarChart3, CheckCircle2 } from "lucide-react";

function Features() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "Strict Multi-Tenant Security",
      description:
        "Server Actions verified by Clerk edge middleware with rigorous IDOR mitigation, ensuring users only ever query, mutate, or delete their own records.",
      badge: "Zero Client Credential Leak",
    },
    {
      icon: Database,
      title: "Relational Integrity with Cascade Deletes",
      description:
        "Drizzle ORM schema backed by serverless Neon PostgreSQL with numeric(12, 2) decimal precision, composite user indexes, and atomic ON DELETE CASCADE foreign keys.",
      badge: "Neon Serverless Postgres",
    },
    {
      icon: BarChart3,
      title: "Comparative Spending Analytics",
      description:
        "Interactive Recharts visual breakdown comparing budgeted targets against actual expenditures side-by-side with clamped progress and overage alerts.",
      badge: "Recharts Visualizations",
    },
    {
      icon: CheckCircle2,
      title: "Automated Quality Assurance",
      description:
        "16 Vitest unit tests validating financial math, currency formatters, zero-division boundaries, and overspending edge cases in under 400ms.",
      badge: "16 Tests Passing",
    },
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-xs sm:text-sm font-bold text-primary uppercase tracking-wider">
            Engineering Excellence
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Built on Real Architectural Foundations
          </p>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Engineered with a server-first mindset, type-safe data modeling, and rigorous defensive validations.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className="relative p-8 rounded-2xl border border-slate-200/90 bg-slate-50/50 hover:bg-slate-50 hover:border-primary/30 transition-all hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;
