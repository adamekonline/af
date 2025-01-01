import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardView } from "@/components/dashboard/DashboardView";
import { TransactionsView } from "@/components/transactions/TransactionsView";

const Index = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Family Finance Manager</h1>
      
      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <DashboardView />
        </TabsContent>
        
        <TabsContent value="transactions">
          <TransactionsView />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;