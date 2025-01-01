import { Transaction } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { TransactionFormData } from "./types";
import { MobileTransactionForm } from "./form/MobileTransactionForm";
import { DesktopTransactionForm } from "./form/DesktopTransactionForm";

export const ResponsiveTransactionFormDialog = () => {
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
    
    // Validate all fields before submission
    const isValid = await form.trigger();
    if (!isValid) {
      toast.error("Please fill in all required fields");
      return;
    }

    const formData = form.getValues();
    
    try {
      const newTransaction = {
        date: formData.date,
        description: formData.description,
        amount: parseFloat(formData.amount),
        currency: formData.currency,
        category: formData.category,
        person: formData.person,
        property: formData.property || null
      };

      const { error } = await supabase
        .from('transactions')
        .insert(newTransaction);

      if (error) throw error;

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