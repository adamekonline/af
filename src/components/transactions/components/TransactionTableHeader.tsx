import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const TransactionTableHeader = () => (
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Date</TableHead>
      <TableHead className="min-w-[200px]">Description</TableHead>
      <TableHead className="w-[120px]">Amount</TableHead>
      <TableHead className="w-[120px]">Original</TableHead>
      <TableHead className="w-[100px]">Category</TableHead>
      <TableHead className="w-[100px]">Person</TableHead>
      <TableHead className="w-[100px]">Property</TableHead>
      <TableHead className="w-[50px]"></TableHead>
    </TableRow>
  </TableHeader>
);