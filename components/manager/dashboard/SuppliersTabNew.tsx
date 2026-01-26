'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, Phone, Mail, Eye, Star } from 'lucide-react';
import { useSuppliers } from '@/hooks/useSuppliers';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function SuppliersTabNew() {
  const { suppliers, loading, error, createSupplier, updateSupplier, deleteSupplier } = useSuppliers();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    category: '',
    paymentTerms: 'Net 30',
    rating: 0,
  });

  const handleCreateSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSupplier(formData);
      setShowCreateModal(false);
      setFormData({
        name: '',
        contactPerson: '',
        phone: '',
        email: '',
        category: '',
        paymentTerms: 'Net 30',
        rating: 0,
      });
      alert('Supplier created successfully!');
    } catch (error) {
      alert('Failed to create supplier');
    }
  };

  const handleEditSupplier = (supplier: any) => {
    setSelectedSupplier(supplier);
    setFormData(supplier);
    setShowEditModal(true);
  };

  const handleUpdateSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateSupplier(selectedSupplier.id, formData);
      setShowEditModal(false);
      alert('Supplier updated successfully!');
    } catch (error) {
      alert('Failed to update supplier');
    }
  };

  const handleDeleteSupplier = async (id: string) => {
    if (confirm('Are you sure you want to delete this supplier?')) {
      try {
        await deleteSupplier(id);
        alert('Supplier deleted successfully!');
      } catch (error) {
        alert('Failed to delete supplier');
      }
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-400 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Supplier Management</h2>
        <Button className="bg-pink-600 hover:bg-pink-700" onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Supplier
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#1a1625] border-gray-800 p-4">
          <p className="text-gray-400 text-sm mb-1">Total Suppliers</p>
          <p className="text-3xl font-bold">{suppliers.length}</p>
        </Card>
        <Card className="bg-[#1a1625] border-gray-800 p-4">
          <p className="text-gray-400 text-sm mb-1">Active Suppliers</p>
          <p className="text-3xl font-bold text-green-400">
            {suppliers.filter((s: any) => s.status === 'ACTIVE').length}
          </p>
        </Card>
        <Card className="bg-[#1a1625] border-gray-800 p-4">
          <p className="text-gray-400 text-sm mb-1">Total Spent</p>
          <p className="text-3xl font-bold text-blue-400">
            ${suppliers.reduce((sum: number, s: any) => sum + (s.totalSpent || 0), 0).toFixed(0)}
          </p>
        </Card>
      </div>

      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Supplier Directory</h2>
        {loading ? (
          <div className="text-center py-8 text-gray-400">Loading suppliers...</div>
        ) : (
          <div className="space-y-3">
            {suppliers.map((supplier: any) => (
              <div
                key={supplier.id}
                className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-5 hover:border-blue-500/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-lg">{supplier.name}</p>
                    <p className="text-sm text-gray-400">Contact: {supplier.contactPerson || 'N/A'}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary">{supplier.paymentTerms}</Badge>
                      <Badge variant={supplier.status === 'ACTIVE' ? 'default' : 'destructive'}>
                        {supplier.status}
                      </Badge>
                      {supplier.category && <Badge>{supplier.category}</Badge>}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold">{supplier.rating?.toFixed(1) || '0'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                  <div>
                    <p className="text-gray-400">Products</p>
                    <p className="font-semibold">{supplier.productCount || 0}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Total Orders</p>
                    <p className="font-semibold">{supplier.totalOrders || 0}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Total Spent</p>
                    <p className="font-semibold text-green-400">${supplier.totalSpent?.toFixed(0) || 0}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Rating</p>
                    <p className="font-semibold">{supplier.rating?.toFixed(1) || '0'}/5</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {supplier.phone && (
                    <Button size="sm" variant="outline" className="border-gray-700">
                      <Phone className="w-4 h-4 mr-1" />
                      {supplier.phone}
                    </Button>
                  )}
                  {supplier.email && (
                    <Button size="sm" variant="outline" className="border-gray-700">
                      <Mail className="w-4 h-4 mr-1" />
                      {supplier.email}
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-700 ml-auto"
                    onClick={() => handleEditSupplier(supplier)}
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => handleDeleteSupplier(supplier.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            {suppliers.length === 0 && (
              <div className="text-center py-8 text-gray-400">No suppliers found</div>
            )}
          </div>
        )}
      </Card>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-[#1a1625] border-gray-800 p-8 w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Create Supplier</h2>
            <form onSubmit={handleCreateSupplier} className="space-y-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">Supplier Name</label>
                <Input
                  type="text"
                  placeholder="Enter supplier name"
                  className="bg-[#0f0a1a] border-gray-700"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Contact Person</label>
                <Input
                  type="text"
                  placeholder="Enter contact person"
                  className="bg-[#0f0a1a] border-gray-700"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Email</label>
                <Input
                  type="email"
                  placeholder="supplier@example.com"
                  className="bg-[#0f0a1a] border-gray-700"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Phone</label>
                <Input
                  type="tel"
                  placeholder="+256 700 123456"
                  className="bg-[#0f0a1a] border-gray-700"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Category</label>
                <Input
                  type="text"
                  placeholder="Enter category"
                  className="bg-[#0f0a1a] border-gray-700"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Payment Terms</label>
                <Input
                  type="text"
                  placeholder="Net 30"
                  className="bg-[#0f0a1a] border-gray-700"
                  value={formData.paymentTerms}
                  onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-pink-600 hover:bg-pink-700"
                >
                  Create Supplier
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-gray-700"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedSupplier && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-[#1a1625] border-gray-800 p-8 w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Edit Supplier</h2>
            <form onSubmit={handleUpdateSupplier} className="space-y-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">Supplier Name</label>
                <Input
                  type="text"
                  className="bg-[#0f0a1a] border-gray-700"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Contact Person</label>
                <Input
                  type="text"
                  className="bg-[#0f0a1a] border-gray-700"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Email</label>
                <Input
                  type="email"
                  className="bg-[#0f0a1a] border-gray-700"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Phone</label>
                <Input
                  type="tel"
                  className="bg-[#0f0a1a] border-gray-700"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-pink-600 hover:bg-pink-700"
                >
                  Update Supplier
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-gray-700"
                  onClick={() => setShowEditModal(false)}
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
