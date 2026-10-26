"use client";
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Github, ArrowRight } from 'lucide-react';

function Header() {
  const { isSignedIn } = useUser();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xs border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.svg" alt="ExpenseTracker Logo" width={32} height={32} />
          <span className="font-bold text-xl text-primary tracking-tight">ExpenseTracker</span>
        </Link>

        {/* Right Navigation & Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="https://github.com/shadow190202/Expenses-Tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-2 rounded-lg hover:bg-slate-50"
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          {isSignedIn ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button className="flex items-center gap-1.5 shadow-xs">
                  Dashboard
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <Link href="/sign-in">
              <Button className="flex items-center gap-1.5 shadow-xs">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
