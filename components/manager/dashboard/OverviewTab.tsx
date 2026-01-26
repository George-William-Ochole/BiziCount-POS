import { Package, AlertTriangle, TrendingUp, DollarSign, ShoppingCart, Calendar } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { lowStockItems, expiringItems, salesAnalytics, topProducts, purchaseOrders } from './mockData';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
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
              <p className="text-gray-400 text-sm mb-1">Total Products</p>
              <p className="text-3xl font-bold text-blue-500">324</p>
              <p className="text-sm text-green-500 mt-1">↑ +12 this week</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <Package className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="bg-[#1a1625] border-gray-800 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Low Stock Items</p>
              <p className="text-3xl font-bold text-orange-400">{lowStockItems.length}</p>
              <p className="text-sm text-orange-400 mt-1">Needs attention</p>
            </div>
            <div className="bg-orange-500/20 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-[#1a1625] border-gray-800 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Monthly Revenue</p>
              <p className="text-3xl font-bold text-green-400">$24.5k</p>
              <p className="text-sm text-green-500 mt-1">↑ +8.3%</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-[#1a1625] border-gray-800 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Active Orders</p>
              <p className="text-3xl font-bold text-purple-400">8</p>
              <p className="text-sm text-gray-400 mt-1">Purchase orders</p>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <h2 className="text-lg font-bold mb-4">Revenue & Profit Trends</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={salesAnalytics}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
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
              <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
              <Area type="monotone" dataKey="profit" stroke="#22c55e" fillOpacity={1} fill="url(#colorProfit)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <h2 className="text-lg font-bold mb-4">Top Selling Products</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#9ca3af" />
              <YAxis dataKey="name" type="category" stroke="#9ca3af" width={120} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1625',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="sold" fill="#6366f1" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Alerts & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Low Stock Alert */}
        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              Low Stock
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-500"
              onClick={() => onTabChange('inventory')}
            >
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {lowStockItems.slice(0, 3).map((item) => (
              <div key={item.id} className="bg-[#0f0a1a] border border-orange-500/50 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.sku}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Stock: {item.stock}</span>
                  <span className="text-orange-500">Min: {item.reorderLevel}</span>
                </div>
                <Progress value={(item.stock / item.reorderLevel) * 100} className="h-1 mt-2" />
              </div>
            ))}
          </div>
        </Card>

        {/* Expiring Soon */}
        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-500" />
              Expiring Soon
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-500"
              onClick={() => onTabChange('inventory')}
            >
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {expiringItems.slice(0, 3).map((item) => (
              <div key={item.id} className="bg-[#0f0a1a] border border-red-500/50 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400">Batch: {item.batchNumber}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">Expires: {item.expiryDate}</span>
                  <Badge variant="destructive" className="text-xs">
                    {Math.ceil((new Date(item.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Pending Orders */}
        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-purple-500" />
              Purchase Orders
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-500"
              onClick={() => onTabChange('purchase-orders')}
            >
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {purchaseOrders.slice(0, 3).map((order) => (
              <div key={order.id} className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-sm">{order.id}</p>
                    <p className="text-xs text-gray-400">{order.supplier}</p>
                  </div>
                  <Badge
                    variant={
                      order.status === 'pending'
                        ? 'outline'
                        : order.status === 'approved'
                        ? 'default'
                        : 'secondary'
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400">{order.items} items</span>
                  <span className="text-green-400 font-semibold">${order.totalCost}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
