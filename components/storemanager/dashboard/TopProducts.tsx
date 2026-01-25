import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  sold: number;
  revenue: number;
  profit: number;
  margin: number;
  trend: 'up' | 'down';
  change: number;
}

const products: Product[] = [
  { id: '1', name: 'Fresh Milk 1L', category: 'Dairy', sold: 342, revenue: 1365.18, profit: 341.30, margin: 25, trend: 'up', change: 12.5 },
  { id: '2', name: 'White Bread', category: 'Bakery', sold: 289, revenue: 719.61, profit: 179.90, margin: 25, trend: 'up', change: 8.3 },
  { id: '3', name: 'Bananas (1kg)', category: 'Produce', sold: 425, revenue: 845.75, profit: 253.73, margin: 30, trend: 'up', change: 15.2 },
  { id: '4', name: 'Orange Juice 2L', category: 'Beverages', sold: 198, revenue: 1186.02, profit: 355.81, margin: 30, trend: 'down', change: -3.4 },
  { id: '5', name: 'Ground Beef 500g', category: 'Meat', sold: 167, revenue: 1336.33, profit: 267.27, margin: 20, trend: 'up', change: 6.8 },
  { id: '6', name: 'Premium Coffee', category: 'Beverages', sold: 145, revenue: 1450.55, profit: 435.17, margin: 30, trend: 'up', change: 9.1 },
];

export function TopProducts() {
  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white text-lg font-semibold">Top Performing Products</h3>
          <p className="text-gray-400 text-sm">Fast-moving items analysis</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#0d0d0d] hover:bg-[#2a2a2a] border border-gray-800 rounded-lg text-gray-300 text-sm transition-colors">
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-gray-400 text-xs font-medium py-3 px-2">Product</th>
              <th className="text-left text-gray-400 text-xs font-medium py-3 px-2">Category</th>
              <th className="text-right text-gray-400 text-xs font-medium py-3 px-2">Units Sold</th>
              <th className="text-right text-gray-400 text-xs font-medium py-3 px-2">Revenue</th>
              <th className="text-right text-gray-400 text-xs font-medium py-3 px-2">Profit</th>
              <th className="text-right text-gray-400 text-xs font-medium py-3 px-2">Margin</th>
              <th className="text-right text-gray-400 text-xs font-medium py-3 px-2">Trend</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="border-b border-gray-800/50 hover:bg-[#2a2a2a]/30 transition-colors">
                <td className="py-4 px-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-xs">#{index + 1}</span>
                    <div>
                      <p className="text-white text-sm font-medium">{product.name}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-2">
                  <span className="px-2 py-1 bg-[#0d0d0d] border border-gray-800 rounded text-gray-300 text-xs">
                    {product.category}
                  </span>
                </td>
                <td className="py-4 px-2 text-right">
                  <span className="text-white text-sm font-medium">{product.sold}</span>
                </td>
                <td className="py-4 px-2 text-right">
                  <span className="text-white text-sm">${product.revenue.toFixed(2)}</span>
                </td>
                <td className="py-4 px-2 text-right">
                  <span className="text-green-500 text-sm font-medium">${product.profit.toFixed(2)}</span>
                </td>
                <td className="py-4 px-2 text-right">
                  <span className="text-gray-300 text-sm">{product.margin}%</span>
                </td>
                <td className="py-4 px-2 text-right">
                  <div className={`flex items-center justify-end gap-1 ${product.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {product.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span className="text-xs font-medium">{Math.abs(product.change)}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
