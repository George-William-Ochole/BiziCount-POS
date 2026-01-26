import {Star } from 'lucide-react';
import { suppliersList } from './mockData';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function SuppliersTab() {
  return (
    <div className="space-y-4">
      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">All Suppliers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suppliersList.map((supplier) => (
            <div
              key={supplier.id}
              className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-lg">{supplier.name}</p>
                  <p className="text-sm text-gray-400">{supplier.category}</p>
                </div>
                <Badge className="bg-green-600">{supplier.status}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>{supplier.rating}</span>
                </div>
                <span className="text-gray-400">{supplier.orders} orders</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
