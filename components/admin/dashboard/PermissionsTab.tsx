import { Shield, CheckCircle, X } from 'lucide-react';
import { rolePermissions } from './mockData';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

export function PermissionsTab() {
  const allPermissions = [
    { id: 'all_access', name: 'Full System Access', description: 'Complete control over all features' },
    { id: 'user_management', name: 'User Management', description: 'Create, edit, and delete users' },
    { id: 'store_management', name: 'Store Management', description: 'Manage store locations and settings' },
    { id: 'financial_reports', name: 'Financial Reports', description: 'View financial data and reports' },
    { id: 'system_settings', name: 'System Settings', description: 'Configure system-wide settings' },
    { id: 'inventory_control', name: 'Inventory Control', description: 'Manage stock and inventory' },
    { id: 'purchase_orders', name: 'Purchase Orders', description: 'Create and manage purchase orders' },
    { id: 'pricing', name: 'Pricing Management', description: 'Set and update product prices' },
    { id: 'store_reports', name: 'Store Reports', description: 'View store-specific reports' },
    { id: 'employee_management', name: 'Employee Management', description: 'Manage store employees' },
    { id: 'checkout', name: 'Checkout Operations', description: 'Process sales and transactions' },
    { id: 'returns', name: 'Returns & Refunds', description: 'Process returns and refunds' },
    { id: 'customer_lookup', name: 'Customer Lookup', description: 'Access customer information' },
    { id: 'daily_reports', name: 'Daily Reports', description: 'View daily sales reports' },
    { id: 'view_orders', name: 'View Orders', description: 'View purchase orders' },
    { id: 'update_status', name: 'Update Status', description: 'Update order status' },
    { id: 'upload_documents', name: 'Upload Documents', description: 'Upload order documents' },
    { id: 'view_payments', name: 'View Payments', description: 'View payment information' },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">Roles & Permissions</h2>
        <p className="text-gray-400">Manage user roles and their access permissions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {Object.entries(rolePermissions).map(([role, permissions]) => (
          <Card key={role} className="bg-[#1a1625] border-gray-800 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold">{role}</h3>
                <p className="text-sm text-gray-400">{permissions.length} permissions</p>
              </div>
            </div>

            <div className="space-y-2">
              {allPermissions.map((permission) => {
                const hasPermission = permissions.includes(permission.id);
                return (
                  <div
                    key={permission.id}
                    className={`p-3 rounded-lg border ${
                      hasPermission ? 'bg-purple-500/10 border-purple-500/50' : 'bg-[#0f0a1a] border-gray-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {hasPermission ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <X className="w-4 h-4 text-gray-600" />
                        )}
                        <div>
                          <p className="text-sm font-semibold">{permission.name}</p>
                          <p className="text-xs text-gray-400">{permission.description}</p>
                        </div>
                      </div>
                      <Switch checked={hasPermission} />
                    </div>
                  </div>
                );
              })}
            </div>

            <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
              Save Changes
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
