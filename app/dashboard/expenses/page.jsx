"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import ExpensesListTable from "./_components/ExpensesListTable";
import { getAllExpenses } from "@/actions/expenses";
import { toast } from "sonner";

export default function ExpensesPage() {
  const { user } = useUser();

  const [expensesList, setExpensesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadAllExpenses();
    }
  }, [user]);

  const loadAllExpenses = async () => {
    try {
      setLoading(true);
      const result = await getAllExpenses();
      setExpensesList(result || []);
    } catch (error) {
      console.error("Error loading expenses:", error);
      toast.error(error.message || "Failed to load expenses");
    } finally {
      setLoading(false);
    }
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
          refreshData={loadAllExpenses}
        />
      )}
    </div>
  );
}
