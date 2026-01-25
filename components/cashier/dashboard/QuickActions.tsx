import { Trash2, Tag, Percent, RotateCcw, Pause, Receipt, CreditCard } from 'lucide-react';

export function QuickActions() {
  const actions = [
    { id: 'void', label: 'Void Item', icon: Trash2, color: 'text-red-500' },
    { id: 'discount', label: 'Discount', icon: Percent, color: 'text-green-500' },
    { id: 'coupon', label: 'Coupon', icon: Tag, color: 'text-blue-500' },
    { id: 'suspend', label: 'Suspend', icon: Pause, color: 'text-yellow-500' },
    { id: 'return', label: 'Return', icon: RotateCcw, color: 'text-purple-500' },
    { id: 'reprint', label: 'Reprint', icon: Receipt, color: 'text-cyan-500' },
  ];

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
      <h3 className="text-white text-lg font-semibold mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-3 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              className="bg-[#0d0d0d] hover:bg-[#2a2a2a] border border-gray-800 rounded-lg p-4 flex flex-col items-center gap-2 transition-colors group"
            >
              <Icon className={`w-6 h-6 ${action.color}`} />
              <span className="text-gray-300 text-xs text-center">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
