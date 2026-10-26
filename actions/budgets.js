'use server';

import { db } from '@/utils/db';
import { Budgets, Expenses } from '@/utils/schema';
import { and, desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { getAuthenticatedUser } from '@/lib/auth';

/**
 * Fetch all budgets for the authenticated user with spend calculations.
 */
export async function getBudgetsList() {
  const { email } = await getAuthenticatedUser();

  const result = await db
    .select({
      ...getTableColumns(Budgets),
      totalSpend: sql`coalesce(sum(${Expenses.amount}), 0)`.mapWith(Number),
      totalItems: sql`count(${Expenses.id})`.mapWith(Number),
    })
    .from(Budgets)
    .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createdBy, email))
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id));

  return result;
}

/**
 * Fetch a single budget by ID, strictly verifying ownership.
 */
export async function getBudgetById(id) {
  const { email } = await getAuthenticatedUser();
  const numericId = Number(id);

  if (!numericId || isNaN(numericId)) {
    throw new Error('Invalid budget ID');
  }

  const result = await db
    .select({
      ...getTableColumns(Budgets),
      totalSpend: sql`coalesce(sum(${Expenses.amount}), 0)`.mapWith(Number),
      totalItems: sql`count(${Expenses.id})`.mapWith(Number),
    })
    .from(Budgets)
    .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(and(eq(Budgets.id, numericId), eq(Budgets.createdBy, email)))
    .groupBy(Budgets.id);

  return result[0] || null;
}

/**
 * Create a new budget owned by the authenticated user.
 */
export async function createBudget({ name, amount, icon }) {
  const { email } = await getAuthenticatedUser();

  const trimmedName = typeof name === 'string' ? name.trim() : '';
  const parsedAmount = Number(amount);

  if (!trimmedName) {
    throw new Error('Budget name is required');
  }
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    throw new Error('Budget amount must be a positive number');
  }

  const result = await db
    .insert(Budgets)
    .values({
      name: trimmedName,
      amount: String(parsedAmount),
      createdBy: email,
      icon: icon || '😀',
    })
    .returning({ insertedId: Budgets.id });

  return result[0];
}

/**
 * Update an existing budget, strictly verifying ownership.
 */
export async function updateBudget({ id, name, amount, icon }) {
  const { email } = await getAuthenticatedUser();
  const numericId = Number(id);

  if (!numericId || isNaN(numericId)) {
    throw new Error('Invalid budget ID');
  }

  const trimmedName = typeof name === 'string' ? name.trim() : '';
  const parsedAmount = Number(amount);

  if (!trimmedName) {
    throw new Error('Budget name is required');
  }
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    throw new Error('Budget amount must be a positive number');
  }

  const result = await db
    .update(Budgets)
    .set({
      name: trimmedName,
      amount: String(parsedAmount),
      icon: icon || '😀',
    })
    .where(and(eq(Budgets.id, numericId), eq(Budgets.createdBy, email)))
    .returning();

  if (!result || result.length === 0) {
    throw new Error('Budget not found or unauthorized');
  }

  return result[0];
}

/**
 * Delete a budget and its associated expenses, verifying ownership.
 */
export async function deleteBudget(id) {
  const { email } = await getAuthenticatedUser();
  const numericId = Number(id);

  if (!numericId || isNaN(numericId)) {
    throw new Error('Invalid budget ID');
  }

  // Verify ownership before deleting
  const existing = await db
    .select({ id: Budgets.id })
    .from(Budgets)
    .where(and(eq(Budgets.id, numericId), eq(Budgets.createdBy, email)));

  if (!existing || existing.length === 0) {
    throw new Error('Budget not found or unauthorized');
  }

  // Delete associated expenses first to respect FK constraints
  await db
    .delete(Expenses)
    .where(eq(Expenses.budgetId, numericId));

  // Delete the budget
  const result = await db
    .delete(Budgets)
    .where(and(eq(Budgets.id, numericId), eq(Budgets.createdBy, email)))
    .returning();

  return result[0];
}

/**
 * Check if the authenticated user has any budgets.
 */
export async function hasUserBudgets() {
  const { email } = await getAuthenticatedUser();

  const result = await db
    .select({ id: Budgets.id })
    .from(Budgets)
    .where(eq(Budgets.createdBy, email))
    .limit(1);

  return result.length > 0;
}
