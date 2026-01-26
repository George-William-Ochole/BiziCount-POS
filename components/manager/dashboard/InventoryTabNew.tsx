'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, AlertTriangle, Search, Filter } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
  reorderLevel: number;
  retailPrice: number;
  costPrice: number;
  category: string;
  expiryDate?: string;
}

export function InventoryTabNew() {
  const storeId = 'store-1'; // Would come from session/context
  const { products, loading, error } = useProducts();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    stock: 0,
    reorderLevel: 0,
    retailPrice: 0,
    costPrice: 0,
    category: '',
  });

  const filteredProducts = products.filter((product: any) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.includes(searchTerm);
    const matchesCategory = categoryFilter === 'all' || product.category?.name === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(products.map((p: any) => p.category?.name))].filter(Boolean);

  const lowStockItems = filteredProducts.filter((p: any) => p.stock <= p.reorderLevel);
  const getStockStatus = (stock: number, reorderLevel: number) => {
    if (stock <= reorderLevel) return 'low';
    if (stock >= reorderLevel * 2) return 'high';
    return 'normal';
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search products..."
              className="pl-10 bg-[#1a1625] border-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40 bg-[#1a1625] border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat: any) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#1a1625] border-gray-800 p-4">
          <p className="text-gray-400 text-sm mb-1">Total Products</p>
          <p className="text-3xl font-bold">{products.length}</p>
        </Card>
        <Card className="bg-[#1a1625] border-gray-800 p-4">
          <p className="text-gray-400 text-sm mb-1">Low Stock Items</p>
          <p className="text-3xl font-bold text-yellow-400">{lowStockItems.length}</p>
        </Card>
        <Card className="bg-[#1a1625] border-gray-800 p-4">
          <p className="text-gray-400 text-sm mb-1">Total Stock Value</p>
          <p className="text-3xl font-bold text-green-400">
            Ush {(products.reduce((sum: number, p: any) => sum + (p.stock * p.costPrice), 0)).toFixed(0)}
          </p>
        </Card>
        <Card className="bg-[#1a1625] border-gray-800 p-4">
          <p className="text-gray-400 text-sm mb-1">Categories</p>
          <p className="text-3xl font-bold">{categories.length}</p>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Inventory Items</h2>
        
        {loading ? (
          <div className="text-center py-8 text-gray-400">Loading inventory...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Product</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">SKU</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">Category</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-300">Stock</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-300">Reorder Level</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-300">Cost Price</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-300">Retail Price</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-300">Status</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product: any) => {
                  const status = getStockStatus(product.stock, product.reorderLevel);
                  return (
                    <tr key={product.id} className="border-b border-gray-800 hover:bg-[#0f0a1a]/50 transition-colors">
                      <td className="py-3 px-4 font-semibold">{product.name}</td>
                      <td className="py-3 px-4 text-gray-400 text-sm">{product.sku}</td>
                      <td className="py-3 px-4 text-gray-400 text-sm">{product.category?.name}</td>
                      <td className="py-3 px-4 text-center font-semibold">{product.stock}</td>
                      <td className="py-3 px-4 text-center text-gray-400">{product.reorderLevel}</td>
                      <td className="py-3 px-4 text-right">${product.costPrice?.toFixed(2)}</td>
                      <td className="py-3 px-4 text-right text-green-400 font-semibold">${product.retailPrice?.toFixed(2)}</td>
                      <td className="py-3 px-4 text-center">
                        {status === 'low' && (
                          <Badge className="bg-red-600 flex items-center gap-1 justify-center">
                            <AlertTriangle className="w-3 h-3" /> Low
                          </Badge>
                        )}
                        {status === 'normal' && (
                          <Badge variant="secondary">Normal</Badge>
                        )}
                        {status === 'high' && (
                          <Badge className="bg-green-600">High</Badge>
                        )}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-700"
                            onClick={() => {
                              setSelectedItem(product);
                              setFormData(product);
                              setShowEditModal(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="bg-red-600 hover:bg-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredProducts.length === 0 && (
              <div className="text-center py-8 text-gray-400">No products found</div>
            )}
          </div>
        )}
      </Card>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-[#1a1625] border-gray-800 p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">{showEditModal ? 'Edit Product' : 'Add Product'}</h2>
            <form className="space-y-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">Product Name</label>
                <Input
                  type="text"
                  placeholder="Enter product name"
                  className="bg-[#0f0a1a] border-gray-700"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">SKU</label>
                <Input
                  type="text"
                  placeholder="Enter SKU"
                  className="bg-[#0f0a1a] border-gray-700"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Stock</label>
                  <Input
                    type="number"
                    placeholder="0"
                    className="bg-[#0f0a1a] border-gray-700"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Reorder Level</label>
                  <Input
                    type="number"
                    placeholder="0"
                    className="bg-[#0f0a1a] border-gray-700"
                    value={formData.reorderLevel}
                    onChange={(e) => setFormData({ ...formData, reorderLevel: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Cost Price</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="bg-[#0f0a1a] border-gray-700"
                    step="0.01"
                    value={formData.costPrice}
                    onChange={(e) => setFormData({ ...formData, costPrice: parseFloat(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Retail Price</label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="bg-[#0f0a1a] border-gray-700"
                    step="0.01"
                    value={formData.retailPrice}
                    onChange={(e) => setFormData({ ...formData, retailPrice: parseFloat(e.target.value) })}
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {showEditModal ? 'Update Product' : 'Add Product'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-gray-700"
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
