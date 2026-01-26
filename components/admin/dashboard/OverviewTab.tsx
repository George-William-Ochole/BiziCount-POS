import { DollarSign, TrendingUp, Users, Activity, AlertTriangle, CheckCircle } from 'lucide-react';

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { financialOverview, revenueData, storePerformance, systemHealth, systemNotifications, topProducts, customerSegments } from './mockData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface OverviewTabProps {
  onTabChange: (tab: string) => void;
}

export function OverviewTab({ onTabChange }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#1a1625] border-gray-800 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-green-400">${(financialOverview.totalRevenue / 1000).toFixed(1)}K</p>
              <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +{financialOverview.monthlyGrowth}%
              </p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-[#1a1625] border-gray-800 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Net Profit</p>
              <p className="text-3xl font-bold text-blue-400">${(financialOverview.netProfit / 1000).toFixed(1)}K</p>
              <p className="text-sm text-gray-400 mt-1">{financialOverview.profitMargin}% margin</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-[#1a1625] border-gray-800 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Active Users</p>
              <p className="text-3xl font-bold text-purple-400">{systemHealth.activeUsers}</p>
              <p className="text-sm text-gray-400 mt-1">Across all stores</p>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-[#1a1625] border-gray-800 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">System Uptime</p>
              <p className="text-3xl font-bold text-yellow-400">{systemHealth.uptime}</p>
              <p className="text-sm text-gray-400 mt-1">Last 30 days</p>
            </div>
            <div className="bg-yellow-500/20 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <h2 className="text-lg font-bold mb-4">Revenue & Profit Trends</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
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
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8b5cf6"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#22c55e"
                fillOpacity={1}
                fill="url(#colorProfit)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <h2 className="text-lg font-bold mb-4">Store Performance</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={storePerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="store" stroke="#9ca3af" angle={-15} textAnchor="end" height={80} />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1625',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="revenue" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Notifications */}
        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">System Alerts</h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-purple-500"
              onClick={() => onTabChange('audit')}
            >
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {systemNotifications.slice(0, 4).map((notif) => (
              <div
                key={notif.id}
                className={`bg-[#0f0a1a] border rounded-lg p-3 ${
                  notif.type === 'error' ? 'border-red-500/50' :
                  notif.type === 'warning' ? 'border-orange-500/50' :
                  notif.type === 'success' ? 'border-green-500/50' :
                  'border-gray-800'
                }`}
              >
                <div className="flex items-start gap-2">
                  {notif.type === 'error' && <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />}
                  {notif.type === 'warning' && <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5" />}
                  {notif.type === 'success' && <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />}
                  {notif.type === 'info' && <Activity className="w-4 h-4 text-blue-500 mt-0.5" />}
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{notif.title}</p>
                    <p className="text-xs text-gray-400">{notif.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Products */}
        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Top Products</h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-purple-500"
              onClick={() => onTabChange('inventory')}
            >
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {topProducts.slice(0, 5).map((product, idx) => (
              <div
                key={idx}
                className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-3"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-sm">{product.name}</p>
                  <Badge className="bg-purple-600">{idx + 1}</Badge>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">{product.sales} sales</span>
                  <span className="text-green-400 font-semibold">${product.revenue.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Customer Segments */}
        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Customer Segments</h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={customerSegments}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="customers"
              >
                {customerSegments.map((entry, index) => (
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
          <div className="space-y-2 mt-4">
            {customerSegments.map((segment) => (
              <div key={segment.segment} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }}></div>
                  <span>{segment.segment}</span>
                </div>
                <span className="text-gray-400">{segment.customers}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
