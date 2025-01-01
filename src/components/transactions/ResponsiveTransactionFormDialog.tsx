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
      property: undefined
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
      <SheetContent side="bottom" className="h-[70vh] p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 pb-4 border-b">
            <SheetTitle>Add Transaction</SheetTitle>
            <SheetDescription>Add a new transaction to your records.</SheetDescription>
          </SheetHeader>
          
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-4 pb-4">
                <TransactionBasicFields form={form} />
                <TransactionSelectFields form={form} />
              </div>
            </div>
            
            <div className="flex-shrink-0 p-4 border-t bg-background">
              <Button type="submit" className="w-full">
                Add Transaction
              </Button>
            </div>
          </form>
        </div>
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