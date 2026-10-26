import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, ExternalLink } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-slate-800">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Image src="/logo.svg" alt="ExpenseTracker Logo" width={30} height={30} />
              <span className="font-bold text-xl text-white">ExpenseTracker</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              A robust, privacy-focused budgeting web application built to help you track expenses,
              set realistic targets, and achieve financial clarity.
            </p>
          </div>

          {/* Architecture & Tech Stack */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Core Tech Stack
            </h4>
            <ul className="text-sm text-slate-400 space-y-1.5">
              <li>Next.js 16 (App Router & Server Actions)</li>
              <li>Neon Serverless PostgreSQL & Drizzle ORM</li>
              <li>Clerk Multi-Tenant Authentication</li>
              <li>Tailwind CSS v4 & Recharts Analytics</li>
              <li>Vitest Automated Unit Testing Suite</li>
            </ul>
          </div>

          {/* Developer & Repository Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Developer & Source
            </h4>
            <div className="flex flex-col space-y-2 text-sm">
              <a
                href="https://github.com/shadow190202/Expenses-Tracker"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>GitHub Repository</span>
                <ExternalLink className="h-3 w-3 text-slate-500" />
              </a>
              <a
                href="https://github.com/shadow190202"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>Developer GitHub (@shadow190202)</span>
                <ExternalLink className="h-3 w-3 text-slate-500" />
              </a>
              <a
                href="https://linkedin.com/in/shreyansh-sahu-9503a0325"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                <span>Developer LinkedIn (Shreyansh Sahu)</span>
                <ExternalLink className="h-3 w-3 text-slate-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright & License */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Shreyansh Sahu. Open source under MIT License.</p>
          <p>Engineered with Next.js App Router, Neon PostgreSQL, and Clerk.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
