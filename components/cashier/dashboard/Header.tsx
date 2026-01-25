import { Search, Bell, Grid3x3, ChevronDown, Clock, DollarSign } from 'lucide-react';

export function Header() {
  return (
    <div className="bg-[#1a1a1a] border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Shift Info */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" />
            <div>
              <span className="text-gray-400 text-xs">Shift Started</span>
              <p className="text-white text-sm font-medium">09:00 AM</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            <div>
              <span className="text-gray-400 text-xs">Cash in Drawer</span>
              <p className="text-white text-sm font-medium">$1,250.00</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notification */}
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-4 border-l border-gray-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">AL</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white text-sm">Andy Lane</span>
              <span className="text-gray-400 text-xs">Cashier #42</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}