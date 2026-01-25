import { Clock } from 'lucide-react';

interface Sale {
  id: string;
  time: string;
  items: number;
  amount: number;
  paymentMethod: string;
}

const recentSales: Sale[] = [
  { id: '#1842', time: '2:45 PM', items: 8, amount: 45.67, paymentMethod: 'Card' },
  { id: '#1841', time: '2:38 PM', items: 3, amount: 12.48, paymentMethod: 'Cash' },
  { id: '#1840', time: '2:25 PM', items: 15, amount: 98.34, paymentMethod: 'Mobile' },
  { id: '#1839', time: '2:18 PM', items: 6, amount: 34.99, paymentMethod: 'Card' },
  { id: '#1838', time: '2:05 PM', items: 4, amount: 22.45, paymentMethod: 'Cash' },
];

export function RecentSales() {
  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg font-semibold">Recent Sales</h3>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Clock className="w-4 h-4" />
          <span>Last Hour</span>
        </div>
      </div>

      <div className="space-y-3">
        {recentSales.map((sale) => (
          <div key={sale.id} className="bg-[#0d0d0d] border border-gray-800 rounded-lg p-4 hover:bg-[#2a2a2a]/30 transition-colors cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-white font-medium">{sale.id}</p>
                  <p className="text-gray-400 text-sm">{sale.time}</p>
                </div>
                <div className="text-gray-400 text-sm">
                  {sale.items} items
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-semibold">${sale.amount.toFixed(2)}</p>
                <p className="text-gray-400 text-sm">{sale.paymentMethod}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 bg-[#0d0d0d] hover:bg-[#2a2a2a] border border-gray-800 rounded-lg py-3 text-gray-300 text-sm transition-colors">
        View All Transactions
      </button>
    </div>
  );
}
