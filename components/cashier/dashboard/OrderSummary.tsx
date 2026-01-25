"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { ChevronDown } from 'lucide-react';

const data = [
  { date: 'Jun-15', selected: 3500, comparison: 4000 },
  { date: 'Jun-18', selected: 4200, comparison: 3800 },
  { date: 'Jun-21', selected: 3800, comparison: 4500 },
  { date: 'Jun-24', selected: 4500, comparison: 3200 },
  { date: 'Jun-27', selected: 3200, comparison: 4200 },
  { date: 'Jun-30', selected: 5500, comparison: 5000 },
  { date: 'Jul-03', selected: 4800, comparison: 3500 },
  { date: 'Jul-06', selected: 4200, comparison: 4800 },
  { date: 'Jul-09', selected: 5800, comparison: 4200 },
  { date: 'Jul-12', selected: 6200, comparison: 5500 },
  { date: 'Jul-15', selected: 5200, comparison: 3800 },
  { date: 'Nov-15', selected: 6500, comparison: 4500 },
  { date: 'Mar-11', selected: 5800, comparison: 6000 },
];

export function OrderSummaryChart() {
  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-lg font-semibold">Order Summary</h3>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
              <span className="text-gray-400 text-sm">Selected Period</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-pink-500"></div>
              <span className="text-gray-400 text-sm">Comparison</span>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0d0d0d] border border-gray-800 rounded-lg text-gray-300 text-sm hover:bg-[#2a2a2a] transition-colors">
            Last Month
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis 
              dataKey="date" 
              stroke="#666"
              tick={{ fill: '#666', fontSize: 12 }}
            />
            <YAxis 
              stroke="#666"
              tick={{ fill: '#666', fontSize: 12 }}
              ticks={[2000, 4000, 6000, 8000]}
            />
            <Line
              type="natural"
              dataKey="selected"
              stroke="#22d3ee"
              strokeWidth={3}
              dot={false}
            />
            <Line
              type="natural"
              dataKey="comparison"
              stroke="#ec4899"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
