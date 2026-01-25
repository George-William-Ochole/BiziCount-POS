"use client"
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';

const data = [
  { name: 'Grocery', value: 43, color: '#fb923c' },
  { name: 'Fruits', value: 11, color: '#22d3ee' },
  { name: 'Vegetables', value: 15, color: '#a3e635' },
  { name: 'Others', value: 31, color: '#ec4899' },
];

export function TopCategoriesChart() {
  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-lg font-semibold">Top Categories</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#0d0d0d] border border-gray-800 rounded-lg text-gray-300 text-sm hover:bg-[#2a2a2a] transition-colors">
          Last Month
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="h-64 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-gray-400 text-sm">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
