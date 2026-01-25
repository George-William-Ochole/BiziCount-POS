import { Search, Bell, Grid3x3, ChevronDown, Clock, DollarSign, Download, Upload } from 'lucide-react';

export function Header() {
  return (
    <div className="bg-[#1a1a1a] border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex items-center gap-4 flex-1 max-w-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search products, suppliers, orders..."
              className="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg pl-11 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Quick Actions */}
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0d0d0d] hover:bg-[#2a2a2a] border border-gray-800 rounded-lg text-gray-300 transition-colors">
            <Upload className="w-4 h-4" />
            <span className="text-sm">Import</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0d0d0d] hover:bg-[#2a2a2a] border border-gray-800 rounded-lg text-gray-300 transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm">Export</span>
          </button>

          {/* Notification */}
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-4 border-l border-gray-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">SM</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white text-sm">Sarah Mitchell</span>
              <span className="text-gray-400 text-xs">Store Manager</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}