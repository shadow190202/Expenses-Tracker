"use client";
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

function Header() {
  const { isSignedIn } = useUser();
  return (
    <div className='p-5 flex justify-between items-center border shadow-sm'>
      <div className="flex items-center gap-2">
        <Image src={'/logo.svg'} alt="Logo" width={35} height={35} />
        <span className="font-bold text-lg text-primary">ExpenseTracker</span>
      </div>
      {isSignedIn ? (
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <Link href='/sign-in'>
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
