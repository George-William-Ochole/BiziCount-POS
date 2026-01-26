import { TrendingUp, TrendingDown } from 'lucide-react';

import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { salesAnalytics, topProducts, deadStock, categoryPerformance } from './mockData';
import { Card } from '@/components/ui/card';

export function AnalyticsTab() {
  const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#1a1625] border-gray-800 p-5">
          <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
          <p className="text-3xl font-bold text-green-400">Ush 24,500</p>
          <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +8.3% vs last month
          </p>
        </Card>
        <Card className="bg-[#1a1625] border-gray-800 p-5">
          <p className="text-gray-400 text-sm mb-1">Gross Profit</p>
          <p className="text-3xl font-bold text-blue-400">Ush 6,100</p>
          <p className="text-blue-500 text-sm mt-1 flex items-center gap-1">
            24.9% margin
          </p>
        </Card>
        <Card className="bg-[#1a1625] border-gray-800 p-5">
          <p className="text-gray-400 text-sm mb-1">Top Product</p>
          <p className="text-lg font-bold">Coca Cola 500ml</p>
          <p className="text-gray-400 text-sm mt-1">320 units sold</p>
        </Card>
        <Card className="bg-[#1a1625] border-gray-800 p-5">
          <p className="text-gray-400 text-sm mb-1">Dead Stock Value</p>
          <p className="text-3xl font-bold text-red-400">Ush 399</p>
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <TrendingDown className="w-3 h-3" /> 3 products
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <h2 className="text-lg font-bold mb-4">Revenue & Profit Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesAnalytics}>
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
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Revenue" />
              <Line type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={2} name="Profit" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <h2 className="text-lg font-bold mb-4">Category Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryPerformance}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.payload.category}: $${entry.payload.revenue}`}
                outerRadius={100}
                dataKey="revenue"
              >
                {categoryPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <h2 className="text-lg font-bold mb-4">Fast-Moving Items</h2>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={index} className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold">{product.name}</p>
                  <span className="text-xs bg-green-600 px-2 py-1 rounded">#{index + 1}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{product.sold} units sold</span>
                  <span className="text-green-400 font-semibold">${product.revenue}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <h2 className="text-lg font-bold mb-4">Dead Stock (Slow-Moving)</h2>
          <div className="space-y-3">
            {deadStock.map((product, index) => (
              <div key={index} className="bg-[#0f0a1a] border border-red-500/50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold">{product.name}</p>
                  <span className="text-xs bg-red-600 px-2 py-1 rounded">{product.daysInStock} days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{product.quantity} units</span>
                  <span className="text-red-400 font-semibold">Value: ${product.value}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-lg font-bold mb-4">Category Profitability</h2>
        <div className="space-y-3">
          {categoryPerformance.map((category) => (
            <div key={category.category} className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold">{category.category}</p>
                <span className="text-sm text-gray-400">{category.margin}% margin</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Revenue</p>
                  <p className="font-semibold text-blue-400">${category.revenue}</p>
                </div>
                <div>
                  <p className="text-gray-400">Profit</p>
                  <p className="font-semibold text-green-400">${category.profit}</p>
                </div>
                <div>
                  <p className="text-gray-400">Margin</p>
                  <p className="font-semibold text-purple-400">{category.margin}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
