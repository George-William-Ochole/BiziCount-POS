import { Package, Clock, CheckCircle, AlertCircle, Plus } from 'lucide-react';

interface PurchaseOrder {
  id: string;
  supplier: string;
  items: number;
  amount: number;
  status: 'pending' | 'approved' | 'received' | 'delayed';
  orderDate: string;
  expectedDate: string;
}

const orders: PurchaseOrder[] = [
  { id: 'PO-1842', supplier: 'Fresh Farms Ltd', items: 45, amount: 2340.50, status: 'pending', orderDate: 'Jan 24', expectedDate: 'Jan 27' },
  { id: 'PO-1841', supplier: 'Dairy Suppliers Co', items: 32, amount: 1820.00, status: 'approved', orderDate: 'Jan 23', expectedDate: 'Jan 26' },
  { id: 'PO-1840', supplier: 'Meat Masters Inc', items: 28, amount: 3450.75, status: 'received', orderDate: 'Jan 22', expectedDate: 'Jan 25' },
  { id: 'PO-1839', supplier: 'Beverage World', items: 60, amount: 4210.00, status: 'delayed', orderDate: 'Jan 21', expectedDate: 'Jan 24' },
];

export function PurchaseOrders() {
  const getStatusColor = (status: PurchaseOrder['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
      case 'approved': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
      case 'received': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'delayed': return 'bg-red-500/20 text-red-500 border-red-500/30';
    }
  };

  const getStatusIcon = (status: PurchaseOrder['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'received': return <Package className="w-4 h-4" />;
      case 'delayed': return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white text-lg font-semibold">Purchase Orders</h3>
          <p className="text-gray-400 text-sm">Track supplier orders</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg text-sm font-medium transition-all">
          <Plus className="w-4 h-4" />
          New Order
        </button>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="bg-[#0d0d0d] border border-gray-800 rounded-lg p-4 hover:bg-[#2a2a2a]/30 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="text-white font-medium text-sm mb-1">{order.id}</h4>
                <p className="text-gray-400 text-sm">{order.supplier}</p>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1 border rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
                <span className="capitalize">{order.status}</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <p className="text-gray-500 text-xs mb-1">Items</p>
                <p className="text-white text-sm font-medium">{order.items}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Amount</p>
                <p className="text-white text-sm font-medium">${order.amount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Ordered</p>
                <p className="text-white text-sm">{order.orderDate}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Expected</p>
                <p className="text-white text-sm">{order.expectedDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 bg-[#0d0d0d] hover:bg-[#2a2a2a] border border-gray-800 rounded-lg py-3 text-gray-300 text-sm transition-colors">
        View All Orders
      </button>
    </div>
  );
}
