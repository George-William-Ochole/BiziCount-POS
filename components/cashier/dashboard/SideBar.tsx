import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ShoppingCart,
  RotateCcw,
  DollarSign,
  Users,
  Clock,
  BarChart3,
  Settings,
  LogOut,
  Keyboard,
  Wifi,
  WifiOff,
} from 'lucide-react';


interface MenuItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: number;
}

interface SidebarProps {
  collapsed: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOffline?: boolean;
}

const menuItems: MenuItem[] = [
  { id: 'checkout', icon: ShoppingCart, label: 'Checkout' },
  { id: 'returns', icon: RotateCcw, label: 'Returns', badge: 2 },
  { id: 'transactions', icon: Clock, label: 'Transactions' },
  { id: 'customers', icon: Users, label: 'Customers' },
  { id: 'eod', icon: DollarSign, label: 'End of Day' },
  { id: 'reports', icon: BarChart3, label: 'Reports' },
  { id: 'shortcuts', icon: Keyboard, label: 'Shortcuts' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export function Sidebar({ collapsed, activeTab, onTabChange, isOffline = false }: SidebarProps) {
  return (
    <aside
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } bg-[#1a1625] border-r border-gray-800 transition-all duration-300 flex flex-col fixed h-screen z-50`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-green-600 to-emerald-600 p-2 rounded-lg">
            💰
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg">CashierPOS</h2>
              <p className="text-xs text-gray-400">Point of Sale</p>
            </div>
          )}
        </div>
      </div>

      {/* Online/Offline Status */}
      <div className={`mx-3 mt-3 p-2 rounded-lg ${isOffline ? 'bg-orange-500/20' : 'bg-green-500/20'}`}>
        <div className="flex items-center gap-2">
          {isOffline ? (
            <WifiOff className="w-4 h-4 text-orange-500" />
          ) : (
            <Wifi className="w-4 h-4 text-green-500" />
          )}
          {!collapsed && (
            <span className={`text-xs font-semibold ${isOffline ? 'text-orange-400' : 'text-green-400'}`}>
              {isOffline ? 'Offline Mode' : 'Online'}
            </span>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-green-600 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && (
                    <span className="text-sm flex-1">{item.label}</span>
                  )}
                  {!collapsed && item.badge && (
                    <Badge className="bg-red-600">{item.badge}</Badge>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-3 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-semibold">CS</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">Cashier Sarah</p>
              <p className="text-xs text-gray-400 truncate">Till #3</p>
            </div>
          )}
        </div>
        {!collapsed && (
          <Button variant="ghost" size="sm" className="w-full mt-2 text-gray-400 hover:text-white">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        )}
      </div>
    </aside>
  );
}
