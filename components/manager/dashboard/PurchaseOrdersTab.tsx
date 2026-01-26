import { Plus, Eye, Download, CheckCircle, Clock, Package } from 'lucide-react';
import { purchaseOrders } from './mockData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function PurchaseOrdersTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Purchase Orders Management</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create New PO
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#1a1625] border-gray-800 p-5">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-orange-400" />
            <div>
              <p className="text-gray-400 text-sm">Pending</p>
              <p className="text-2xl font-bold">
                {purchaseOrders.filter(o => o.status === 'pending').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="bg-[#1a1625] border-gray-800 p-5">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-gray-400 text-sm">Approved</p>
              <p className="text-2xl font-bold">
                {purchaseOrders.filter(o => o.status === 'approved').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="bg-[#1a1625] border-gray-800 p-5">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-gray-400 text-sm">Received</p>
              <p className="text-2xl font-bold">
                {purchaseOrders.filter(o => o.status === 'received').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h3 className="text-lg font-bold mb-4">All Purchase Orders</h3>
        <div className="space-y-3">
          {purchaseOrders.map((order) => (
            <div
              key={order.id}
              className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-4 hover:border-blue-500/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-lg">{order.id}</p>
                  <p className="text-sm text-gray-400">{order.supplier}</p>
                  <p className="text-xs text-gray-500">Created by {order.createdBy}</p>
                </div>
                <Badge
                  variant={
                    order.status === 'pending'
                      ? 'outline'
                      : order.status === 'approved'
                      ? 'default'
                      : 'secondary'
                  }
                >
                  {order.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                  {order.status === 'approved' && <Package className="w-3 h-3 mr-1" />}
                  {order.status === 'received' && <CheckCircle className="w-3 h-3 mr-1" />}
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </div>

              <div className="grid grid-cols-4 gap-4 text-sm mb-3">
                <div>
                  <p className="text-gray-400">Items</p>
                  <p className="font-semibold">{order.items}</p>
                </div>
                <div>
                  <p className="text-gray-400">Total Cost</p>
                  <p className="font-semibold text-green-400">${order.totalCost}</p>
                </div>
                <div>
                  <p className="text-gray-400">Order Date</p>
                  <p className="font-semibold">{order.orderDate}</p>
                </div>
                <div>
                  <p className="text-gray-400">Expected Delivery</p>
                  <p className="font-semibold">{order.expectedDelivery}</p>
                </div>
              </div>

              <div className="flex gap-2">
                {order.status === 'pending' && (
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                )}
                {order.status === 'approved' && (
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Package className="w-4 h-4 mr-1" />
                    Mark as Received
                  </Button>
                )}
                <Button size="sm" variant="outline" className="border-gray-700">
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </Button>
                <Button size="sm" variant="outline" className="border-gray-700">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
