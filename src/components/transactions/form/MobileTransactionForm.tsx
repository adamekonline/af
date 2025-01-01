import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TransactionBasicFields } from "./TransactionBasicFields";
import { TransactionSelectFields } from "./TransactionSelectFields";
import { UseFormReturn } from "react-hook-form";
import { TransactionFormData } from "../types";
import { Form } from "@/components/ui/form";

interface MobileTransactionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<TransactionFormData>;
  onSubmit: (e: React.FormEvent) => void;
}

export const MobileTransactionForm = ({ open, onOpenChange, form, onSubmit }: MobileTransactionFormProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85dvh] p-0">
        <div className="flex flex-col h-full">
          <SheetHeader className="flex-shrink-0 p-4">
            <SheetTitle>Add Transaction</SheetTitle>
            <SheetDescription>Add a new transaction to your records.</SheetDescription>
          </SheetHeader>
          
          <Form {...form}>
            <form onSubmit={onSubmit} className="flex flex-col flex-1">
              <ScrollArea className="flex-1 px-4">
                <div className="space-y-3">
                  <TransactionBasicFields form={form} />
                  <TransactionSelectFields form={form} />
                </div>
              </ScrollArea>
              
              <div className="flex-shrink-0 p-4 border-t bg-background mt-auto">
                <Button type="submit" className="w-full">
                  Add Transaction
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};