import { Link } from "react-router-dom";
import { LogOut, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavigationMenu } from "./NavigationMenu";
import { ResponsiveTransactionFormDialog } from "@/components/transactions/ResponsiveTransactionFormDialog";
import { t } from "@/utils/translations";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface HeaderProps {
  handleLogout: () => Promise<void>;
  isSheetOpen: boolean;
  setIsSheetOpen: (open: boolean) => void;
  activeTab: string;
  handleTabChange: (tab: string) => void;
}

export const Header = ({ handleLogout, isSheetOpen, setIsSheetOpen, activeTab, handleTabChange }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2 md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <NavigationMenu
                  activeTab={activeTab}
                  handleTabChange={handleTabChange}
                  handleLogout={handleLogout}
                  isMobile={true}
                />
              </SheetContent>
            </Sheet>
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleLogout}
              className="text-red-500 hover:text-red-600 hover:bg-red-100/50 border-red-200"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            <NavigationMenu
              activeTab={activeTab}
              handleTabChange={handleTabChange}
              handleLogout={handleLogout}
              isMobile={false}
            />
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ResponsiveTransactionFormDialog />
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="hidden md:flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-100/50 border-red-200"
          >
            <LogOut className="h-4 w-4" />
            {t("logout")}
          </Button>
        </div>
      </div>
    </header>
  );
};