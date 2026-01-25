"use client"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { date: 'Mon', sales: 12400, profit: 3500, orders: 45 },
  { date: 'Tue', sales: 15600, profit: 4200, orders: 52 },
  { date: 'Wed', sales: 18200, profit: 5100, orders: 61 },
  { date: 'Thu', sales: 14800, profit: 4000, orders: 48 },
  { date: 'Fri', sales: 21500, profit: 6200, orders: 72 },
  { date: 'Sat', sales: 28900, profit: 8400, orders: 95 },
  { date: 'Sun', sales: 25300, profit: 7100, orders: 84 },
];

export function SalesChart() {
  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white text-lg font-semibold">Sales & Revenue Analytics</h3>
          <p className="text-gray-400 text-sm">Last 7 days performance</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-medium">
            Week
          </button>
          <button className="px-3 py-1.5 bg-[#0d0d0d] hover:bg-[#2a2a2a] text-gray-400 rounded-lg text-xs transition-colors">
            Month
          </button>
          <button className="px-3 py-1.5 bg-[#0d0d0d] hover:bg-[#2a2a2a] text-gray-400 rounded-lg text-xs transition-colors">
            Year
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis 
            dataKey="date" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1a1a1a', 
              border: '1px solid #2a2a2a',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Legend 
            wrapperStyle={{ color: '#9ca3af' }}
          />
          <Area 
            type="monotone" 
            dataKey="sales" 
            stroke="#3b82f6" 
            strokeWidth={2}
            fill="url(#salesGradient)"
            name="Sales ($)"
          />
          <Area 
            type="monotone" 
            dataKey="profit" 
            stroke="#10b981" 
            strokeWidth={2}
            fill="url(#profitGradient)"
            name="Profit ($)"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-800">
        <div>
          <p className="text-gray-400 text-xs mb-1">Total Sales</p>
          <p className="text-white text-xl font-bold">$136,700</p>
          <p className="text-green-500 text-xs">+15.3% vs last week</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs mb-1">Total Profit</p>
          <p className="text-white text-xl font-bold">$38,500</p>
          <p className="text-green-500 text-xs">+12.8% vs last week</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs mb-1">Total Orders</p>
          <p className="text-white text-xl font-bold">457</p>
          <p className="text-green-500 text-xs">+8.5% vs last week</p>
        </div>
      </div>
    </div>
  );
}
