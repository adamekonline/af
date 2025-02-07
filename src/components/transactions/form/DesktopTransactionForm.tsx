import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TransactionBasicFields } from "./TransactionBasicFields";
import { TransactionSelectFields } from "./TransactionSelectFields";
import { UseFormReturn } from "react-hook-form";
import { TransactionFormData } from "../types";
import { Form } from "@/components/ui/form";
import { t } from "@/utils/translations";

interface DesktopTransactionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<TransactionFormData>;
  onSubmit: (e: React.FormEvent) => void;
}

export const DesktopTransactionForm = ({ open, onOpenChange, form, onSubmit }: DesktopTransactionFormProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          {t("addTransaction")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] w-full max-w-[400px] flex flex-col p-4">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>{t("addTransaction")}</DialogTitle>
          <DialogDescription>Add a new transaction to your records.</DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 mt-4">
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-3 pr-4">
              <TransactionBasicFields form={form} />
              <TransactionSelectFields form={form} />
              <div className="pt-2">
                <Button type="submit" className="w-full">
                  {t("addTransaction")}
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};