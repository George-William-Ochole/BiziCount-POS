import { Search, Star, Eye } from 'lucide-react';

import { customerLoyalty } from './mockData';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function CustomersTab() {
  return (
    <div className="space-y-4">
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search by name or phone..."
          className="pl-10 bg-[#1a1625] border-gray-700"
        />
      </div>

      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Customer Directory</h2>
        <div className="space-y-3">
          {customerLoyalty.map((customer) => (
            <div
              key={customer.id}
              className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-4 hover:border-green-500/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-lg">{customer.name}</p>
                  <p className="text-sm text-gray-400">{customer.phone}</p>
                </div>
                <Badge
                  className={
                    customer.tier === 'Platinum'
                      ? 'bg-purple-600'
                      : customer.tier === 'Gold'
                      ? 'bg-yellow-600'
                      : customer.tier === 'Silver'
                      ? 'bg-gray-500'
                      : 'bg-orange-700'
                  }
                >
                  {customer.tier}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Loyalty Points</p>
                  <p className="font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    {customer.points}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Total Spent</p>
                  <p className="font-semibold text-green-400">${customer.totalSpent}</p>
                </div>
                <div>
                  <Button size="sm" variant="outline" className="border-gray-700 w-full">
                    <Eye className="w-4 h-4 mr-1" />
                    View
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
