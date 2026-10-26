"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PenBox, Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { updateBudget } from "@/actions/budgets";

function EditBudget({ budgetInfo, refreshData }) {
  const [open, setOpen] = useState(false);
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon || "😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState(budgetInfo?.name || "");
  const [amount, setAmount] = useState(budgetInfo?.amount || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (budgetInfo) {
      setEmojiIcon(budgetInfo?.icon || "😀");
      setName(budgetInfo?.name || "");
      setAmount(budgetInfo?.amount || "");
    }
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    try {
      setLoading(true);
      await updateBudget({
        id: budgetInfo.id,
        name,
        amount,
        icon: emojiIcon,
      });

      toast.success("Budget updated successfully!");
      setOpen(false);
      refreshData();
    } catch (error) {
      console.error("Failed to update budget:", error);
      toast.error(error.message || "Failed to update budget");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex gap-2">
            <PenBox />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription asChild>
              <div className="mt-5">
                <Button
                  variant="outline"
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
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
                    placeholder="e.g Home Rent"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input
                    placeholder="e.g $5000"
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              disabled={!(name?.trim() && amount) || loading}
              onClick={onUpdateBudget}
              className="mt-5 w-full"
            >
              {loading ? <Loader className="animate-spin" /> : "Update Budget"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
