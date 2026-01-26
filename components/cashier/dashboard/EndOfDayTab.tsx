import { DollarSign, TrendingUp, Download, Printer } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { todaySummary, hourlyData, paymentMethodsData } from './mockData';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function EndOfDayTab() {
  const expectedCash = todaySummary.cashSales;
  const actualCash = 515.00; // This would be entered by cashier
  const variance = actualCash - expectedCash;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#1a1625] border-gray-800 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Sales</p>
              <p className="text-3xl font-bold text-green-400">${todaySummary.totalSales.toFixed(2)}</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-[#1a1625] border-gray-800 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Transactions</p>
              <p className="text-3xl font-bold text-blue-400">{todaySummary.transactions}</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-[#1a1625] border-gray-800 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Avg Basket</p>
              <p className="text-3xl font-bold text-purple-400">${todaySummary.averageBasket.toFixed(2)}</p>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-[#1a1625] border-gray-800 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Returns</p>
              <p className="text-3xl font-bold text-red-400">${todaySummary.returns.toFixed(2)}</p>
            </div>
            <div className="bg-red-500/20 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <h2 className="text-xl font-bold mb-4">Cash Reconciliation</h2>
          <div className="space-y-4">
            <div className="bg-[#0f0a1a] rounded-lg p-4">
              <p className="text-gray-400 mb-1">Expected Cash</p>
              <p className="text-2xl font-bold text-green-400">${expectedCash.toFixed(2)}</p>
            </div>

            <div>
              <label className="text-sm font-semibold mb-2 block">Actual Cash Count</label>
              <Input
                type="number"
                defaultValue={actualCash}
                className="bg-[#0f0a1a] border-gray-700"
              />
            </div>

            <div className={`rounded-lg p-4 ${variance >= 0 ? 'bg-green-500/20 border border-green-500' : 'bg-red-500/20 border border-red-500'}`}>
              <p className="text-sm mb-1">Variance</p>
              <p className={`text-2xl font-bold ${variance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ${Math.abs(variance).toFixed(2)} {variance >= 0 ? 'Over' : 'Short'}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Cash Sales:</span>
                <span className="font-semibold">${todaySummary.cashSales.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Mobile Payments:</span>
                <span className="font-semibold">${todaySummary.mobilePayments.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Card Payments:</span>
                <span className="font-semibold">${todaySummary.cardPayments.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <h2 className="text-xl font-bold mb-4">Payment Methods</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={paymentMethodsData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={(entry) => `${entry.name}: $${entry.value}`}
              >
                {paymentMethodsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1625',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Hourly Sales</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="hour" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1625',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="sales" fill="#22c55e" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="flex gap-3">
        <Button className="bg-green-600 hover:bg-green-700">
          <Printer className="w-4 h-4 mr-2" />
          Print EOD Report
        </Button>
        <Button variant="outline" className="border-gray-700">
          <Download className="w-4 h-4 mr-2" />
          Export to Excel
        </Button>
        <Button variant="destructive" className="ml-auto">
          Close Till & Logout
        </Button>
      </div>
    </div>
  );
}
