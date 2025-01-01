import { Transaction } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { TransactionFormData } from "./types";
import { MobileTransactionForm } from "./form/MobileTransactionForm";
import { DesktopTransactionForm } from "./form/DesktopTransactionForm";

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

  return isMobile ? (
    <MobileTransactionForm
      open={open}
      onOpenChange={setOpen}
      form={form}
      onSubmit={handleSubmit}
    />
  ) : (
    <DesktopTransactionForm
      open={open}
      onOpenChange={setOpen}
      form={form}
      onSubmit={handleSubmit}
    />
  );
};