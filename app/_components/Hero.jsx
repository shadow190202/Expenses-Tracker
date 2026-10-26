"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { ArrowRight, Github, Shield, Sparkles } from "lucide-react";

function Hero() {
  const { isSignedIn } = useUser();

  const techStack = [
    { name: "Next.js 16", highlight: true },
    { name: "React 19", highlight: false },
    { name: "Tailwind CSS v4", highlight: false },
    { name: "Drizzle ORM", highlight: false },
    { name: "Neon PostgreSQL", highlight: true },
    { name: "Clerk Auth", highlight: false },
    { name: "Vitest", highlight: false },
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Release / Architecture Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs sm:text-sm font-semibold mb-6">
          <Sparkles className="h-4 w-4" />
          <span>Full-Stack Modern Architecture • Serverless Postgres</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
          Personal Finance & Budget Tracking{" "}
          <span className="text-primary block mt-1">Engineered for Precision and Privacy.</span>
        </h1>

        {/* Subhead */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          A production-grade budgeting web application built with Next.js App Router,
          serverless PostgreSQL, authenticated Server Actions, and real-time comparative analytics.
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={isSignedIn ? "/dashboard" : "/sign-in"}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-white font-semibold text-base shadow-sm hover:bg-primary/90 transition-all hover:shadow-md cursor-pointer"
          >
            {isSignedIn ? "Go to Dashboard" : "Get Started"}
            <ArrowRight className="h-5 w-5" />
          </Link>

          <a
            href="https://github.com/shadow190202/Expenses-Tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold text-base shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer"
          >
            <Github className="h-5 w-5" />
            View Source on GitHub
          </a>
        </div>

        {/* Tech Stack Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-3xl mx-auto">
          {techStack.map((tech, index) => (
            <span
              key={index}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                tech.highlight
                  ? "bg-primary/10 border-primary/20 text-primary"
                  : "bg-white border-slate-200 text-slate-600"
              }`}
            >
              {tech.name}
            </span>
          ))}
        </div>

        {/* Product UI Preview */}
        <div className="mt-14 max-w-5xl mx-auto px-2">
          <div className="relative rounded-2xl border border-slate-200/80 bg-slate-900/5 p-2 sm:p-3 shadow-xl backdrop-blur-xs">
            <Image
              src="/dashboard.png"
              alt="ExpenseTracker Dashboard Interface Preview"
              width={1200}
              height={750}
              className="rounded-xl border border-slate-200 shadow-sm w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
