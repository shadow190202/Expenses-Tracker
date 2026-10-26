"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { addExpense } from "@/actions/expenses";

function AddExpenses({ budgetId, refreshData }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const addNewExpenses = async () => {
    if (!name?.trim() || name.trim().length < 2) {
      toast.error("Expense name must be at least 2 characters long");
      return;
    }
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount greater than 0");
      return;
    }

    try {
      setLoading(true);
      await addExpense({
        name,
        amount,
        budgetId,
      });

      setAmount("");
      setName("");
      toast.success("Expense Added Successfully!");
      refreshData();
    } catch (error) {
      console.error("Failed to add expense:", error);
      toast.error(error.message || "Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-slate-200/80 p-5 rounded-xl bg-white shadow-xs">
      <h2 className="font-bold text-lg text-slate-900">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-slate-700 font-medium my-1 text-sm">Expense Name</h2>
        <Input
          placeholder="e.g. Office Supplies"
          required
          maxLength={100}
          className="rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-slate-700 font-medium my-1 text-sm">Expense Amount</h2>
        <Input
          type="number"
          min="0.01"
          step="0.01"
          placeholder="e.g. 150"
          className="rounded-lg"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button
        disabled={!name?.trim() || !amount || Number(amount) <= 0 || loading}
        onClick={addNewExpenses}
        className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg"
      >
        {loading ? <Loader className="animate-spin h-4 w-4" /> : "Add Expense"}
      </Button>
    </div>
  );
}

export default AddExpenses;
