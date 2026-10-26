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

  /**
   * Used to Add New Expenses
   */
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
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expenses</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expenses Name</h2>
        <Input
          placeholder="e.g Grocery"
          required
          maxLength={100}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expenses Amount</h2>
        <Input
          type="number"
          min="0.01"
          step="0.01"
          placeholder="e.g 1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button
        disabled={!name?.trim() || !amount || Number(amount) <= 0 || loading}
        onClick={addNewExpenses}
        className="mt-3 w-full flex items-center justify-center gap-2"
      >
        {loading ? <Loader className="animate-spin h-4 w-4" /> : "Add New Expense"}
      </Button>
    </div>
  );
}

export default AddExpenses;
