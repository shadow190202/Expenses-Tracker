import React from "react";
import Link from "next/link";
import Header from "../_components/Header";
import Footer from "../_components/Footer";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="text-sm text-slate-500 mb-8">Effective Date: October 2026</p>

        <div className="space-y-8 text-sm text-slate-600 leading-relaxed">
          {/* 1. Acceptance of Terms */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or creating an account on Expenses Tracker, you acknowledge
              and agree to be bound by these Terms of Service. If you do not agree with any part
              of these terms, please discontinue using the service immediately.
            </p>
          </section>

          {/* 2. Nature of the Service */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              2. Nature of the Service (Portfolio Project)
            </h2>
            <p>
              Expenses Tracker is developed and hosted as an engineering showcase and portfolio demonstration
              project by Shreyansh Sahu. This service is <strong>NOT financial, tax, or legal advice</strong>.
              Users should not rely on this application for critical business accounting, statutory filing,
              or auditing purposes.
            </p>
          </section>

          {/* 3. "As Is" Disclaimer */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              3. &quot;As Is&quot; Disclaimer
            </h2>
            <p>
              The application, its database, and associated services are provided on an &quot;AS IS&quot;
              and &quot;AS AVAILABLE&quot; basis without warranties of any kind, either express or implied,
              including but not limited to merchantability, fitness for a particular purpose, or uninterrupted availability.
            </p>
          </section>

          {/* 4. Account & Data Termination */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              4. Account Termination & Database Resets
            </h2>
            <p>
              Because this is a demonstration environment, the developer reserves the right to wipe database records,
              reset migration schemas, prune inactive test data, or suspend the hosted demo at any time without prior notice.
            </p>
          </section>

          {/* 5. Governing Law & Licensing */}
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              5. Governing Law & Open-Source License
            </h2>
            <p>
              The source code for Expenses Tracker is licensed under the <strong>MIT License</strong>.
              You are free to inspect, fork, or run your own private instance under the terms of the MIT license.
              Source code and licensing documentation can be reviewed on the{" "}
              <a
                href="https://github.com/shadow190202/Expenses-Tracker"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline"
              >
                GitHub Repository
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
