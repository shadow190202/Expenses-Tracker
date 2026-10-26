import { PiggyBank, ReceiptText, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/formatters";

function CardInfo({ budgetList }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  useEffect(() => {
    if (budgetList) {
      calculateCardInfo();
    }
  }, [budgetList]);

  const calculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;

    (budgetList || []).forEach((element) => {
      totalBudget_ += Number(element.amount) || 0;
      totalSpend_ += Number(element.totalSpend) || 0;
    });

    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  };

  const remainingBudget = totalBudget - totalSpend;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        <div className="p-6 border border-slate-200/80 rounded-xl flex items-center justify-between shadow-xs bg-white min-h-[110px]">
          <div>
            <h2 className="text-sm font-medium text-slate-500">Total Budget</h2>
            <h2 className="font-bold text-2xl text-slate-900 mt-1">
              {formatCurrency(totalBudget)}
            </h2>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <PiggyBank className="h-6 w-6" />
          </div>
        </div>

        <div className="p-6 border border-slate-200/80 rounded-xl flex items-center justify-between shadow-xs bg-white min-h-[110px]">
          <div>
            <h2 className="text-sm font-medium text-slate-500">Total Spend</h2>
            <h2 className="font-bold text-2xl text-slate-900 mt-1">
              {formatCurrency(totalSpend)}
            </h2>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <ReceiptText className="h-6 w-6" />
          </div>
        </div>

        <div className="p-6 border border-slate-200/80 rounded-xl flex items-center justify-between shadow-xs bg-white min-h-[110px]">
          <div>
            <h2 className="text-sm font-medium text-slate-500">Remaining Budget</h2>
            <h2
              className={`font-bold text-2xl mt-1 ${
                remainingBudget < 0 ? "text-red-600" : "text-slate-900"
              }`}
            >
              {formatCurrency(remainingBudget)}
            </h2>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Wallet className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardInfo;
