"use client";
import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency, formatCompactNumber } from "@/lib/formatters";

function BarChartDashboard({ budgetList }) {
  if (!budgetList || budgetList.length === 0) {
    return (
      <div className="border rounded-lg p-5">
        <h2 className="font-bold text-lg">Activity</h2>
        <div className="h-[300px] flex items-center justify-center text-gray-400">
          No budget activity to display yet.
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-5">
      <h2 className="font-bold text-lg mb-2">Activity</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={budgetList}
          margin={{
            top: 10,
            right: 10,
            left: -10,
            bottom: 0,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `$${formatCompactNumber(value)}`} />
          <Tooltip
            formatter={(value, name) => [formatCurrency(value), name]}
          />
          <Legend />
          <Bar
            dataKey="totalSpend"
            name="Total Spend"
            fill="#4845d2"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="amount"
            name="Budget Amount"
            fill="#C3C2FF"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartDashboard;
