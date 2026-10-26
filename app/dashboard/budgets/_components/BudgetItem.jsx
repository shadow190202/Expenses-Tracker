import React from "react";
import Link from "next/link";

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
      <div className="p-5 border rounded-lg h-[170px] hover:shadow-md cursor-pointer transition-shadow">
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">
              {budget?.icon || "😀"}
            </h2>
            <div>
              <h2 className="font-bold text-gray-800">{budget?.name}</h2>
              <h2 className="text-sm text-gray-500">
                {budget?.totalItems || 0} Items
              </h2>
            </div>
          </div>
          <h2 className="font-bold text-primary text-lg">
            ${amount.toLocaleString()}
          </h2>
        </div>
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs text-slate-400">
              ${totalSpend.toLocaleString()} Spent
            </h2>
            <h2 className="text-xs text-slate-400">
              {remaining < 0
                ? `-$${Math.abs(remaining).toLocaleString()} Over`
                : `$${remaining.toLocaleString()} Remaining`}
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
