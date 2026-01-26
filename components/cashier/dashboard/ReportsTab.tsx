import { Download, TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { hourlyData } from './mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function ReportsTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Select defaultValue="today">
          <SelectTrigger className="w-40 bg-[#1a1625] border-gray-700">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="border-gray-700">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Sales Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={hourlyData}>
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
            <Line type="monotone" dataKey="sales" stroke="#22c55e" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#1a1625] border-gray-800 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-green-400">$1,247.50</p>
              <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +12.5%
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#1a1625] border-gray-800 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Transactions</p>
              <p className="text-3xl font-bold text-blue-400">45</p>
              <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +8.2%
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#1a1625] border-gray-800 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Avg. Basket</p>
              <p className="text-3xl font-bold text-purple-400">$27.72</p>
              <p className="text-green-500 text-sm mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +3.8%
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
