"use client";
import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";
import { getBudgetsList } from "@/actions/budgets";
import { toast } from "sonner";
import { PiggyBank, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index}
              className="w-full bg-slate-200 rounded-xl h-[170px] animate-pulse"
            ></div>
          ))}
        </div>
      ) : budgetList.length === 0 ? (
        <div className="border-2 border-dashed border-slate-200 rounded-xl p-12 text-center bg-slate-50/60 flex flex-col items-center justify-center max-w-xl mx-auto space-y-4 my-8">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl">
            <PiggyBank className="h-10 w-10" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-xl text-slate-800">
              No budgets created yet
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Create your first budget to organize your spending, track progress,
              and take control of your financial goals.
            </p>
          </div>
          <CreateBudget refreshData={loadBudgets}>
            <Button className="mt-2 flex items-center gap-2 px-5 py-2.5 text-sm rounded-lg shadow-xs">
              <PlusCircle className="h-4 w-4" />
              Create Your First Budget
            </Button>
          </CreateBudget>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <CreateBudget refreshData={loadBudgets} />
          {budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={budget.id || index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BudgetList;
