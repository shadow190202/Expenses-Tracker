import React from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/formatters";

function BudgetItem({ budget }) {
  const calculateProgressPercent = () => {
    const total = Number(budget?.amount);
    if (!total || total <= 0) return 0;
    const perc = ((Number(budget?.totalSpend) || 0) / total) * 100;
    return Math.min(Math.max(perc, 0), 100).toFixed(0);
  };

  const amount = Number(budget?.amount) || 0;
  const totalSpend = Number(budget?.totalSpend) || 0;
  const remaining = amount - totalSpend;

  return (
    <Link href={`/dashboard/expenses/${budget?.id}`}>
      <div className="p-5 border rounded-lg h-[170px] hover:shadow-md cursor-pointer transition-shadow bg-white flex flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="text-2xl p-3 bg-slate-100 rounded-full flex-shrink-0">
              {budget?.icon || "💰"}
            </div>
            <div className="min-w-0">
              <h2
                className="font-bold text-base md:text-lg text-slate-800 truncate"
                title={budget?.name}
              >
                {budget?.name}
              </h2>
              <h2 className="text-sm text-slate-500 font-medium">
                {budget?.totalItem || budget?.totalItems || 0} Items
              </h2>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <h2 className="font-bold text-primary text-base md:text-lg">
              {formatCurrency(budget?.amount || amount)}
            </h2>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs text-slate-500 font-medium">
              {formatCurrency(totalSpend)} Spent
            </h2>
            <h2 className="text-xs text-slate-500 font-medium">
              {remaining < 0
                ? `${formatCurrency(Math.abs(remaining))} Over`
                : `${formatCurrency(remaining)} Remaining`}
            </h2>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all ${
                remaining < 0 ? "bg-red-500" : "bg-primary"
              }`}
              style={{
                width: `${calculateProgressPercent()}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
