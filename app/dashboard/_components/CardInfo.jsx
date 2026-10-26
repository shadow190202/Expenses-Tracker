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
      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="p-7 border rounded-lg flex items-center justify-between shadow-sm bg-white">
          <div>
            <h2 className="text-sm text-gray-500">Total Budget</h2>
            <h2 className="font-bold text-2xl">{formatCurrency(totalBudget)}</h2>
          </div>
          <PiggyBank className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
        </div>
        <div className="p-7 border rounded-lg flex items-center justify-between shadow-sm bg-white">
          <div>
            <h2 className="text-sm text-gray-500">Total Spend</h2>
            <h2 className="font-bold text-2xl">{formatCurrency(totalSpend)}</h2>
          </div>
          <ReceiptText className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
        </div>
        <div className="p-7 border rounded-lg flex items-center justify-between shadow-sm bg-white">
          <div>
            <h2 className="text-sm text-gray-500">Remaining Budget</h2>
            <h2
              className={`font-bold text-2xl ${
                remainingBudget < 0 ? "text-red-600" : ""
              }`}
            >
              {formatCurrency(remainingBudget)}
            </h2>
          </div>
          <Wallet className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
        </div>
      </div>
    </div>
  );
}

export default CardInfo;
