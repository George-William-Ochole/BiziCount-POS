import { AlertTriangle, Clock, AlertCircle, Package } from 'lucide-react';

interface Alert {
  id: string;
  type: 'low-stock' | 'expiring' | 'expired' | 'reorder';
  product: string;
  category: string;
  quantity?: number;
  expiryDate?: string;
  reorderPoint?: number;
}

const alerts: Alert[] = [
  { id: '1', type: 'expired', product: 'Organic Yogurt 500ml', category: 'Dairy', expiryDate: 'Jan 24, 2026' },
  { id: '2', type: 'low-stock', product: 'Fresh Milk 1L', category: 'Dairy', quantity: 8, reorderPoint: 50 },
  { id: '3', type: 'expiring', product: 'Whole Wheat Bread', category: 'Bakery', expiryDate: 'Jan 26, 2026' },
  { id: '4', type: 'low-stock', product: 'Premium Coffee Beans', category: 'Beverages', quantity: 5, reorderPoint: 30 },
  { id: '5', type: 'reorder', product: 'Olive Oil 500ml', category: 'Cooking', quantity: 12, reorderPoint: 25 },
];

export function InventoryAlerts() {
  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'expired': return 'border-red-500 bg-red-500/10';
      case 'expiring': return 'border-orange-500 bg-orange-500/10';
      case 'low-stock': return 'border-yellow-500 bg-yellow-500/10';
      case 'reorder': return 'border-blue-500 bg-blue-500/10';
    }
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'expired': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'expiring': return <Clock className="w-5 h-5 text-orange-500" />;
      case 'low-stock': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'reorder': return <Package className="w-5 h-5 text-blue-500" />;
    }
  };

  const getAlertLabel = (type: Alert['type']) => {
    switch (type) {
      case 'expired': return 'Expired';
      case 'expiring': return 'Expiring Soon';
      case 'low-stock': return 'Low Stock';
      case 'reorder': return 'Reorder Point';
    }
  };

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg font-semibold">Inventory Alerts</h3>
        <span className="px-3 py-1 bg-red-500/20 text-red-500 rounded-full text-xs font-medium">
          {alerts.length} Issues
        </span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className={`border rounded-lg p-4 ${getAlertColor(alert.type)}`}>
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h4 className="text-white font-medium text-sm">{alert.product}</h4>
                    <p className="text-gray-400 text-xs">{alert.category}</p>
                  </div>
                  <span className="text-xs text-gray-400">{getAlertLabel(alert.type)}</span>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  {alert.quantity !== undefined && (
                    <span className="text-xs text-gray-300">
                      Stock: <span className="font-medium">{alert.quantity} units</span>
                    </span>
                  )}
                  {alert.expiryDate && (
                    <span className="text-xs text-gray-300">
                      Expires: <span className="font-medium">{alert.expiryDate}</span>
                    </span>
                  )}
                  {alert.reorderPoint && (
                    <span className="text-xs text-gray-300">
                      Reorder at: <span className="font-medium">{alert.reorderPoint}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 bg-[#0d0d0d] hover:bg-[#2a2a2a] border border-gray-800 rounded-lg py-3 text-gray-300 text-sm transition-colors">
        View All Alerts
      </button>
    </div>
  );
}
