"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function Sidenav() {
    const menuList = [
        {
            id:1,
            name:"Dashboard",
            icon:LayoutGrid,
            path:"/dashboard"
        },
        {
            id:2,
            name:"Bugets",
            icon:PiggyBank,
            path:"/dashboard/budgets"
        },
        {
            id:3,
            name:"Expenses",
            icon:ReceiptText,
            path:"/dashboard/expenses"
        },
        {
            id:4,
            name:"Upgrads",
            icon:ShieldCheck,
            path:"/dashboard/upgrades"
        }
    ]
    const path=usePathname();

    useEffect(()=>{
        console.log(path);
    },[])

  return (
    <div className='h-screen p-2 border shadow-sm'>
      <Image src={'/logo.svg'} alt="Logo"
        width={35}
        height={10}
        />
        <div className='mt-5'>
            {menuList.map((menu,index)=>(
                <Link href={menu.path}>
                <h2 className={`flex gap-2 items-center text-gray-600 font-medium mb-1 p-4 cursor-pointer rounded-md hover:text-primary hover:bg-blue-100
                ${path===menu.path&&'bg-blue-100 text-primary'}
                `}>
                    <menu.icon/>
                    {menu.name}
                </h2>
                </Link>
            ))}
        </div>
        <div className='fixed bottom-5 p-5 border-t w-48 flex gap-2 items-center'>
            <UserButton/>
            Profile
        </div>
    </div>
  )
}

export default Sidenav
