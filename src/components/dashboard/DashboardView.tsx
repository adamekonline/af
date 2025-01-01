import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { name: 'Housing', amount: 2000, currency: 'PLN' },
  { name: 'Food', amount: 1000, currency: 'PLN' },
  { name: 'Transport', amount: 500, currency: 'PLN' },
  { name: 'Health', amount: 300, currency: 'PLN' },
  { name: 'Education', amount: 400, currency: 'PLN' },
];

export const DashboardView = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">15,000 PLN</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Income</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-green-600">+8,000 PLN</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-red-600">-4,200 PLN</p>
        </CardContent>
      </Card>

      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Expenses by Category</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};