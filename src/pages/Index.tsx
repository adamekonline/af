import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { TransactionsView } from "@/components/transactions/TransactionsView";
import { LayoutDashboard, LogOut, Menu, Receipt, BookmarkPlus, DollarSign } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ResponsiveTransactionFormDialog } from "@/components/transactions/ResponsiveTransactionFormDialog";
import { BudgetView } from "@/components/budget/BudgetView";
import { ManualExchangeRates } from "@/components/dashboard/ManualExchangeRates";
import { t } from "@/utils/translations";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const TabContent = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-[200px]">
    <Suspense fallback={<Skeleton className="w-full h-[200px]" />}>
      {children}
    </Suspense>
  </div>
);

export const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      }
    };
    checkSession();
  }, [navigate]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      navigate("/login");
      toast.success(t("loggedOut"));
    } catch (error: any) {
      console.error('Error logging out:', error);
      toast.error(t("errorLoggingOut"));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 bg-background z-50">
        <div className="container flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="w-full h-[90vh] p-0">
                <nav className="flex flex-col gap-2 p-4">
                  <Button 
                    variant="ghost" 
                    className="justify-start text-base w-full" 
                    onClick={() => handleTabChange("dashboard")}
                  >
                    <LayoutDashboard className="mr-2 h-5 w-5" />
                    {t("dashboard")}
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start text-base w-full" 
                    onClick={() => handleTabChange("transactions")}
                  >
                    <Receipt className="mr-2 h-5 w-5" />
                    {t("transactions")}
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start text-base w-full" 
                    onClick={() => handleTabChange("budgets")}
                  >
                    <BookmarkPlus className="mr-2 h-5 w-5" />
                    {t("budgets")}
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start text-base w-full" 
                    onClick={() => handleTabChange("exchange-rates")}
                  >
                    <DollarSign className="mr-2 h-5 w-5" />
                    {t("exchangeRates")}
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start text-base w-full text-red-500 hover:text-red-600" 
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    {t("logout")}
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="flex items-center gap-2">
            <ResponsiveTransactionFormDialog />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout}
              className="text-red-500 hover:text-red-600"
            >
              <LogOut className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container py-4 md:py-6">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <TabsList className="h-auto p-1 grid grid-cols-2 sm:flex sm:grid-cols-none gap-2">
              <div className="contents sm:hidden">
                <div className="col-span-2 grid grid-cols-2 gap-2 w-full">
                  <TabsTrigger value="dashboard" className="flex items-center justify-center gap-2 data-[state=active]:font-semibold">
                    <LayoutDashboard className="h-5 w-5" />
                    <span className="text-xs">{t("dashboard")}</span>
                  </TabsTrigger>
                  <TabsTrigger value="transactions" className="flex items-center justify-center gap-2 data-[state=active]:font-semibold">
                    <Receipt className="h-5 w-5" />
                    <span className="text-xs">{t("transactions")}</span>
                  </TabsTrigger>
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-2 w-full">
                  <TabsTrigger value="budgets" className="flex items-center justify-center gap-2 data-[state=active]:font-semibold">
                    <BookmarkPlus className="h-5 w-5" />
                    <span className="text-xs">{t("budgets")}</span>
                  </TabsTrigger>
                  <TabsTrigger value="exchange-rates" className="flex items-center justify-center gap-2 data-[state=active]:font-semibold">
                    <DollarSign className="h-5 w-5" />
                    <span className="text-xs">{t("exchangeRates")}</span>
                  </TabsTrigger>
                </div>
              </div>
              <div className="hidden sm:contents">
                <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:font-semibold">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>{t("dashboard")}</span>
                </TabsTrigger>
                <TabsTrigger value="transactions" className="flex items-center gap-2 data-[state=active]:font-semibold">
                  <Receipt className="h-4 w-4" />
                  <span>{t("transactions")}</span>
                </TabsTrigger>
                <TabsTrigger value="budgets" className="flex items-center gap-2 data-[state=active]:font-semibold">
                  <BookmarkPlus className="h-4 w-4" />
                  <span>{t("budgets")}</span>
                </TabsTrigger>
                <TabsTrigger value="exchange-rates" className="flex items-center gap-2 data-[state=active]:font-semibold">
                  <DollarSign className="h-4 w-4" />
                  <span>{t("exchangeRates")}</span>
                </TabsTrigger>
              </div>
            </TabsList>
          </div>
          
          <TabsContent value="dashboard">
            <TabContent>
              <DashboardView />
            </TabContent>
          </TabsContent>
          
          <TabsContent value="transactions">
            <TabContent>
              <TransactionsView />
            </TabContent>
          </TabsContent>
          
          <TabsContent value="budgets">
            <TabContent>
              <BudgetView />
            </TabContent>
          </TabsContent>

          <TabsContent value="exchange-rates">
            <TabContent>
              <div className="rounded-lg border bg-card p-4 md:p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 md:mb-6">
                  <DollarSign className="h-6 w-6 text-primary" />
                  <h2 className="text-xl md:text-2xl font-semibold">{t("exchangeRates")}</h2>
                </div>
                <ManualExchangeRates />
              </div>
            </TabContent>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};