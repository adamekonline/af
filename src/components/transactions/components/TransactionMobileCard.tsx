import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Transaction } from "@/types";
import { Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { TransactionFormData } from "../types";
import { TransactionBasicFields } from "../form/TransactionBasicFields";
import { TransactionSelectFields } from "../form/TransactionSelectFields";
import { Button as DialogButton } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TransactionMobileCardProps {
  transaction: Transaction;
  convertedAmount: number;
  displayCurrency: string;
  onDelete: (id: number) => void;
}

export const TransactionMobileCard = ({
  transaction,
  convertedAmount,
  displayCurrency,
  onDelete,
}: TransactionMobileCardProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const formatNumber = (num: number) => {
    return num.toLocaleString('pl-PL', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const form = useForm<TransactionFormData>({
    defaultValues: {
      date: transaction.date,
      description: transaction.description,
      amount: transaction.amount.toString(),
      currency: transaction.currency,
      category: transaction.category,
      person: transaction.person,
      property: transaction.property
    }
  });

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = form.getValues();
    
    try {
      const { error } = await supabase
        .from('transactions')
        .update({
          date: formData.date,
          description: formData.description,
          amount: parseFloat(formData.amount),
          currency: formData.currency,
          category: formData.category,
          person: formData.person,
          property: formData.property || null
        })
        .eq('id', transaction.id);

      if (error) throw error;

      setEditDialogOpen(false);
      toast.success("Transaction updated successfully");
    } catch (error) {
      console.error('Error updating transaction:', error);
      toast.error("Failed to update transaction");
    }
  };

  return (
    <>
      <Card key={transaction.id} className="w-full">
        <CardContent className="p-4 space-y-2">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="font-medium text-sm">{transaction.description}</p>
              <p className="text-xs text-muted-foreground">{transaction.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className={`text-right ${convertedAmount > 0 ? "text-green-600" : "text-red-600"}`}>
                <p className="font-semibold">
                  {formatNumber(convertedAmount)} {displayCurrency}
                </p>
                <p className="text-xs opacity-75">
                  {formatNumber(transaction.amount)} {transaction.currency}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditDialogOpen(true)}
                  className="text-muted-foreground hover:text-blue-600"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(transaction.id)}
                  className="text-muted-foreground hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t">
            <span>{transaction.category}</span>
            <span>{transaction.person}</span>
            <span>{transaction.property || '-'}</span>
          </div>
        </CardContent>
      </Card>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-h-[85vh] w-full max-w-[400px] flex flex-col p-4">
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={handleEdit} className="space-y-3">
              <TransactionBasicFields form={form} />
              <TransactionSelectFields form={form} />
              <DialogButton type="submit" className="w-full">
                Update Transaction
              </DialogButton>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};