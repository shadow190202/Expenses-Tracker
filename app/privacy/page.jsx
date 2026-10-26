import React from "react";
import Link from "next/link";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: October 2026</p>

        <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-2">1. Data Ownership & Isolation</h2>
            <p>
              ExpenseTracker is engineered with strict multi-tenant isolation. All budget records,
              expenses, and financial details are scoped strictly to your authenticated account.
              No cross-tenant data access is permitted.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-2">2. Authentication</h2>
            <p>
              Authentication is managed via Clerk. We do not store your passwords on our servers.
              Session tokens are verified on each server action to ensure authorized access.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-2">3. Database Security</h2>
            <p>
              Our database is powered by Neon Serverless PostgreSQL with encrypted connections.
              Database connection credentials are never exposed to the client application.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
