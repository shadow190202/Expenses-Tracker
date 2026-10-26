"use client";
import { UserButton } from '@clerk/nextjs';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react';

function DashboardHeader() {
  const path = usePathname();

  const menuList = [
    { name: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
    { name: "Budgets", icon: PiggyBank, path: "/dashboard/budgets" },
    { name: "Expenses", icon: ReceiptText, path: "/dashboard/expenses" },
    { name: "Upgrades", icon: ShieldCheck, path: "/dashboard/upgrades" },
  ];

  return (
    <div className='p-4 shadow-sm border-b flex justify-between items-center bg-white sticky top-0 z-30'>
      {/* Mobile Navigation Links */}
      <div className="flex md:hidden gap-1 sm:gap-2">
        {menuList.map((menu, i) => (
          <Link
            key={i}
            href={menu.path}
            className={`flex items-center gap-1 text-xs font-medium px-2 py-1.5 rounded-md ${
              path === menu.path ? "bg-blue-100 text-primary font-semibold" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <menu.icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{menu.name}</span>
          </Link>
        ))}
      </div>
      <div className="hidden md:block"></div>
      <div>
        <UserButton />
      </div>
    </div>
  );
}

export default DashboardHeader;
