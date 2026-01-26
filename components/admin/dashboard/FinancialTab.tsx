import { DollarSign, TrendingUp, Download } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { financialOverview, revenueData } from './mockData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function FinancialTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-green-400">${(financialOverview.totalRevenue / 1000).toFixed(1)}K</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <p className="text-green-500 text-sm flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +{financialOverview.monthlyGrowth}% from last month
          </p>
        </Card>

        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Expenses</p>
              <p className="text-3xl font-bold text-red-400">${(financialOverview.totalExpenses / 1000).toFixed(1)}K</p>
            </div>
            <div className="bg-red-500/20 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-red-400" />
            </div>
          </div>
          <p className="text-sm text-gray-400">Operating costs</p>
        </Card>

        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-gray-400 text-sm mb-1">Net Profit</p>
              <p className="text-3xl font-bold text-blue-400">${(financialOverview.netProfit / 1000).toFixed(1)}K</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <p className="text-sm text-gray-400">{financialOverview.profitMargin}% profit margin</p>
        </Card>
      </div>

      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Financial Performance</h2>
          <Button variant="outline" className="border-gray-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1625',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} name="Revenue" />
            <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} name="Expenses" />
            <Line type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={2} name="Profit" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
