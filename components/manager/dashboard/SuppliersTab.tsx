import { Star, Phone, Mail, Eye } from 'lucide-react';

import { suppliers } from './mockData';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function SuppliersTab() {
  return (
    <div className="space-y-4">
      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Supplier Directory</h2>
        <div className="space-y-3">
          {suppliers.map((supplier) => (
            <div
              key={supplier.id}
              className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-5 hover:border-blue-500/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-lg">{supplier.name}</p>
                  <p className="text-sm text-gray-400">Contact: {supplier.contact}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">{supplier.paymentTerms}</Badge>
                    <Badge variant={supplier.status === 'active' ? 'default' : 'outline'}>
                      {supplier.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">{supplier.rating}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                <div>
                  <p className="text-gray-400">Products</p>
                  <p className="font-semibold">{supplier.products}</p>
                </div>
                <div>
                  <p className="text-gray-400">Total Orders</p>
                  <p className="font-semibold">{supplier.totalOrders}</p>
                </div>
                <div>
                  <p className="text-gray-400">Total Spent</p>
                  <p className="font-semibold text-green-400">${supplier.totalSpent}</p>
                </div>
                <div>
                  <p className="text-gray-400">Payment Terms</p>
                  <p className="font-semibold">{supplier.paymentTerms}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-gray-700">
                  <Phone className="w-4 h-4 mr-1" />
                  {supplier.phone}
                </Button>
                <Button size="sm" variant="outline" className="border-gray-700">
                  <Mail className="w-4 h-4 mr-1" />
                  {supplier.email}
                </Button>
                <Button size="sm" variant="outline" className="border-gray-700 ml-auto">
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
