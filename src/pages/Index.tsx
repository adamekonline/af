import { Link } from "react-router-dom";
import { LayoutDashboard, LogOut, Menu, Receipt, BookmarkPlus, DollarSign } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ResponsiveTransactionFormDialog } from "@/components/transactions/ResponsiveTransactionFormDialog";
import { BudgetView } from "@/components/budget/BudgetView";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { TransactionsView } from "@/components/transactions/TransactionsView";
import { ManualExchangeRates } from "@/components/dashboard/ManualExchangeRates";
import { t } from "@/utils/translations";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Session check error:", error);
        navigate('/login');
        return;
      }
      if (!session) {
        navigate('/login');
      }
    };
    
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsSheetOpen(false);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
        toast.error(t("errorLoggingOut"));
        return;
      }
      setIsSheetOpen(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(t("errorLoggingOut"));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <nav className="flex flex-col gap-2 mt-4">
                  <Button
                    variant={activeTab === "dashboard" ? "secondary" : "ghost"}
                    className="justify-start text-base w-full"
                    onClick={() => handleTabChange("dashboard")}
                  >
                    <LayoutDashboard className="mr-2 h-5 w-5" />
                    {t("dashboard")}
                  </Button>
                  <Button
                    variant={activeTab === "transactions" ? "secondary" : "ghost"}
                    className="justify-start text-base w-full"
                    onClick={() => handleTabChange("transactions")}
                  >
                    <Receipt className="mr-2 h-5 w-5" />
                    {t("transactions")}
                  </Button>
                  <Button
                    variant={activeTab === "budget" ? "secondary" : "ghost"}
                    className="justify-start text-base w-full"
                    onClick={() => handleTabChange("budget")}
                  >
                    <BookmarkPlus className="mr-2 h-5 w-5" />
                    {t("budget")}
                  </Button>
                  <Button
                    variant={activeTab === "exchange-rates" ? "secondary" : "ghost"}
                    className="justify-start text-base w-full"
                    onClick={() => handleTabChange("exchange-rates")}
                  >
                    <DollarSign className="mr-2 h-5 w-5" />
                    {t("exchangeRates")}
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start text-base w-full text-red-500 hover:text-red-600 hover:bg-red-100/50" 
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    {t("logout")}
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
            <nav className="hidden md:flex items-center gap-2">
              <Button
                variant={activeTab === "dashboard" ? "secondary" : "ghost"}
                onClick={() => handleTabChange("dashboard")}
              >
                <LayoutDashboard className="mr-2 h-5 w-5" />
                {t("dashboard")}
              </Button>
              <Button
                variant={activeTab === "transactions" ? "secondary" : "ghost"}
                onClick={() => handleTabChange("transactions")}
              >
                <Receipt className="mr-2 h-5 w-5" />
                {t("transactions")}
              </Button>
              <Button
                variant={activeTab === "budget" ? "secondary" : "ghost"}
                onClick={() => handleTabChange("budget")}
              >
                <BookmarkPlus className="mr-2 h-5 w-5" />
                {t("budget")}
              </Button>
              <Button
                variant={activeTab === "exchange-rates" ? "secondary" : "ghost"}
                onClick={() => handleTabChange("exchange-rates")}
              >
                <DollarSign className="mr-2 h-5 w-5" />
                {t("exchangeRates")}
              </Button>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <ResponsiveTransactionFormDialog />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout}
              className="hidden md:flex text-red-500 hover:text-red-600 hover:bg-red-100/50"
            >
              <LogOut className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <Suspense fallback={<div>Loading...</div>}>
          {activeTab === "dashboard" && <DashboardView />}
          {activeTab === "transactions" && <TransactionsView />}
          {activeTab === "budget" && <BudgetView />}
          {activeTab === "exchange-rates" && <ManualExchangeRates />}
        </Suspense>
      </main>
    </div>
  );
};

export default Index;