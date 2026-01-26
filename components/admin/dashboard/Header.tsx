import { Menu, Search, Bell, HelpCircle} from 'lucide-react';

import { systemHealth } from './mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  activeTab: string;
  onToggleSidebar: () => void;
  notificationCount?: number;
}

const tabLabels: Record<string, string> = {
  overview: 'System Overview',
  users: 'User Management',
  stores: 'Store Management',
  financial: 'Financial Dashboard',
  inventory: 'Inventory Management',
  suppliers: 'Supplier Management',
  analytics: 'Business Analytics',
  reports: 'Reports & Exports',
  audit: 'Audit Logs',
  permissions: 'Roles & Permissions',
  system: 'System Settings',
  settings: 'General Settings',
};

export function Header({ activeTab, onToggleSidebar, notificationCount = 3 }: HeaderProps) {
  return (
    <header className="bg-[#1a1625] border-b border-gray-800 px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {tabLabels[activeTab] || 'Admin Dashboard'}
            </h1>
            <p className="text-sm text-gray-400">
              Full system control and monitoring
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search anything..."
              className="pl-10 w-64 bg-[#0f0a1a] border-gray-700"
            />
          </div>
          
          {/* System Health Indicator */}
          <div className="bg-green-500/20 px-3 py-2 rounded-lg flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-400 hidden lg:block">System Healthy</span>
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </Button>
          <Button variant="ghost" size="icon">
            <HelpCircle className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2 bg-[#0f0a1a] px-3 py-2 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
              <span className="text-sm font-semibold">GA</span>
            </div>
            <div className="text-sm hidden lg:block">
              <p className="font-semibold">George Admin</p>
              <p className="text-xs text-gray-400">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
