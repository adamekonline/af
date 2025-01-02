import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { t } from "@/utils/translations";

export const TransactionTableHeader = () => (
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">{t("date")}</TableHead>
      <TableHead className="min-w-[200px]">{t("description")}</TableHead>
      <TableHead className="w-[120px]">{t("amount")}</TableHead>
      <TableHead className="w-[120px]">{t("original")}</TableHead>
      <TableHead className="w-[100px]">{t("category")}</TableHead>
      <TableHead className="w-[100px]">{t("person")}</TableHead>
      <TableHead className="w-[100px]">{t("property")}</TableHead>
      <TableHead className="w-[50px]"></TableHead>
    </TableRow>
  </TableHeader>
);