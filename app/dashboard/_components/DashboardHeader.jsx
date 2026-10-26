"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { PanelLeft } from "lucide-react";

function DashboardHeader({ isOpen, onToggle }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b px-6 py-4 flex justify-between items-center shadow-xs">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggle}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <PanelLeft className="h-5 w-5" />
        </button>

        {/* Mobile Branding (visible only on mobile viewports) */}
        <Link href="/dashboard" className="flex items-center gap-2 md:hidden">
          <Image src="/logo.svg" alt="Expense Tracker Logo" width={28} height={28} />
          <span className="font-bold text-base text-primary">ExpenseTracker</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}

export default DashboardHeader;
