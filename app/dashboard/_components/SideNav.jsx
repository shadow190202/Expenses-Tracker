"use client";
import React from "react";
import Image from "next/image";
import { LayoutGrid, PiggyBank, ReceiptText, X } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideNav({ isOpen, onClose }) {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
  ];

  const path = usePathname();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-xs transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white z-50 md:z-30 border-r shadow-xs flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5">
          {/* Header with Logo and Mobile Close Button */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/dashboard"
              onClick={onClose}
              className="flex items-center gap-2"
            >
              <Image src="/logo.svg" alt="Expense Tracker Logo" width={34} height={34} />
              <span className="font-bold text-lg text-primary">ExpenseTracker</span>
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close sidebar"
              className="p-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-slate-100 md:hidden cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-4 space-y-1">
            {menuList.map((menu) => {
              const isActive = path === menu.path;
              return (
                <Link
                  href={menu.path}
                  key={menu.id}
                  onClick={onClose}
                  className={`flex gap-3 items-center font-medium p-3 rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-gray-600 hover:text-primary hover:bg-slate-50"
                  }`}
                >
                  <menu.icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-gray-500"}`} />
                  {menu.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Profile Footer */}
        <div className="p-4 border-t flex gap-3 items-center bg-slate-50/50">
          <UserButton afterSignOutUrl="/" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-800">My Account</span>
            <span className="text-xs text-gray-500">Manage Profile</span>
          </div>
        </div>
      </aside>
    </>
  );
}

export default SideNav;
