"use client";
import React, { useState } from "react";
import { Trash, Loader2, ReceiptText } from "lucide-react";
import { toast } from "sonner";
import { deleteExpense as deleteExpenseAction } from "@/actions/expenses";
import { formatCurrency, formatDate } from "@/lib/formatters";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function ExpensesListTable({
  expensesList,
  refreshData,
  emptyMessage = "No expenses logged for this budget yet. Add your first expense above!",
}) {
  const [deletingId, setDeletingId] = useState(null);

  const handleDeleteExpense = async (expenseId) => {
    try {
      setDeletingId(expenseId);
      await deleteExpenseAction(expenseId);
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
      <h2 className="font-bold text-lg">Latest Expenses</h2>
      <div className="grid grid-cols-4 bg-slate-200 p-2 mt-2 rounded-t-md font-semibold text-gray-700 text-sm">
        <span>Name</span>
        <span>Amount</span>
        <span>Date</span>
        <span>Action</span>
      </div>
      {expensesList && expensesList.length > 0 ? (
        expensesList.map((expenses, index) => (
          <div
            key={expenses.id || index}
            className="grid grid-cols-4 bg-slate-50 p-2 border-b border-slate-100 items-center text-sm"
          >
            <span className="font-medium text-gray-800">{expenses.name}</span>
            <span>{formatCurrency(expenses.amount)}</span>
            <span className="text-gray-500">{formatDate(expenses.createdAt)}</span>
            <span>
              {deletingId === expenses.id ? (
                <Loader2 className="h-4 w-4 animate-spin text-red-500" />
              ) : (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      type="button"
                      aria-label={`Delete expense ${expenses.name}`}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Expense</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete &quot;{expenses.name}&quot; ({formatCurrency(expenses.amount)})? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteExpense(expenses.id)}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        Delete Expense
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </span>
          </div>
        ))
      ) : (
        <div className="p-8 text-center bg-slate-50 border border-t-0 rounded-b-md flex flex-col items-center justify-center space-y-2">
          <ReceiptText className="h-8 w-8 text-slate-300" />
          <p className="text-gray-500 text-sm font-medium">
            {emptyMessage}
          </p>
        </div>
      )}
    </div>
  );
}

export default ExpensesListTable;
