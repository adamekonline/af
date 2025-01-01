import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Transaction } from "@/types";
import { Trash2 } from "lucide-react";

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
}: TransactionMobileCardProps) => (
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
              {convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {displayCurrency}
            </p>
            <p className="text-xs opacity-75">
              {transaction.amount.toLocaleString()} {transaction.currency}
            </p>
          </div>
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
      <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t">
        <span>{transaction.category}</span>
        <span>{transaction.person}</span>
        <span>{transaction.property || '-'}</span>
      </div>
    </CardContent>
  </Card>
);