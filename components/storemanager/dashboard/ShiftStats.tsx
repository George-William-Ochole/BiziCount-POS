import { Receipt, DollarSign, Users, TrendingUp } from 'lucide-react';

export function ShiftStats() {
  const stats = [
    { id: 'transactions', label: 'Transactions', value: '47', icon: Receipt, color: 'text-cyan-400' },
    { id: 'total-sales', label: 'Total Sales', value: '$2,845', icon: DollarSign, color: 'text-green-500' },
    { id: 'customers', label: 'Customers Served', value: '42', icon: Users, color: 'text-purple-400' },
    { id: 'avg-sale', label: 'Avg. Sale', value: '$60.53', icon: TrendingUp, color: 'text-orange-400' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.id} className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <h3 className={`text-2xl font-bold ${stat.color}`}>{stat.value}</h3>
              </div>
              <Icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
