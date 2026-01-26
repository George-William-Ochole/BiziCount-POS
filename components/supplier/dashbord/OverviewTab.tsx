import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Package, DollarSign, Star, FileText, TrendingUp, Truck, Clock, ExternalLink, AlertTriangle, CheckCircle } from 'lucide-react';

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
import { StatCard } from './StatCard';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categorySales, ordersData, productsData, revenueTrends, upcomingDeliveries } from './MockData';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';


interface OverviewTabProps {
  onTabChange: (tab: string) => void;
}

export function OverviewTab({ onTabChange }: OverviewTabProps) {
  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: React.ComponentType<{ className?: string }> }> = {
      pending: { variant: 'outline', icon: Clock },
      shipped: { variant: 'default', icon: Truck },
      delivered: { variant: 'secondary', icon: CheckCircle },
    };
    
    const config = variants[status] || variants.pending;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Active Orders"
          value="12"
          change="↑ +5.2%"
          changeType="positive"
          icon={Package}
          iconColor="text-pink-500"
          iconBgColor="bg-pink-500/20"
        />
        <StatCard
          label="Monthly Revenue"
          value="Ush 24.7k"
          change="↑ +8.1%"
          changeType="positive"
          icon={DollarSign}
          iconColor="text-green-400"
          iconBgColor="bg-green-500/20"
        />
        <StatCard
          label="Delivery Rating"
          value="4.8"
          subtitle="⭐ 87% on-time"
          icon={Star}
          iconColor="text-yellow-400"
          iconBgColor="bg-yellow-500/20"
        />
        <StatCard
          label="Pending Payment"
          value="Ush 5.2k"
          subtitle="⏱ 5 invoices"
          icon={FileText}
          iconColor="text-orange-400"
          iconBgColor="bg-orange-500/20"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Revenue Trends</h2>
            <Select defaultValue="6months">
              <SelectTrigger className="w-32 bg-[#0f0a1a] border-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueTrends}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
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
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#ec4899"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Sales by Category</h2>
            <Button variant="ghost" size="sm" className="text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              Export
            </Button>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categorySales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="category" stroke="#9ca3af" angle={-45} textAnchor="end" height={80} />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1625',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="sales" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="bg-[#1a1625] border-gray-800 p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Recent Orders</h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-pink-500"
              onClick={() => onTabChange('orders')}
            >
              View All <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </div>
          <div className="space-y-3">
            {ordersData.slice(0, 4).map((order) => (
              <div
                key={order.id}
                className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-4 hover:border-pink-500/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-sm text-gray-400">{order.storeName}</p>
                  </div>
                  {getStatusBadge(order.status)}
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">{order.items} items</span>
                  <span className="font-semibold text-green-400">${order.total}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Deliveries */}
        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <h2 className="text-lg font-bold mb-4">Upcoming Deliveries</h2>
          <div className="space-y-3">
            {upcomingDeliveries.map((delivery) => (
              <div
                key={delivery.id}
                className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-3"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-4 h-4 text-pink-500" />
                  <p className="font-semibold text-sm">{delivery.id}</p>
                </div>
                <p className="text-xs text-gray-400 mb-1">{delivery.store}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">{delivery.date}</span>
                  <span className="text-pink-500">{delivery.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Inventory Alerts */}
      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Inventory Alerts
          </h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-pink-500"
            onClick={() => onTabChange('products')}
          >
            Manage Inventory
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {productsData
            .filter((p) => p.stock < p.lowStockThreshold)
            .map((product) => (
              <div
                key={product.id}
                className="bg-[#0f0a1a] border border-orange-500/50 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-sm">{product.name}</p>
                    <p className="text-xs text-gray-400">{product.sku}</p>
                  </div>
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Stock Level</span>
                    <span className="text-orange-500">{product.stock} units</span>
                  </div>
                  <Progress
                    value={(product.stock / product.lowStockThreshold) * 100}
                    className="h-2"
                  />
                </div>
                <Button
                  size="sm"
                  className="w-full mt-3 bg-orange-600 hover:bg-orange-700"
                >
                  Restock
                </Button>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}
