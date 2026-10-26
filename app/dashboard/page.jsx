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
      setBudgetList(budgets);
      setExpensesList(expenses);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
      toast.error(error.message || "Failed to load dashboard data");
    }
  };

  return (
    <div className='p-8'>
      <h2 className='font-bold text-3xl '>Hi, {user?.fullName} ✌️</h2>
      <p className='text-gray-500'>Here's what happening with your money, Let's Manage your expenses</p>
      <CardInfo budgetList={budgetList} />
      <div className='grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>
        <div className='md:col-span-2'>
          <BarChartDashboard budgetList={budgetList} />
          <ExpensesListTable 
            expensesList={expensesList}
            refreshData={() => loadDashboardData()}
          />
        </div>
        <div className='grid gap-5'>
          <h2 className='font-bold text-lg'>Latest Budgets</h2>
          {budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={budget.id || index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
