import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Github } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand & Copyright */}
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="ExpenseTracker Logo" width={22} height={22} />
            <span className="font-semibold text-slate-800 text-sm">ExpenseTracker</span>
            <span className="text-slate-300">|</span>
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Shreyansh Sahu. All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-slate-900 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-900 transition-colors">
              Terms of Service
            </Link>
            <a
              href="https://github.com/shadow190202/Expenses-Tracker"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors flex items-center gap-1.5"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
