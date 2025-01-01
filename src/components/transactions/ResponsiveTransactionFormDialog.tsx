import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TransactionBasicFields } from "./form/TransactionBasicFields";
import { TransactionSelectFields } from "./form/TransactionSelectFields";
import { Transaction } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { TransactionFormData } from "./types";

interface TransactionFormDialogProps {
  onAddTransaction: (transaction: Transaction) => void;
}

export const ResponsiveTransactionFormDialog = ({ onAddTransaction }: TransactionFormDialogProps) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  
  const form = useForm<TransactionFormData>({
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      description: "",
      amount: "",
      currency: "PLN",
      category: "Other",
      person: "Adam",
      property: ""
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = form.getValues();
    
    try {
      const newTransaction = {
        date: formData.date,
        description: formData.description,
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        category: formData.category,
        person: formData.person,
        property: formData.property || null,
        id: Date.now()
      };

      const { error } = await supabase
        .from('transactions')
        .insert(newTransaction);

      if (error) throw error;

      onAddTransaction(newTransaction);
      setOpen(false);
      form.reset();
      toast.success("Transaction added successfully");
    } catch (error) {
      console.error('Error adding transaction:', error);
      toast.error("Failed to add transaction");
    }
  };

  const MobileContent = () => (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add Transaction</SheetTitle>
          <SheetDescription>Add a new transaction to your records.</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <TransactionBasicFields form={form} />
          <TransactionSelectFields form={form} />
          <div className="flex justify-end">
            <Button type="submit">Add Transaction</Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );

  const DesktopContent = () => (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>Add a new transaction to your records.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <TransactionBasicFields form={form} />
          <TransactionSelectFields form={form} />
          <div className="flex justify-end">
            <Button type="submit">Add Transaction</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );

  return isMobile ? <MobileContent /> : <DesktopContent />;
};