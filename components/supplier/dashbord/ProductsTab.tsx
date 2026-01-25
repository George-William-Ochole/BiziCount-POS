import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Plus, Edit, MoreHorizontal, AlertTriangle } from 'lucide-react';

import {
  LineChart,
  Line,
  ResponsiveContainer,
} from 'recharts';
import { productsData } from './MockData';


export function ProductsTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-40 bg-[#1a1625] border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="vegetables">Vegetables</SelectItem>
              <SelectItem value="dairy">Dairy</SelectItem>
              <SelectItem value="bakery">Bakery</SelectItem>
              <SelectItem value="meat">Meat</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-gray-700">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <Button className="bg-pink-600 hover:bg-pink-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Your Product Catalog</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {productsData.map((product) => (
            <div
              key={product.id}
              className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-5 hover:border-pink-500/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-lg">{product.name}</p>
                  <p className="text-sm text-gray-400">{product.category}</p>
                  <p className="text-xs text-gray-500 mt-1">SKU: {product.sku}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-gray-400 text-sm">Current Price</p>
                  <p className="text-xl font-bold text-green-400">${product.currentPrice}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Stock</p>
                  <p className={`text-xl font-bold ${product.stock < product.lowStockThreshold ? 'text-orange-400' : 'text-white'}`}>
                    {product.stock}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Trend</p>
                  <p className="text-xl font-bold text-green-500">↑ 2.3%</p>
                </div>
              </div>

              {product.stock < product.lowStockThreshold && (
                <div className="bg-orange-500/20 border border-orange-500 rounded-lg p-2 mb-3">
                  <p className="text-xs text-orange-400 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Low stock alert! Only {product.stock} units remaining
                  </p>
                </div>
              )}

              <div>
                <p className="text-gray-400 text-sm mb-2">Price History (5 weeks)</p>
                <ResponsiveContainer width="100%" height={60}>
                  <LineChart data={product.priceHistory.map((price, idx) => ({ week: idx + 1, price }))}>
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#22c55e"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="flex gap-2 mt-4">
                <Button size="sm" className="flex-1 bg-pink-600 hover:bg-pink-700">
                  Update Stock
                </Button>
                <Button size="sm" variant="outline" className="flex-1 border-gray-700">
                  Edit Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
