"use client";
import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";
import { getBudgetsList } from "@/actions/budgets";
import { toast } from "sonner";

function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      loadBudgets();
    }
  }, [user]);

  const loadBudgets = async () => {
    try {
      setLoading(true);
      const result = await getBudgetsList();
      setBudgetList(result || []);
    } catch (error) {
      console.error("Error loading budgets:", error);
      toast.error(error.message || "Failed to load budgets");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CreateBudget refreshData={loadBudgets} />
        {loading ? (
          [1, 2, 3, 4, 5].map((item, index) => (
            <div
              key={index}
              className="w-full bg-slate-200 rounded-lg h-[140px] animate-pulse"
            ></div>
          ))
        ) : budgetList.length > 0 ? (
          budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={budget.id || index} />
          ))
        ) : null}
      </div>
    </div>
  );
}

export default BudgetList;
