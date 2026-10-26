"use client";
import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createBudget } from "@/actions/budgets";
import { toast } from "sonner";
import { Loader, Sparkles } from "lucide-react";

function CreateBudget({ refreshData, children }) {
  const [open, setOpen] = useState(false);
  const [emojiIcon, setEmojiIcon] = useState("📊");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const onCreateBudget = async () => {
    if (!name?.trim() || name.trim().length < 2) {
      toast.error("Budget name must be at least 2 characters long");
      return;
    }
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount greater than 0");
      return;
    }

    try {
      setLoading(true);
      await createBudget({
        name,
        amount,
        icon: emojiIcon || null,
      });

      toast.success("Budget Created Successfully!");
      setName("");
      setAmount("");
      setOpen(false);
      refreshData();
    } catch (error) {
      console.error("Failed to create budget:", error);
      toast.error(error.message || "Failed to create budget");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children || (
            <div className="bg-slate-50 hover:bg-slate-100/80 p-10 rounded-xl items-center flex flex-col border-2 border-dashed border-slate-300 cursor-pointer hover:shadow-xs transition-all h-[170px] justify-center">
              <h2 className="text-3xl font-light text-slate-400">+</h2>
              <h2 className="text-sm font-medium text-slate-600 mt-1">Create New Budget</h2>
            </div>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription asChild>
              <div className="mt-5">
                <Button
                  variant="outline"
                  className="text-lg rounded-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon || <Sparkles className="h-5 w-5 text-slate-500" />}
                </Button>
                <div className="absolute z-20">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Name</h2>
                  <Input
                    placeholder="e.g. Housing & Rent"
                    required
                    maxLength={100}
                    className="rounded-lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input
                    placeholder="e.g. 5000"
                    type="number"
                    min="0.01"
                    step="0.01"
                    className="rounded-lg"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              disabled={!name?.trim() || !amount || Number(amount) <= 0 || loading}
              onClick={onCreateBudget}
              className="mt-5 w-full flex items-center justify-center gap-2 rounded-lg"
            >
              {loading ? <Loader className="animate-spin h-4 w-4" /> : "Create Budget"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateBudget;
