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
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <SheetContent side="bottom" className="h-[95vh] sm:h-[85vh]">
        <div className="flex flex-col h-full max-h-full">
          <SheetHeader className="flex-shrink-0 pb-4">
            <SheetTitle>Add Transaction</SheetTitle>
            <SheetDescription>Add a new transaction to your records.</SheetDescription>
          </SheetHeader>
          
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
            <ScrollArea className="flex-1 px-1">
              <div className="space-y-4 pb-4">
                <TransactionBasicFields form={form} />
                <TransactionSelectFields form={form} />
              </div>
            </ScrollArea>
            
            <div className="flex-shrink-0 pt-4 border-t bg-background mt-2">
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
      <DialogContent className="max-h-[85vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Add Transaction</DialogTitle>
          <DialogDescription>Add a new transaction to your records.</DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 pr-4 -mr-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <TransactionBasicFields form={form} />
            <TransactionSelectFields form={form} />
            <div className="pt-2">
              <Button type="submit" className="w-full">
                Add Transaction
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );

  return isMobile ? <MobileContent /> : <DesktopContent />;
};