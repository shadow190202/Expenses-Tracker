import {
  index,
  integer,
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const Budgets = pgTable(
  "budgets",
  {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    icon: varchar("icon"),
    createdBy: varchar("createdBy").notNull(),
  },
  (table) => [
    index("budgets_created_by_idx").on(table.createdBy),
  ]
);

export const Expenses = pgTable(
  "expenses",
  {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull().default("0"),
    budgetId: integer("budget_id").references(() => Budgets.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => [
    index("expenses_budget_id_idx").on(table.budgetId),
  ]
);
