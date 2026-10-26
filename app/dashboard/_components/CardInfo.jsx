import { PiggyBank, ReceiptText, Wallet } from "lucide-react";
import React, { useEffect, useState } from "react";

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

  return (
    <div>
      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="p-7 border rounded-lg flex items-center justify-between shadow-sm">
          <div>
            <h2 className="text-sm text-gray-500">Total Budget</h2>
            <h2 className="font-bold text-2xl">${totalBudget.toLocaleString()}</h2>
          </div>
          <PiggyBank className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
        </div>
        <div className="p-7 border rounded-lg flex items-center justify-between shadow-sm">
          <div>
            <h2 className="text-sm text-gray-500">Total Spend</h2>
            <h2 className="font-bold text-2xl">${totalSpend.toLocaleString()}</h2>
          </div>
          <ReceiptText className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
        </div>
        <div className="p-7 border rounded-lg flex items-center justify-between shadow-sm">
          <div>
            <h2 className="text-sm text-gray-500">Total Budgets</h2>
            <h2 className="font-bold text-2xl">{budgetList?.length || 0}</h2>
          </div>
          <Wallet className="bg-primary p-3 h-12 w-12 rounded-full text-white" />
        </div>
      </div>
    </div>
  );
}

export default CardInfo;
