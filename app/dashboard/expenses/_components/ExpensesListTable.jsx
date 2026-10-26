"use client";
import React, { useState } from "react";
import { Trash, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { deleteExpense as deleteExpenseAction } from "@/actions/expenses";

function ExpensesListTable({ expensesList, refreshData }) {
  const [deletingId, setDeletingId] = useState(null);

  const handleDeleteExpense = async (expense) => {
    try {
      setDeletingId(expense.id);
      await deleteExpenseAction(expense.id);
      toast.success("Expense deleted successfully");
      refreshData();
    } catch (error) {
      console.error("Failed to delete expense:", error);
      toast.error(error.message || "Failed to delete expense");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-3">
      <h2 className="font-bold text-lg ">Latest Expenses</h2>
      <div className="grid grid-cols-4 bg-slate-200 p-2 mt-2 rounded-t-md font-semibold text-gray-700">
        <h2>Name</h2>
        <h2>Amount</h2>
        <h2>Date</h2>
        <h2>Action</h2>
      </div>
      {expensesList && expensesList.length > 0 ? (
        expensesList.map((expenses, index) => (
          <div
            key={expenses.id || index}
            className="grid grid-cols-4 bg-slate-50 p-2 border-b border-slate-100 items-center text-sm"
          >
            <span className="font-medium">{expenses.name}</span>
            <span>${expenses.amount}</span>
            <span className="text-gray-500">{expenses.createdAt}</span>
            <span>
              {deletingId === expenses.id ? (
                <Loader2 className="h-4 w-4 animate-spin text-red-500" />
              ) : (
                <Trash
                  className="cursor-pointer text-red-500 hover:text-red-700 h-4 w-4"
                  onClick={() => handleDeleteExpense(expenses)}
                />
              )}
            </span>
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-gray-500 bg-slate-50 border rounded-b-md">
          No expenses recorded yet.
        </div>
      )}
    </div>
  );
}

export default ExpensesListTable;
