import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/db";
import { Budgets, Expenses } from "@/utils/schema";
import React, { useState } from "react";
import { toast } from "sonner";
import momnet from "moment";
import { Loader } from "lucide-react";

function AddExpenses({ budgetId, user, refreshData }) {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false);
  /**
   * Used to Add New Expenses
   */
  const addNewExpenses = async () => {
    setLoading(true);
    const result = await db
      .insert(Expenses)
      .values({
        name: name,
        amount: amount,
        budgetId: budgetId,
        createdAt: momnet().format("DD-MM-YYYY"),
      })
      .returning({ insertedId: Budgets.id });

    setAmount("");
    setName("");

    if (result) {
      setLoading(false);
      refreshData();
      toast("Expenses Added Successfully!");
    }
    setLoading(false);
  };
  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expenses</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expenses Name</h2>
        <Input
          placeholder="e.g Grocery"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expenses Amount</h2>
        <Input
          type="number"
          placeholder="e.g 1000"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button
        disabled={!(name && amount)||loading}
        onClick={() => addNewExpenses()}
        className="mt-3 w-full"
      >
        {loading ? <Loader className="animate-spin" /> : "Add New Expenses"}
      </Button>
    </div>
  );
}

export default AddExpenses;
