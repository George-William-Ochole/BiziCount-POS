import { Card } from '@/components/ui/card';
import { Filter, Download, Eye } from 'lucide-react';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { invoicesData, paymentsData } from './MockData';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';


export function PaymentsTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <h2 className="text-xl font-bold mb-4">Payment Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={paymentsData}>
              <defs>
                <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
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
                dataKey="paid"
                stroke="#22c55e"
                fillOpacity={1}
                fill="url(#colorPaid)"
              />
              <Area
                type="monotone"
                dataKey="pending"
                stroke="#f59e0b"
                fillOpacity={1}
                fill="url(#colorPending)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <h2 className="text-xl font-bold mb-4">Payment Summary</h2>
          <div className="space-y-4">
            <div className="bg-[#0f0a1a] rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Total Paid (This Month)</span>
                <span className="text-2xl font-bold text-green-400">$19,500</span>
              </div>
              <Progress value={78} className="h-2" />
              <p className="text-xs text-gray-400 mt-1">78% of expected revenue</p>
            </div>

            <div className="bg-[#0f0a1a] rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Pending Payments</span>
                <span className="text-2xl font-bold text-orange-400">$5,200</span>
              </div>
              <Progress value={22} className="h-2" />
              <p className="text-xs text-gray-400 mt-1">5 pending invoices</p>
            </div>

            <div className="bg-[#0f0a1a] rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Next Payment Due</span>
                <span className="font-semibold text-pink-400">Nov 25, 2023</span>
              </div>
              <p className="text-sm text-gray-400 mt-1">Downtown Store - $1,245</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recent Invoices</h2>
          <div className="flex gap-2">
            <Button variant="outline" className="border-gray-700">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" className="border-gray-700">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <div className="space-y-3">
          {invoicesData.map((invoice) => (
            <div
              key={invoice.id}
              className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-4 hover:border-pink-500/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-semibold">{invoice.id}</p>
                    <p className="text-sm text-gray-400">{invoice.store}</p>
                  </div>
                  <Badge
                    variant={
                      invoice.status === 'paid'
                        ? 'secondary'
                        : invoice.status === 'overdue'
                        ? 'destructive'
                        : 'outline'
                    }
                  >
                    {invoice.status === 'paid' && '✓ Paid'}
                    {invoice.status === 'pending' && '⏱ Pending'}
                    {invoice.status === 'overdue' && '⚠ Overdue'}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-400">${invoice.amount}</p>
                  <p className="text-xs text-gray-400">Due: {invoice.dueDate}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-gray-700">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-700">
                    <Download className="w-4 h-4 mr-1" />
                    PDF
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
