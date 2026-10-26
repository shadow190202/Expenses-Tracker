<div align="center">

# 💰 Expenses Tracker

An enterprise-ready, full-stack personal budgeting and financial management platform engineered with **Next.js App Router**, **React 19**, **Drizzle ORM**, **Neon Serverless PostgreSQL**, and **Clerk Authentication**.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://expenses-tracker-olive-chi.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)
[![Drizzle ORM](https://img.shields.io/badge/ORM-Drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)](https://orm.drizzle.team/)
[![PostgreSQL](https://img.shields.io/badge/DB-Neon%20Postgres-00E599?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)
[![TailwindCSS](https://img.shields.io/badge/Style-Tailwind%20v4-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**[🔗 Live Demo: expenses-tracker-olive-chi.vercel.app](https://expenses-tracker-olive-chi.vercel.app/)**

</div>

---

## 🏛️ Architecture & Tech Stack

Expenses Tracker is designed following modern full-stack web standards, emphasizing server-centric data boundaries, strict authorization, and sub-second cold starts.

| Layer | Technology | Details |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16 (App Router)** | Server Components, Server Actions, Dynamic Streaming, and Proxy/Middleware |
| **Runtime** | **React 19** | Modern UI primitives with concurrency and optimistic state handling |
| **Styling** | **Tailwind CSS v4** | Modern CSS engine with `@tailwindcss/postcss` and Radix UI primitives |
| **Authentication** | **Clerk** | Secure multi-tenant session management, edge middleware route protection |
| **ORM** | **Drizzle ORM** | Type-safe SQL schema definitions, relational joins, and atomic migrations |
| **Database** | **Neon PostgreSQL** | Serverless PostgreSQL with connection pooling and HTTP-based driver |
| **Analytics** | **Recharts** | Grouped responsive SVG bar charts, custom tooltips, and spending distribution |
| **Hosting** | **Vercel** | CI/CD integration, edge middleware execution, and automated branch previews |

---

## 🛡️ Core Security & Engineering Features

### 1. Server-Only Database Layer
- **Zero Credential Exposure**: Direct client-side database connections are completely prohibited. Database drivers import `'server-only'`, throwing compile-time errors if imported into client bundles.
- **Connection Privacy**: Database connection strings reside strictly in private server environment variables (`DATABASE_URL`), eliminating client-side connection leakage.

### 2. Authenticated Server Actions & IDOR Mitigation
- **Server-Side Session Resolution**: All data queries and mutations run exclusively inside Next.js Server Actions (`'use server'`). Every request cryptographically verifies the active user session via Clerk.
- **Ownership Verification**: Database queries enforce strict ownership filters:
  - Reading, updating, or deleting a budget requires matching both `id` AND the authenticated user's identifier.
  - Adding or deleting expenses verifies that the parent budget belongs to the requesting user before any SQL execution occurs.

### 3. Hardened Relational Schema & Performance
- **Fixed-Point Decimal Precision**: Monetary values are defined as `numeric(12, 2)`, preventing JavaScript floating-point rounding errors (e.g. IEEE 754 `$0.1 + $0.2` artifacts).
- **Relational Integrity**: Foreign key constraints are enforced with `ON DELETE CASCADE`. Deleting a budget atomically removes all associated expenses without orphan rows.
- **Index Optimization**: B-Tree indexes on `budgets.createdBy` and `expenses.budget_id` prevent full table scans during multi-table joins and aggregation queries.
- **Temporal Accuracy**: Timestamps use native PostgreSQL `timestamp with default now()`, enabling chronological sorting and date filtering.

### 4. Interactive Financial Analytics & Polish
- **Grouped Visual Comparisons**: Side-by-side grouped Recharts bars compare *Total Spent* against *Budget Amount* without false stacking.
- **Defensive Financial Math**: Clamped progress percentages prevent division-by-zero (`NaN`) and visual container overflows when budgets are overspent.
- **Zero Infinite Skeletons**: Explicit loading states differentiate between loading states and genuine empty states.
- **Adaptive Mobile Navigation**: Persistent responsive mobile navigation bar ensures full accessibility on smartphones and tablets.

---

## ⚙️ Environment Setup

Create a `.env` or `.env.local` file in the project root:

```env
# Serverless Database
DATABASE_URL="postgresql://user:password@ep-sample.neon.tech/expenses?sslmode=require"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# Clerk Route Handlers
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL="/dashboard"
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL="/dashboard"
```

---

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/shadow190202/Expenses-Tracker.git
cd Expenses-Tracker
npm install
```

### 2. Push Database Schema
Ensure `DATABASE_URL` is configured, then push the Drizzle schema to your PostgreSQL database:
```bash
npm run db:push
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 📂 Project Structure

```text
├── actions/                  # Authenticated Next.js Server Actions
│   ├── budgets.js            # Budget queries & ownership-verified mutations
│   └── expenses.js           # Expense queries, inserts, and cascade deletions
├── app/
│   ├── (auth)/sign-in/       # Clerk authentication routes
│   ├── _components/          # Landing page navigation and hero components
│   ├── dashboard/
│   │   ├── _components/      # Analytics chart, metric cards, and navigation
│   │   ├── budgets/          # Budget management & creation dialogs
│   │   └── expenses/         # Comprehensive expense logs & detail views
│   ├── layout.js             # Root layout with ClerkProvider & Toaster
│   └── page.js               # Public marketing landing page
├── components/ui/            # Reusable accessible UI components (Radix)
├── lib/
│   ├── auth.js               # Server-side Clerk authentication helper
│   └── utils.js              # Class merger utilities (clsx + tailwind-merge)
├── middleware.ts             # Route protection middleware
├── utils/
│   ├── db.jsx                # Server-only Neon PostgreSQL connection
│   └── schema.jsx            # Drizzle ORM schema with indexes & cascades
└── drizzle.config.js         # Drizzle Kit configuration
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
