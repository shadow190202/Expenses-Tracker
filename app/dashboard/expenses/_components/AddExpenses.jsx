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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expenses Amount</h2>
        <Input
          type="number"
          min="0.01"
          step="any"
          placeholder="e.g 1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button
        disabled={!(name?.trim() && amount) || loading}
        onClick={addNewExpenses}
        className="mt-3 w-full"
      >
        {loading ? <Loader className="animate-spin" /> : "Add New Expenses"}
      </Button>
    </div>
  );
}

export default AddExpenses;
