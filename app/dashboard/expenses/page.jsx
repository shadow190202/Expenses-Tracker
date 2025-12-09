"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { Budgets, Expenses } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import ExpensesListTable from "./_components/ExpensesListTable";

export default function ExpensesPage() {
  const { user } = useUser();

  const [expensesList, setExpensesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    user && getAllExpenses();
  }, [user]);

  /**
   * Fetch all expenses that belong to the logged-in user
   */
  const getAllExpenses = async () => {
    setLoading(true);
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
        budgetId: Expenses.budgetId,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Expenses.id));

    setExpensesList(result);
    setLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="font-bold text-3xl mb-2">All Expenses</h1>
      <p className="text-gray-500 mb-6">
        Track, review and manage all your spending in one place.
      </p>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : (
        <ExpensesListTable
          expensesList={expensesList}
          refreshData={getAllExpenses}
        />
      )}
    </div>
  );
}
