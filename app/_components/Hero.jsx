"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { ArrowRight, Github } from "lucide-react";

function Hero() {
  const { isSignedIn } = useUser();

  const techStack = [
    { name: "Next.js 16 (App Router)", highlight: true },
    { name: "React 19", highlight: false },
    { name: "Tailwind CSS v4", highlight: false },
    { name: "Drizzle ORM", highlight: false },
    { name: "Neon Serverless PostgreSQL", highlight: true },
    { name: "Clerk Authentication", highlight: false },
    { name: "Vitest QA Suite", highlight: false },
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Architecture Category Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs sm:text-sm font-medium mb-6 shadow-2xs">
          <span>Production Personal Finance & Expense Management</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight max-w-3xl mx-auto leading-tight">
          Personal Finance & Budget Tracking{" "}
          <span className="text-primary block mt-1">Engineered for Precision and Privacy.</span>
        </h1>

        {/* Subhead */}
        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          A full-stack budgeting web application built with Next.js App Router,
          serverless PostgreSQL, authenticated Server Actions, and comparative analytics.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={isSignedIn ? "/dashboard" : "/sign-in"}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-medium text-sm shadow-xs hover:bg-primary/90 transition-all cursor-pointer"
          >
            {isSignedIn ? "Go to Dashboard" : "Get Started"}
            <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href="https://github.com/shadow190202/Expenses-Tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-200 bg-white text-slate-700 font-medium text-sm shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer"
          >
            <Github className="h-4 w-4" />
            View Source on GitHub
          </a>
        </div>

        {/* Tech Stack Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className={`text-xs font-medium px-2.5 py-1 rounded-lg border transition-colors ${
                tech.highlight
                  ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                  : "bg-white border-slate-200 text-slate-600"
              }`}
            >
              {tech.name}
            </span>
          ))}
        </div>

        {/* Interface Preview */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-2 shadow-lg">
            <Image
              src="/dashboard.png"
              alt="ExpenseTracker Application Interface"
              width={1200}
              height={750}
              className="rounded-lg border border-slate-200 w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
