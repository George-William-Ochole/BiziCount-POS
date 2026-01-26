import {Plus, Edit, Percent } from 'lucide-react';

import { inventoryData, pricingRules } from './mockData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export function PricingTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Smart Pricing Management</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Pricing Rule
        </Button>
      </div>

      {/* Active Promotions */}
      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h3 className="text-lg font-bold mb-4">Active Promotions</h3>
        <div className="space-y-3">
          {pricingRules.map((rule) => (
            <div
              key={rule.id}
              className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold">{rule.product}</p>
                  <Badge className="mt-1 bg-yellow-600">
                    {rule.type === 'promotional' ? 'Promotional Price' : 'Bulk Discount'}
                  </Badge>
                </div>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
              
              {rule.type === 'promotional' && (
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Original Price</p>
                    <p className="font-semibold line-through">${rule.originalPrice}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Promo Price</p>
                    <p className="font-semibold text-yellow-400">${rule.promoPrice}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Start Date</p>
                    <p className="font-semibold">{rule.startDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">End Date</p>
                    <p className="font-semibold">{rule.endDate}</p>
                  </div>
                </div>
              )}

              {rule.type === 'bulk' && (
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Minimum Quantity</p>
                    <p className="font-semibold">{rule.quantity} units</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Discount</p>
                    <p className="font-semibold text-green-400">{rule.discount}%</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Status</p>
                    <Badge variant={rule.active ? 'secondary' : 'outline'}>
                      {rule.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Product Pricing */}
      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h3 className="text-lg font-bold mb-4">Product Pricing</h3>
        <div className="space-y-3">
          {inventoryData.map((product) => {
            const margin = ((product.retailPrice - product.costPrice) / product.retailPrice * 100).toFixed(1);
            const profit = (product.retailPrice - product.costPrice).toFixed(2);
            
            return (
              <div
                key={product.id}
                className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-400">{product.sku}</p>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Cost Price</label>
                    <Input
                      type="number"
                      defaultValue={product.costPrice}
                      className="bg-[#1a1625] border-gray-700 h-9"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Retail Price</label>
                    <Input
                      type="number"
                      defaultValue={product.retailPrice}
                      className="bg-[#1a1625] border-gray-700 h-9"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Profit/Unit</p>
                    <p className="text-lg font-bold text-green-400">${profit}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Margin</p>
                    <p className="text-lg font-bold text-blue-400">{margin}%</p>
                  </div>
                  <div className="flex items-end">
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
