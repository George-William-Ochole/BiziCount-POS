import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, AlertTriangle, ArrowUpRight } from 'lucide-react';

export function ManagerStats() {
  const stats = [
    { 
      id: 'revenue', 
      label: 'Today\'s Revenue', 
      value: '$18,450', 
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign, 
      color: 'text-green-500',
      bgColor: 'from-green-500/20 to-green-600/20'
    },
    { 
      id: 'transactions', 
      label: 'Transactions', 
      value: '342', 
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart, 
      color: 'text-blue-500',
      bgColor: 'from-blue-500/20 to-blue-600/20'
    },
    { 
      id: 'customers', 
      label: 'Customers Served', 
      value: '289', 
      change: '+5.1%',
      trend: 'up',
      icon: Users, 
      color: 'text-purple-500',
      bgColor: 'from-purple-500/20 to-purple-600/20'
    },
    { 
      id: 'inventory', 
      label: 'Total Products', 
      value: '2,845', 
      change: '12 low stock',
      trend: 'warning',
      icon: Package, 
      color: 'text-cyan-500',
      bgColor: 'from-cyan-500/20 to-cyan-600/20'
    },
    { 
      id: 'avg-basket', 
      label: 'Avg Basket Size', 
      value: '$53.95', 
      change: '+3.2%',
      trend: 'up',
      icon: TrendingUp, 
      color: 'text-orange-500',
      bgColor: 'from-orange-500/20 to-orange-600/20'
    },
    { 
      id: 'profit-margin', 
      label: 'Profit Margin', 
      value: '28.4%', 
      change: '-1.2%',
      trend: 'down',
      icon: ArrowUpRight, 
      color: 'text-pink-500',
      bgColor: 'from-pink-500/20 to-pink-600/20'
    },
    { 
      id: 'pending-orders', 
      label: 'Pending Orders', 
      value: '15', 
      change: '8 suppliers',
      trend: 'neutral',
      icon: Package, 
      color: 'text-yellow-500',
      bgColor: 'from-yellow-500/20 to-yellow-600/20'
    },
    { 
      id: 'alerts', 
      label: 'Critical Alerts', 
      value: '7', 
      change: '3 expiring',
      trend: 'warning',
      icon: AlertTriangle, 
      color: 'text-red-500',
      bgColor: 'from-red-500/20 to-red-600/20'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.id} className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-5 hover:bg-[#1a1a1a]/80 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              {stat.trend === 'up' && (
                <div className="flex items-center gap-1 text-green-500 text-xs">
                  <TrendingUp className="w-3 h-3" />
                  <span>{stat.change}</span>
                </div>
              )}
              {stat.trend === 'down' && (
                <div className="flex items-center gap-1 text-red-500 text-xs">
                  <TrendingDown className="w-3 h-3" />
                  <span>{stat.change}</span>
                </div>
              )}
              {stat.trend === 'warning' && (
                <div className="flex items-center gap-1 text-yellow-500 text-xs">
                  <AlertTriangle className="w-3 h-3" />
                </div>
              )}
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
              <h3 className={`text-2xl font-bold ${stat.color}`}>{stat.value}</h3>
              {(stat.trend === 'warning' || stat.trend === 'neutral') && (
                <p className="text-gray-500 text-xs mt-1">{stat.change}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
