
<div align="center">

# 💰 Expenses Tracker  
A modern, full-stack personal budgeting & expense management app built with **Next.js 14**, **Drizzle ORM**, **PostgreSQL**, **Clerk Auth**, and **Recharts** for analytics.

</div>

---

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![Clerk](https://img.shields.io/badge/Auth-Clerk-blue?style=for-the-badge)
![Drizzle ORM](https://img.shields.io/badge/ORM-Drizzle-ffdd00?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/DB-PostgreSQL-4169e1?style=for-the-badge&logo=postgresql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Style-Tailwind-38bdf8?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

---

# 📘 Table of Contents
- [🚀 Features](#-features)
- [🧪 Tech Stack](#-tech-stack)
- [📦 Installation](#-installation)
- [⚙️ Environment Variables](#️-environment-variables)
- [🗄️ Database Setup (Drizzle + Postgres)](#️-database-setup)
- [🔐 Authentication (Clerk)](#-authentication-clerk)
- [📂 Folder Structure](#-folder-structure)
- [📖 Usage Guide](#-usage-guide)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

# 🚀 Features

### 💼 Budget Management
- Create budgets
- Track budget limits
- View remaining balance
- List all recent budgets

### 💸 Expense Tracking
- Add expenses inside budgets  
- View all expenses with filters  
- Delete and refresh instantly  

### 📊 Visual Analytics
- Bar charts for spending trends  
- Compare *Budget Amount* vs *Total Spend*  

### 🔐 Authentication with Clerk
- Secure login / signup  
- User-specific budgets & expenses  

### 🎨 UI / UX
- Responsive Tailwind UI  
- Modern dashboard layout  

---

# 🧪 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js (App Router), React |
| Authentication | Clerk |
| Database | PostgreSQL |
| ORM | Drizzle ORM |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Hosting | Vercel (recommended) |

---

# 📦 Installation

```bash
git clone https://github.com/shadow190202/Expenses-Tracker.git
cd Expenses-Tracker
npm install
````

Start development server:

```bash
npm run dev
```

App will run at:

```
http://localhost:3000
```

---

# ⚙️ Environment Variables

Create a `.env.local` file in root:

```
DATABASE_URL="postgres://username:password@host:5432/dbname"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

---

# 🗄️ Database Setup

You must have **PostgreSQL** running.

Run migrations (if you added drizzle):

```bash
npx drizzle-kit generate
npx drizzle-kit push
```

Drizzle schema lives in:

```
/utils/schema.js
```

---

# 🔐 Authentication (Clerk)

1. Go to: [https://clerk.com](https://clerk.com)
2. Create a project
3. Get your API keys
4. Add them to `.env.local`
5. Add Clerk provider in `layout.jsx`:

```jsx
import { ClerkProvider } from '@clerk/nextjs'

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
```

---

# 📂 Folder Structure

```
app/
 ├── dashboard/
 │     ├── page.jsx
 │     ├── _components/
 │     │      ├── CardInfo.jsx
 │     │      ├── BarChartDashboard.jsx
 │     │      └── BudgetItem.jsx
 ├── expenses/
 │     ├── page.jsx
 │     └── _components/
 │            └── ExpensesListTable.jsx
 ├── budgets/
 │     └── ...
components/
utils/
 ├── db.js
 └── schema.js
public/
```

---

# 📖 Usage Guide

### **1. Create a Budget**

* Enter a name, amount, and description
* Budget appears on dashboard

### **2. Add an Expense**

* Choose a budget
* Add expense name + amount
* Expense attaches to that budget

### **3. Dashboard Overview**

* See total budgets
* See total spend
* View bar charts for analytics

### **4. Expenses Page**

* See all expenses
* Delete / refresh dynamically

---

# 🚀 Deployment

### Recommended: **Vercel**

1. Push code to GitHub
2. Go to [https://vercel.com](https://vercel.com)
3. Import your repository
4. Add all env variables
5. Deploy 🎉

Make sure `DATABASE_URL` is production-ready (Supabase / Neon / Railway).

---

# 🤝 Contributing

Contributions are always welcome!

```bash
git checkout -b feature/my-feature
git commit -m "Added new feature"
git push origin feature/my-feature
```

Open a Pull Request 🚀

---

# 📄 License

This project is licensed under the **MIT License** — free to use and modify.

✅ Add a **GIF demo**?  
✅ Add **installation troubleshooting**?  
✅ Add **live demo link** section for Vercel?  

Just tell me!
```
