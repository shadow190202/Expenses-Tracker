import React from "react";

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Title Skeletons */}
      <div className="space-y-2">
        <div className="h-9 w-64 bg-slate-200 rounded-md animate-pulse"></div>
        <div className="h-5 w-96 bg-slate-200 rounded-md animate-pulse"></div>
      </div>

      {/* Metric Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-[110px] w-full bg-slate-200 rounded-lg animate-pulse"
          ></div>
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        {/* Left Column (Chart & Table) */}
        <div className="md:col-span-2 space-y-6">
          <div className="h-[340px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
          <div className="h-[200px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Right Column (Budgets List) */}
        <div className="space-y-5">
          <div className="h-6 w-36 bg-slate-200 rounded-md animate-pulse"></div>
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-[170px] w-full bg-slate-200 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
