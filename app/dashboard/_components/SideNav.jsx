"use client";
import React from "react";
import Image from "next/image";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Sidenav() {
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
    {
      id: 4,
      name: "Upgrades",
      icon: ShieldCheck,
      path: "/dashboard/upgrades",
    },
  ];
  const path = usePathname();

  return (
    <div className="h-screen p-4 border shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <Image src={"/logo.svg"} alt="Logo" width={35} height={35} />
          <span className="font-bold text-lg text-primary">ExpenseTracker</span>
        </div>
        <div className="mt-5">
          {menuList.map((menu) => (
            <Link href={menu.path} key={menu.id}>
              <h2
                className={`flex gap-3 items-center text-gray-600 font-medium mb-1 p-3 cursor-pointer rounded-md hover:text-primary hover:bg-blue-50 transition-colors
                ${path === menu.path ? "bg-blue-100 text-primary font-semibold" : ""}
                `}
              >
                <menu.icon className="h-5 w-5" />
                {menu.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <div className="p-3 border-t flex gap-3 items-center">
        <UserButton />
        <span className="text-sm font-medium text-gray-700">Profile</span>
      </div>
    </div>
  );
}

export default Sidenav;
