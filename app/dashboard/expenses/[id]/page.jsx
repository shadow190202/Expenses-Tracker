"use client";

import React from "react";
import { useParams } from "next/navigation";
import ExpensesScreen from "./ExpensesScreen";

export default function Page() {
  const params = useParams();
  const id = params?.id;

  if (!id) return <div>Budget ID is missing from URL!</div>;

  return <ExpensesScreen id={id} />;
}
