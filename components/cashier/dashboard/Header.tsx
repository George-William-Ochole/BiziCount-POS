import { Button } from '@/components/ui/button';
import { Menu, Bell, HelpCircle, Wifi, WifiOff } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onToggleSidebar: () => void;
  isOffline?: boolean;
  offlineQueueCount?: number;
}

const tabLabels: Record<string, string> = {
  checkout: 'Fast Checkout',
  returns: 'Returns & Refunds',
  transactions: 'Transactions',
  customers: 'Customer Lookup',
  eod: 'End of Day',
  reports: 'Reports',
  shortcuts: 'Keyboard Shortcuts',
  settings: 'Settings',
};

export function Header({ activeTab, onToggleSidebar, isOffline = false, offlineQueueCount = 0 }: HeaderProps) {
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
              {tabLabels[activeTab] || 'Cashier Dashboard'}
            </h1>
            <p className="text-sm text-gray-400">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isOffline && offlineQueueCount > 0 && (
            <div className="bg-orange-500/20 px-3 py-2 rounded-lg flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-orange-400">{offlineQueueCount} pending sync</span>
            </div>
          )}
          {!isOffline && (
            <div className="bg-green-500/20 px-3 py-2 rounded-lg flex items-center gap-2">
              <Wifi className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-400">Connected</span>
            </div>
          )}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </Button>
          <Button variant="ghost" size="icon">
            <HelpCircle className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2 bg-[#0f0a1a] px-3 py-2 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <span className="text-sm font-semibold">CS</span>
            </div>
            <div className="text-sm">
              <p className="font-semibold">Till #3</p>
              <p className="text-xs text-gray-400">Cashier Sarah</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
