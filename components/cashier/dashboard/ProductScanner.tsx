"use client"
import { Search, Scan } from 'lucide-react';
import { useState } from 'react';

export function ProductScanner() {
  const [barcode, setBarcode] = useState('');

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
      <h3 className="text-white text-lg font-semibold mb-4">Scan or Search Product</h3>
      
      <div className="space-y-4">
        {/* Barcode Input */}
        <div className="relative">
          <Scan className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Scan barcode or enter manually"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            className="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search product by name"
            className="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Manual Entry */}
        <div className="grid grid-cols-3 gap-2">
          <button className="bg-[#0d0d0d] hover:bg-[#2a2a2a] border border-gray-800 rounded-lg py-3 text-white transition-colors">
            Weight Item
          </button>
          <button className="bg-[#0d0d0d] hover:bg-[#2a2a2a] border border-gray-800 rounded-lg py-3 text-white transition-colors">
            Manual Price
          </button>
          <button className="bg-[#0d0d0d] hover:bg-[#2a2a2a] border border-gray-800 rounded-lg py-3 text-white transition-colors">
            Price Check
          </button>
        </div>
      </div>
    </div>
  );
}
