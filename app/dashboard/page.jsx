"use client";
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import CardInfo from './_components/CardInfo';
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpensesListTable from './expenses/_components/ExpensesListTable';
import { getBudgetsList } from '@/actions/budgets';
import { getAllExpenses } from '@/actions/expenses';
import { toast } from 'sonner';

function Dashboard() {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setExpensesList] = useState([]);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      const [budgets, expenses] = await Promise.all([
        getBudgetsList(),
        getAllExpenses(),
      ]);
      setBudgetList(budgets || []);
      setExpensesList(expenses || []);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
      toast.error(error.message || "Failed to load dashboard data");
    }
  };

  return (
    <div>
      <h2 className='font-bold text-3xl text-slate-900'>
        {user?.fullName ? `Welcome back, ${user.fullName}` : "Dashboard"}
      </h2>
      <p className='text-slate-500 mt-1'>
        Monitor your financial health, budget allocations, and expense activity.
      </p>
      <CardInfo budgetList={budgetList} />
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6'>
        <div className='lg:col-span-2 space-y-6'>
          <BarChartDashboard budgetList={budgetList} />
          <ExpensesListTable 
            expensesList={expensesList}
            refreshData={() => loadDashboardData()}
            emptyMessage="No expenses recorded yet."
          />
        </div>
        <div className='lg:col-span-1 space-y-4'>
          <h2 className='font-bold text-lg text-slate-900'>Latest Budgets</h2>
          {budgetList.length > 0 ? (
            budgetList.map((budget, index) => (
              <BudgetItem budget={budget} key={budget.id || index} />
            ))
          ) : (
            <div className="p-6 border border-slate-200/80 rounded-xl text-center text-slate-400 text-sm bg-slate-50/50">
              No budgets created yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
