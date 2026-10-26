import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Hero() {
  return (
    <section className="bg-gray-50 flex items-center flex-col w-full">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-prose text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white">
            Manage Your Expenses
            <strong className="text-primary block mt-1"> Control your Money $ </strong>
          </h1>

          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            Start creating your budgets and manage your expenses with ease.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <Link
              className="inline-block rounded-md bg-primary px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-primary/90"
              href="/sign-in"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <div className="px-4">
        <Image
          src={'/dashboard.png'}
          alt='Dashboard'
          width={1000}
          height={700}
          className='-mt-9 rounded-xl border-2 shadow-lg max-w-full h-auto'
          priority
        />
      </div>
    </section>
  );
}

export default Hero;
