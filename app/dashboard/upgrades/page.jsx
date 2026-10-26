import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UpgradesPage() {
  const plans = [
    {
      name: "Free Tier",
      price: "$0",
      description: "Basic expense tracking for individuals",
      features: [
        "Unlimited budget creation",
        "Real-time expense logs",
        "Interactive dashboard analytics",
        "Standard security & Clerk auth",
      ],
      current: true,
    },
    {
      name: "Pro Plan",
      price: "$9.99",
      period: "/ month",
      description: "Advanced financial insights & multi-currency support",
      features: [
        "Everything in Free Tier",
        "CSV & PDF financial exports",
        "Recurring budget automated cycles",
        "Multi-currency exchange rates",
        "Priority 24/7 support",
      ],
      current: false,
    },
  ];

  return (
    <div className="p-10 max-w-5xl">
      <h1 className="font-bold text-3xl mb-2">Upgrade Plans</h1>
      <p className="text-gray-500 mb-8">
        Unlock premium financial insights and automated reports.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`border rounded-xl p-8 shadow-sm flex flex-col justify-between ${
              plan.current ? "border-primary bg-blue-50/20" : "border-gray-200"
            }`}
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{plan.name}</h2>
                {plan.current && (
                  <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                    Current Plan
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                {plan.period && (
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button
              variant={plan.current ? "outline" : "default"}
              className="w-full"
              disabled={plan.current}
            >
              {plan.current ? "Active Plan" : "Upgrade to Pro"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
