"use client";
import { db } from "@/utils/db";
import { Budgets, Expenses } from "@/utils/schema";
import React, { useEffect, useState } from "react";
import { getTableColumns, sql, eq, desc } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpenses from "../_components/AddExpenses";
import ExpensesListTable from "../_components/ExpensesListTable";
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
import { Button } from "@/components/ui/button";
import { PenBox, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import EditBudget from "../_components/EditBudget";

function ExpensesScreen({ id }) {
  const { user } = useUser();
  const [budgetInfo, setbudgetInfo] = useState();
  const [expensesList, setExpensesList] = useState([]);
  const route = useRouter();

  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  /**
   * To Get Budget
   */

  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItems: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, id))
      .groupBy(Budgets.id);

    setbudgetInfo(result[0]);
    getExpensesList();
  };

  /**
   * Get Latest Expenses
   */

  const getExpensesList = async () => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, id))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
  };

  /**
   * Get Delete Budget
   */
  const deleteBudget = async () => {
    const deleteExpenseResult = await db
      .delete(Expenses)
      .where(eq(Expenses.budgetId, id))
      .returning();

    if (deleteExpenseResult) {
      const result = await db
        .delete(Budgets)
        .where(eq(Budgets.id, id))
        .returning();
    }
    toast("Budget Deleted!");
    route.replace("/dashboard/budgets");
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold flex justify-between items-center">
        My Expenses
        <div className="flex gap-2 items-center">
          {/* <EditBudget budgetInfo={budgetInfo} /> */}
          {budgetInfo ? (
            <EditBudget budgetInfo={budgetInfo}
            refreshData={()=>getBudgetInfo()}
            />
          ) : (
            <div className="bg-slate-200 rounded-lg animate-pulse"></div>
          )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2" variant="destructive">
                <Trash />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your current budget along with expenses and remove your data
                  from server.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBudget()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-5">
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        )}
        <AddExpenses
          budgetId={id}
          user={user}
          refreshData={() => getBudgetInfo()}
        />
      </div>
      <div className="mt-4">
        
        <ExpensesListTable
          expensesList={expensesList}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </div>
  );
}

export default ExpensesScreen;
