import { Search, Filter, Plus, Edit, Trash2, AlertTriangle, Calendar, TrendingDown } from 'lucide-react';
import { inventoryData, lowStockItems, expiringItems } from './mockData';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export function InventoryTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search products..."
              className="pl-10 w-64 bg-[#1a1625] border-gray-700"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-40 bg-[#1a1625] border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="beverages">Beverages</SelectItem>
              <SelectItem value="dairy">Dairy</SelectItem>
              <SelectItem value="bakery">Bakery</SelectItem>
              <SelectItem value="grains">Grains</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-gray-700">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Alert Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-orange-500/10 border-orange-500/50 border-2 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <div>
                <p className="font-semibold">Low Stock Items</p>
                <p className="text-2xl font-bold text-orange-500">{lowStockItems.length}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-red-500/10 border-red-500/50 border-2 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-500" />
              <div>
                <p className="font-semibold">Expiring Soon</p>
                <p className="text-2xl font-bold text-red-500">{expiringItems.length}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gray-500/10 border-gray-500/50 border-2 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-semibold">Dead Stock</p>
                <p className="text-2xl font-bold text-gray-400">3</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">All Products</h2>
        <div className="space-y-3">
          {inventoryData.map((item) => {
            const stockPercent = (item.stock / item.reorderLevel) * 100;
            const isLowStock = item.stock <= item.reorderLevel;
            const daysUntilExpiry = Math.ceil((new Date(item.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            const isExpiringSoon = daysUntilExpiry <= 30 && daysUntilExpiry > 0;
            
            return (
              <div
                key={item.id}
                className={`bg-[#0f0a1a] border rounded-lg p-4 ${
                  isLowStock ? 'border-orange-500/50' : isExpiringSoon ? 'border-red-500/50' : 'border-gray-800'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <p className="font-semibold text-lg">{item.name}</p>
                        <p className="text-sm text-gray-400">SKU: {item.sku} | Batch: {item.batchNumber}</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline">{item.category}</Badge>
                          <Badge variant="secondary">{item.supplier}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-400">Stock Level</p>
                    <p className={`text-lg font-bold ${isLowStock ? 'text-orange-400' : 'text-white'}`}>
                      {item.stock} units
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Reorder Level</p>
                    <p className="text-lg font-bold">{item.reorderLevel}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Cost Price</p>
                    <p className="text-lg font-bold text-blue-400">${item.costPrice}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Retail Price</p>
                    <p className="text-lg font-bold text-green-400">${item.retailPrice}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Expiry Date</p>
                    <p className={`text-sm font-bold ${isExpiringSoon ? 'text-red-400' : 'text-white'}`}>
                      {item.expiryDate}
                    </p>
                  </div>
                </div>

                {isLowStock && (
                  <div className="bg-orange-500/20 border border-orange-500 rounded p-2 mb-2">
                    <p className="text-xs text-orange-400 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      Low stock! Current: {item.stock}, Minimum: {item.reorderLevel}
                    </p>
                  </div>
                )}

                {isExpiringSoon && (
                  <div className="bg-red-500/20 border border-red-500 rounded p-2 mb-2">
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Expiring in {daysUntilExpiry} days!
                    </p>
                  </div>
                )}

                <div className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Stock Health</span>
                    <span className={isLowStock ? 'text-orange-400' : 'text-green-400'}>
                      {stockPercent.toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={stockPercent} className="h-2" />
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 flex-1">
                    Restock
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-700 flex-1">
                    Adjust Stock
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-700 flex-1">
                    View History
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
