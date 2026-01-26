import { Eye, Download, Filter } from 'lucide-react';
import { recentTransactions } from './mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function TransactionsTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
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
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <Button variant="outline" className="border-gray-700">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
        <div className="space-y-3">
          {recentTransactions.map((txn) => (
            <div
              key={txn.id}
              className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-4 hover:border-green-500/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-semibold">{txn.id}</p>
                    <p className="text-sm text-gray-400">{txn.time}</p>
                  </div>
                  <Badge variant="secondary">{txn.payment}</Badge>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-400">${txn.total.toFixed(2)}</p>
                  <p className="text-xs text-gray-400">{txn.items} items</p>
                </div>
                <Button size="sm" variant="outline" className="border-gray-700">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
