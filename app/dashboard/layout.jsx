"use client";
import React, { useEffect, useState } from "react";
import SideNav from "./_components/SideNav";
import DashboardHeader from "./_components/DashboardHeader";
import { useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { hasUserBudgets } from "@/actions/budgets";

function DashboardLayout({ children }) {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Auto-collapse sidebar on smaller mobile viewports (< 768px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Automatically close mobile drawer when navigating to a new route
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (user) {
      checkUserBudgets();
    }
  }, [user]);

  const checkUserBudgets = async () => {
    try {
      const hasBudgets = await hasUserBudgets();
      if (!hasBudgets && pathname === "/dashboard") {
        router.replace("/dashboard/budgets");
      }
    } catch (error) {
      console.error("Error checking user budgets:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/30">
      <SideNav
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div
        className={`min-h-screen flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "md:ml-64" : "ml-0"
        }`}
      >
        <DashboardHeader
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
        />
        <main className="flex-1 p-6 md:p-8 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
