"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "../../budgets/_components/BudgetItem";
import AddExpenses from "../_components/AddExpenses";
import ExpensesListTable from "../_components/ExpensesListTable";
import EditBudget from "../_components/EditBudget";
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
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getBudgetById, deleteBudget as deleteBudgetAction } from "@/actions/budgets";
import { getExpensesByBudgetId } from "@/actions/expenses";

function ExpensesScreen({ id }) {
  const { user } = useUser();
  const [budgetInfo, setbudgetInfo] = useState();
  const [expensesList, setExpensesList] = useState([]);
  const route = useRouter();

  useEffect(() => {
    if (user && id) {
      getBudgetInfo();
    }
  }, [user, id]);

  const getBudgetInfo = async () => {
    try {
      const budget = await getBudgetById(id);
      if (!budget) {
        toast.error("Budget not found or unauthorized");
        route.replace("/dashboard/budgets");
        return;
      }
      setbudgetInfo(budget);
      await getExpensesList();
    } catch (error) {
      console.error("Failed to load budget:", error);
      toast.error(error.message || "Failed to load budget");
      route.replace("/dashboard/budgets");
    }
  };

  const getExpensesList = async () => {
    try {
      const list = await getExpensesByBudgetId(id);
      setExpensesList(list || []);
    } catch (error) {
      console.error("Failed to load expenses:", error);
      toast.error(error.message || "Failed to load expenses");
    }
  };

  const handleDeleteBudget = async () => {
    try {
      await deleteBudgetAction(id);
      toast.success("Budget Deleted!");
      route.replace("/dashboard/budgets");
    } catch (error) {
      console.error("Failed to delete budget:", error);
      toast.error(error.message || "Failed to delete budget");
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold flex justify-between items-center">
        My Expenses
        <div className="flex gap-2 items-center">
          {budgetInfo ? (
            <EditBudget
              budgetInfo={budgetInfo}
              refreshData={() => getBudgetInfo()}
            />
          ) : (
            <div className="bg-slate-200 rounded-lg animate-pulse h-10 w-24"></div>
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
                <AlertDialogAction onClick={() => handleDeleteBudget()}>
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
