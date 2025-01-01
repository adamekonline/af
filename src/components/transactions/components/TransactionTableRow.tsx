import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Transaction } from "@/types";
import { Trash2 } from "lucide-react";

interface TransactionTableRowProps {
  transaction: Transaction;
  convertedAmount: number;
  displayCurrency: string;
  onDelete: (id: number) => void;
}

export const TransactionTableRow = ({
  transaction,
  convertedAmount,
  displayCurrency,
  onDelete,
}: TransactionTableRowProps) => (
  <TableRow key={transaction.id}>
    <TableCell className="whitespace-nowrap">{transaction.date}</TableCell>
    <TableCell className="max-w-[200px] truncate">{transaction.description}</TableCell>
    <TableCell className={`whitespace-nowrap ${convertedAmount > 0 ? "text-green-600" : "text-red-600"}`}>
      <span className="flex items-center gap-1">
        {convertedAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {displayCurrency}
      </span>
    </TableCell>
    <TableCell className={`whitespace-nowrap ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
      <span className="flex items-center gap-1">
        {transaction.amount.toLocaleString()} {transaction.currency}
      </span>
    </TableCell>
    <TableCell className="whitespace-nowrap">{transaction.category}</TableCell>
    <TableCell className="whitespace-nowrap">{transaction.person}</TableCell>
    <TableCell className="whitespace-nowrap">{transaction.property || '-'}</TableCell>
    <TableCell>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(transaction.id)}
        className="text-muted-foreground hover:text-red-600"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </TableCell>
  </TableRow>
);