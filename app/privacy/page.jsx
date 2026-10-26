import React from "react";
import Link from "next/link";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto py-12 px-6 text-slate-800">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-slate-500 mb-8">Effective Date: October 2026</p>

        <div className="space-y-8 text-sm text-slate-600 leading-relaxed">
          {/* 1. Introduction */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              1. Introduction
            </h2>
            <p>
              Expenses Tracker is an open-source portfolio project designed and developed
              by <strong>Shreyansh Sahu</strong>. This application demonstrates modern,
              secure web engineering practices, full-stack Next.js App Router architecture,
              and multi-tenant financial data isolation. We are committed to transparency
              regarding how your data is handled.
            </p>
          </section>

          {/* 2. Data Collection */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              2. Data Collection
            </h2>
            <p>
              To provide core budgeting capabilities, we collect minimal information:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5">
              <li>
                <strong>Authentication Credentials:</strong> User accounts, session management,
                and identity verification are handled exclusively by <strong>Clerk</strong>.
                Passwords and sensitive auth credentials never touch our application database.
              </li>
              <li>
                <strong>Financial & Budget Records:</strong> Budget categories, spend targets,
                and logged expense entries are stored in a managed, serverless <strong>Neon PostgreSQL</strong> database.
              </li>
            </ul>
          </section>

          {/* 3. Data Usage */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              3. Data Usage
            </h2>
            <p>
              Collected data is utilized strictly for executing the application&apos;s core functionality—calculating
              aggregate spending, displaying comparative analytics, and tracking progress against your personal budgets.
              We do not sell, rent, monetize, or distribute your personal financial data to any third-party advertisers or data brokers.
            </p>
          </section>

          {/* 4. Cookies */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              4. Cookies
            </h2>
            <p>
              Expenses Tracker uses only strictly essential session cookies provided by Clerk to maintain secure
              authentication state across requests. We do not employ third-party tracking, profiling, or advertising cookies.
            </p>
          </section>

          {/* 5. Contact */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              5. Contact & Source Code
            </h2>
            <p>
              For security questions, inquiries, or bug reports, you can inspect the full source code and open an issue on the official{" "}
              <a
                href="https://github.com/shadow190202/Expenses-Tracker"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline"
              >
                Expenses Tracker GitHub Repository
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
