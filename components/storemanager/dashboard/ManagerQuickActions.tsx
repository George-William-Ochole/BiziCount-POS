import { Package, Users, FileText, Tag, Upload, Download, TrendingUp, Calendar, DollarSign, Settings, AlertTriangle, UserPlus } from 'lucide-react';

export function ManagerQuickActions() {
  const actions = [
    { id: 'add-product', label: 'Add Product', icon: Package, color: 'from-blue-500 to-blue-600' },
    { id: 'new-order', label: 'New Order', icon: FileText, color: 'from-green-500 to-green-600' },
    { id: 'add-supplier', label: 'Add Supplier', icon: UserPlus, color: 'from-purple-500 to-purple-600' },
    { id: 'set-price', label: 'Set Pricing', icon: Tag, color: 'from-orange-500 to-orange-600' },
    { id: 'import-data', label: 'Import Data', icon: Upload, color: 'from-cyan-500 to-cyan-600' },
    { id: 'export-report', label: 'Export Report', icon: Download, color: 'from-pink-500 to-pink-600' },
    { id: 'view-analytics', label: 'Analytics', icon: TrendingUp, color: 'from-indigo-500 to-indigo-600' },
    { id: 'schedule', label: 'Schedule', icon: Calendar, color: 'from-yellow-500 to-yellow-600' },
  ];

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
      <h3 className="text-white text-lg font-semibold mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-4 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              className="bg-[#0d0d0d] hover:bg-[#2a2a2a] border border-gray-800 rounded-lg p-4 flex flex-col items-center gap-2 transition-all hover:border-gray-700 group"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-gray-300 text-xs text-center">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
