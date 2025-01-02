import { LayoutDashboard, Receipt, BookmarkPlus, DollarSign, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { t } from "@/utils/translations";

interface NavigationMenuProps {
  activeTab: string;
  handleTabChange: (tab: string) => void;
  handleLogout: () => Promise<void>;
  isMobile: boolean;
}

export const NavigationMenu = ({ activeTab, handleTabChange, handleLogout, isMobile }: NavigationMenuProps) => {
  return (
    <nav className={isMobile ? "flex flex-col gap-2 mt-4" : "flex items-center gap-2"}>
      <Button
        variant={activeTab === "dashboard" ? "secondary" : "ghost"}
        className={isMobile ? "justify-start text-base w-full" : ""}
        onClick={() => handleTabChange("dashboard")}
      >
        <LayoutDashboard className="mr-2 h-5 w-5" />
        {t("dashboard")}
      </Button>
      <Button
        variant={activeTab === "transactions" ? "secondary" : "ghost"}
        className={isMobile ? "justify-start text-base w-full" : ""}
        onClick={() => handleTabChange("transactions")}
      >
        <Receipt className="mr-2 h-5 w-5" />
        {t("transactions")}
      </Button>
      <Button
        variant={activeTab === "budget" ? "secondary" : "ghost"}
        className={isMobile ? "justify-start text-base w-full" : ""}
        onClick={() => handleTabChange("budget")}
      >
        <BookmarkPlus className="mr-2 h-5 w-5" />
        {t("budget")}
      </Button>
      <Button
        variant={activeTab === "exchange-rates" ? "secondary" : "ghost"}
        className={isMobile ? "justify-start text-base w-full" : ""}
        onClick={() => handleTabChange("exchange-rates")}
      >
        <DollarSign className="mr-2 h-5 w-5" />
        {t("exchangeRates")}
      </Button>
      {isMobile && (
        <Button 
          variant="ghost" 
          className="justify-start text-base w-full text-red-500 hover:text-red-600 hover:bg-red-100/50" 
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-5 w-5" />
          {t("logout")}
        </Button>
      )}
    </nav>
  );
};