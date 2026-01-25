import { Button } from '@/components/ui/button';
import React from 'react';
import {
  Home,
  ShoppingCart,
  DollarSign,
  Package,
  BarChart3,
  MessageSquare,
  FileText,
  Users,
  Settings,
  LogOut,
} from 'lucide-react';


interface MenuItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

interface SidebarProps {
  collapsed: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems: MenuItem[] = [
  { id: 'overview', icon: Home, label: 'Overview' },
  { id: 'orders', icon: ShoppingCart, label: 'Orders' },
  { id: 'payments', icon: DollarSign, label: 'Payments' },
  { id: 'products', icon: Package, label: 'Products' },
  { id: 'performance', icon: BarChart3, label: 'Performance' },
  { id: 'communication', icon: MessageSquare, label: 'Messages' },
  { id: 'documents', icon: FileText, label: 'Documents' },
  { id: 'customers', icon: Users, label: 'Customers' },
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
          <div className="bg-gradient-to-br from-pink-600 to-purple-600 p-2 rounded-lg">
            🚚
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg">SupplyChain</h2>
              <p className="text-xs text-gray-400">Supplier Portal</p>
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
                      ? 'bg-pink-600 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span className="text-sm">{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-3 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-semibold">SP</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate">Supplier Pro</p>
              <p className="text-xs text-gray-400 truncate">supplier@example.com</p>
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
