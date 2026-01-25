import { Search, Bell, Grid3x3, ChevronDown } from 'lucide-react';

export function Header() {
  return (
    <div className="bg-[#1a1a1a] border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notification */}
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
          </button>

          {/* Apps Grid */}
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Grid3x3 className="w-5 h-5" />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-4 border-l border-gray-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <span className="text-white text-sm font-semibold">AL</span>
            </div>
            <span className="text-white text-sm">Andy Lane</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
