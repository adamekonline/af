import { useState, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { BudgetView } from "@/components/budget/BudgetView";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { TransactionsView } from "@/components/transactions/TransactionsView";
import { ManualExchangeRates } from "@/components/dashboard/ManualExchangeRates";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { t } from "@/utils/translations";

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
      localStorage.clear();
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
        toast.error(t("errorLoggingOut"));
        return;
      }
      setIsSheetOpen(false);
      sessionStorage.clear();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(t("errorLoggingOut"));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        handleLogout={handleLogout}
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
      />

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