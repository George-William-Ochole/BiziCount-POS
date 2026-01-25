import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, MessageSquare, Eye } from 'lucide-react';
import { customersData } from './MockData';


export function CustomersTab() {
  return (
    <div className="space-y-4">
      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Your Customers</h2>
        <div className="space-y-3">
          {customersData.map((customer, idx) => (
            <div
              key={idx}
              className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-5 hover:border-pink-500/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-lg">{customer.name}</p>
                  <p className="text-sm text-gray-400">Contact: {customer.contact}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">{customer.rating}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Total Orders</p>
                  <p className="font-semibold text-lg">{customer.orders}</p>
                </div>
                <div>
                  <p className="text-gray-400">Total Revenue</p>
                  <p className="font-semibold text-lg text-green-400">${customer.total}</p>
                </div>
                <div>
                  <p className="text-gray-400">Status</p>
                  <Badge variant="secondary" className="mt-1">Active</Badge>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" variant="outline" className="border-gray-700">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Message
                </Button>
                <Button size="sm" variant="outline" className="border-gray-700">
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
