"use client";

import React, { useEffect } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardError({ error, reset }) {
  useEffect(() => {
    // Log error silently for monitoring
    console.error("Dashboard error caught by error boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full border border-red-200 bg-red-50/30 rounded-xl p-8 text-center shadow-sm">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-3 rounded-full text-red-600">
            <AlertCircle className="h-8 w-8" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Something went wrong
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          We encountered an unexpected error while loading your dashboard. Your
          data is safe and untouched.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </Button>
          <Link href="/dashboard">
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              <Home className="h-4 w-4" />
              Reload Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
