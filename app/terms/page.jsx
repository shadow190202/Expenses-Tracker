import React from "react";
import Link from "next/link";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
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
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Terms of Service</h1>
        <p className="text-sm text-slate-500 mb-8">Last updated: October 2026</p>

        <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-2">1. Terms of Use</h2>
            <p>
              By accessing ExpenseTracker, you agree to use this application for personal budgeting
              and financial management purposes in compliance with all applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-2">2. Open Source License</h2>
            <p>
              This project is licensed under the MIT License. You may inspect, fork, and contribute
              to the source code on GitHub.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-2">3. Disclaimer</h2>
            <p>
              ExpenseTracker is an informational budgeting utility. It does not provide certified
              financial, accounting, or tax advice.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
