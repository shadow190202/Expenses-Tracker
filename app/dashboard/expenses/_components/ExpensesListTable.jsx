import React from "react";
import { db } from "@/utils/db";
import { Trash } from "lucide-react";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

function ExpensesListTable({ expensesList, refreshData }) {
  const deleteExpense = async (expense) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();
    if (result) {
      toast("Expense deleted successfully");
      refreshData();
    }
  };

  return (
    <div className="mt-3">
      <h2 className="font-bold text-lg ">Latest Expenses</h2>
      <div className="grid grid-cols-4 bg-slate-200 p-2 mt-2">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expensesList.map((expenses, index) => (
        <div className="grid grid-cols-4 bg-slate-50 p-2">
          <h2>{expenses.name}</h2>
          <h2>{expenses.amount}</h2>
          <h2>{expenses.createdAt}</h2>
          <h2>
            <Trash
              className="cursor-pointer text-red-500"
              onClick={() => deleteExpense(expenses)}
            />
          </h2>
        </div>
      ))}
    </div>
  );
}

export default ExpensesListTable;
