import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Menu, Search, Bell, HelpCircle } from 'lucide-react';


interface HeaderProps {
  activeTab: string;
  onToggleSidebar: () => void;
}

const tabLabels: Record<string, string> = {
  overview: 'Dashboard Overview',
  inventory: 'Inventory Control',
  products: 'Product Management',
  pricing: 'Smart Pricing',
  'purchase-orders': 'Purchase Orders',
  suppliers: 'Supplier Management',
  analytics: 'Analytics & Insights',
  reports: 'Reports',
  import: 'Bulk Import',
  export: 'Export Data',
  settings: 'Settings',
};

export function Header({ activeTab, onToggleSidebar }: HeaderProps) {
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
              {tabLabels[activeTab] || 'Manager Dashboard'}
            </h1>
            <p className="text-sm text-gray-400">Store #1 - Downtown Location</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search products, orders..."
              className="pl-10 w-64 bg-[#0f0a1a] border-gray-700"
            />
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              5
            </span>
          </Button>
          <Button variant="ghost" size="icon">
            <HelpCircle className="w-5 h-5" />
          </Button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center cursor-pointer">
            <span className="text-sm font-semibold">MJ</span>
          </div>
        </div>
      </div>
    </header>
  );
}
