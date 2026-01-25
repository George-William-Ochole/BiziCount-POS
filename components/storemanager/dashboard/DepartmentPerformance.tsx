"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';

const data = [
  { department: 'Dairy', sales: 18500, target: 20000, margin: 28 },
  { department: 'Produce', sales: 22300, target: 20000, margin: 35 },
  { department: 'Meat', sales: 15800, target: 18000, margin: 22 },
  { department: 'Bakery', sales: 12400, target: 15000, margin: 30 },
  { department: 'Beverages', sales: 19600, target: 18000, margin: 32 },
  { department: 'Grocery', sales: 25100, target: 24000, margin: 25 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4'];

export function DepartmentPerformance() {
  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white text-lg font-semibold">Department Performance</h3>
          <p className="text-gray-400 text-sm">Sales vs Target comparison</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-gray-400 text-xs">Sales</span>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <div className="w-3 h-3 bg-gray-600 rounded"></div>
            <span className="text-gray-400 text-xs">Target</span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
          <XAxis 
            dataKey="department" 
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
          <Bar dataKey="sales" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Sales ($)">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
          <Bar dataKey="target" fill="#4b5563" radius={[6, 6, 0, 0]} name="Target ($)" />
        </BarChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-800">
        <div>
          <p className="text-gray-400 text-xs mb-1">Best Performer</p>
          <p className="text-white text-sm font-bold">Grocery</p>
          <p className="text-green-500 text-xs">+4.6% above target</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs mb-1">Avg Margin</p>
          <p className="text-white text-sm font-bold">28.7%</p>
          <p className="text-gray-500 text-xs">Across all departments</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs mb-1">Needs Attention</p>
          <p className="text-white text-sm font-bold">Bakery</p>
          <p className="text-red-500 text-xs">-17.3% below target</p>
        </div>
      </div>
    </div>
  );
}
