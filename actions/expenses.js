'use server';

import { db } from '@/utils/db';
import { Budgets, Expenses } from '@/utils/schema';
import { and, desc, eq } from 'drizzle-orm';
import { getAuthenticatedUser } from '@/lib/auth';

function formatExpense(item) {
  if (!item) return item;
  let formattedDate = '';
  if (item.createdAt instanceof Date) {
    const day = String(item.createdAt.getDate()).padStart(2, '0');
    const month = String(item.createdAt.getMonth() + 1).padStart(2, '0');
    const year = item.createdAt.getFullYear();
    formattedDate = `${day}-${month}-${year}`;
  } else if (item.createdAt) {
    formattedDate = String(item.createdAt);
  }
  return {
    ...item,
    createdAt: formattedDate,
  };
}

/**
 * Fetch all expenses for a specific budget, strictly verifying budget ownership.
 */
export async function getExpensesByBudgetId(budgetId) {
  const { email } = await getAuthenticatedUser();
  const numericBudgetId = Number(budgetId);

  if (!numericBudgetId || isNaN(numericBudgetId)) {
    throw new Error('Invalid budget ID');
  }

  // Verify ownership of the parent budget
  const budget = await db
    .select({ id: Budgets.id })
    .from(Budgets)
    .where(and(eq(Budgets.id, numericBudgetId), eq(Budgets.createdBy, email)));

  if (!budget || budget.length === 0) {
    throw new Error('Budget not found or unauthorized');
  }

  const result = await db
    .select()
    .from(Expenses)
    .where(eq(Expenses.budgetId, numericBudgetId))
    .orderBy(desc(Expenses.id));

  return result.map(formatExpense);
}

/**
 * Fetch all expenses across all budgets owned by the authenticated user.
 */
export async function getAllExpenses() {
  const { email } = await getAuthenticatedUser();

  const result = await db
    .select({
      id: Expenses.id,
      name: Expenses.name,
      amount: Expenses.amount,
      createdAt: Expenses.createdAt,
      budgetId: Expenses.budgetId,
    })
    .from(Expenses)
    .innerJoin(Budgets, eq(Expenses.budgetId, Budgets.id))
    .where(eq(Budgets.createdBy, email))
    .orderBy(desc(Expenses.id));

  return result.map(formatExpense);
}

/**
 * Add an expense to a budget, strictly verifying that the budget belongs to the user.
 */
export async function addExpense({ name, amount, budgetId }) {
  const { email } = await getAuthenticatedUser();
  const numericBudgetId = Number(budgetId);
  const trimmedName = typeof name === 'string' ? name.trim() : '';
  const parsedAmount = Number(amount);

  if (!numericBudgetId || isNaN(numericBudgetId)) {
    throw new Error('Invalid budget ID');
  }
  if (!trimmedName) {
    throw new Error('Expense name is required');
  }
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    throw new Error('Expense amount must be a positive number');
  }

  // Verify ownership of the parent budget
  const budget = await db
    .select({ id: Budgets.id })
    .from(Budgets)
    .where(and(eq(Budgets.id, numericBudgetId), eq(Budgets.createdBy, email)));

  if (!budget || budget.length === 0) {
    throw new Error('Budget not found or unauthorized');
  }

  const result = await db
    .insert(Expenses)
    .values({
      name: trimmedName,
      amount: String(parsedAmount),
      budgetId: numericBudgetId,
      createdAt: new Date(),
    })
    .returning({ insertedId: Expenses.id });

  return result[0];
}

/**
 * Delete an expense, verifying that it belongs to a budget owned by the authenticated user.
 */
export async function deleteExpense(expenseId) {
  const { email } = await getAuthenticatedUser();
  const numericExpenseId = Number(expenseId);

  if (!numericExpenseId || isNaN(numericExpenseId)) {
    throw new Error('Invalid expense ID');
  }

  // Verify that the expense belongs to a budget owned by the user
  const record = await db
    .select({ id: Expenses.id })
    .from(Expenses)
    .innerJoin(Budgets, eq(Expenses.budgetId, Budgets.id))
    .where(
      and(
        eq(Expenses.id, numericExpenseId),
        eq(Budgets.createdBy, email)
      )
    );

  if (!record || record.length === 0) {
    throw new Error('Expense not found or unauthorized');
  }

  const result = await db
    .delete(Expenses)
    .where(eq(Expenses.id, numericExpenseId))
    .returning();

  return result[0];
}
