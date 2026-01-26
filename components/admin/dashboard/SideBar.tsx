import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  Store,
  DollarSign,
  BarChart3,
  FileText,
  Settings,
  Shield,
  Package,
  Truck,
  Database,
  Activity,
  LogOut,
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
}

const menuItems: MenuItem[] = [
  { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
  { id: 'users', icon: Users, label: 'User Management' },
  { id: 'stores', icon: Store, label: 'Stores' },
  { id: 'financial', icon: DollarSign, label: 'Financial' },
  { id: 'inventory', icon: Package, label: 'Inventory' },
  { id: 'suppliers', icon: Truck, label: 'Suppliers' },
  { id: 'analytics', icon: BarChart3, label: 'Analytics' },
  { id: 'reports', icon: FileText, label: 'Reports' },
  { id: 'audit', icon: Activity, label: 'Audit Logs', badge: 3 },
  { id: 'permissions', icon: Shield, label: 'Permissions' },
  { id: 'system', icon: Database, label: 'System' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export function Sidebar({ collapsed, activeTab, onTabChange }: SidebarProps) {
  return (
    <aside
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } bg-[#1a1625] border-r border-gray-800 transition-all duration-300 flex flex-col fixed h-screen z-50`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="bg-linear-to-br from-purple-600 to-indigo-600 p-2 rounded-lg">
            👑
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg">SuperMarket Admin</h2>
              <p className="text-xs text-gray-400">System Control</p>
            </div>
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
                      ? 'bg-purple-600 text-white'
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
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-semibold">GA</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">George Admin</p>
              <p className="text-xs text-gray-400 truncate">Super Administrator</p>
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
