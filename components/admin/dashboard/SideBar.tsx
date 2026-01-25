import { Home, UserCog, Package, Users, Truck, ShoppingCart, FileText, Settings, LogOut } from 'lucide-react';
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeItem?: string;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'administrator', label: 'Administrator', icon: UserCog },
  { id: 'items', label: 'Items', icon: Package },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'suppliers', label: 'Suppliers', icon: Truck },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'invoice', label: 'Invoice', icon: FileText },
];

export function Sidebar({ activeItem = 'dashboard' }: SidebarProps) {
  return (
    <div className="w-64 bg-[#1a1a1a] h-screen flex flex-col border-r border-gray-800">
      {/* Logo */}
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-pink-600 rounded flex items-center justify-center">
          <ShoppingCart className="w-5 h-5 text-white" />
        </div>
        <span className="text-white text-xl font-semibold">M Super</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeItem;
          
          return (
            <button
              key={item.id}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors",
                isActive 
                  ? "bg-[#2a2a2a] text-white" 
                  : "text-gray-400 hover:text-white hover:bg-[#2a2a2a]/50"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-gray-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-[#2a2a2a]/50 transition-colors mb-1">
          <Settings className="w-5 h-5" />
          <span className="text-sm">Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-[#2a2a2a]/50 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Log out</span>
        </button>
      </div>
    </div>
  );
}
