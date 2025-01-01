import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { Transaction } from "@/types";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { TransactionBasicFields } from "./form/TransactionBasicFields";
import { TransactionSelectFields } from "./form/TransactionSelectFields";
import { TransactionFormData } from "./types";

export const TransactionFormDialog = ({ onAddTransaction }: { onAddTransaction: (transaction: Transaction) => void }) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
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

  const onSubmit = (data: TransactionFormData) => {
    const transaction: Transaction = {
      id: Date.now(),
      date: data.date,
      description: data.description,
      amount: parseFloat(data.amount),
      currency: data.currency,
      category: data.category,
      person: data.person,
      property: data.property
    };

    onAddTransaction(transaction);
    setOpen(false);
    form.reset();
    
    toast({
      title: "Success",
      description: "Transaction added successfully",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <TransactionBasicFields form={form} />
            <TransactionSelectFields form={form} />
            <Button type="submit" className="w-full">Add Transaction</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};