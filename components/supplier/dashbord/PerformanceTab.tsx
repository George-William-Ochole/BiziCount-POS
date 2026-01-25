
import { Card } from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { performanceData, performanceMonthlyData } from './MockData';


export function PerformanceTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <h2 className="text-xl font-bold mb-4">Delivery Performance</h2>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={performanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1625',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">On Time (87%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm">Delayed (13%)</span>
            </div>
          </div>
        </Card>

        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <h2 className="text-xl font-bold mb-4">Performance Metrics</h2>
          <div className="space-y-4">
            <div className="bg-[#0f0a1a] rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Overall Rating</span>
                <span className="text-2xl font-bold text-yellow-400">4.8 ⭐</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>

            <div className="bg-[#0f0a1a] rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">On-Time Delivery</span>
                <span className="text-2xl font-bold text-green-400">87%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>

            <div className="bg-[#0f0a1a] rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Quality Score</span>
                <span className="text-2xl font-bold text-blue-400">92%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>

            <div className="bg-[#0f0a1a] rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Response Time</span>
                <span className="text-2xl font-bold text-purple-400">2.3 hrs</span>
              </div>
              <p className="text-sm text-gray-400">Average response to inquiries</p>
            </div>

            <div className="bg-[#0f0a1a] rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-400">Total Deliveries</span>
                <span className="text-2xl font-bold text-pink-400">342</span>
              </div>
              <p className="text-sm text-gray-400">This month: 45 deliveries</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Monthly Performance Comparison</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceMonthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1a1625',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="onTime" stroke="#22c55e" strokeWidth={2} name="On-Time %" />
            <Line type="monotone" dataKey="quality" stroke="#3b82f6" strokeWidth={2} name="Quality %" />
            <Line type="monotone" dataKey="rating" stroke="#f59e0b" strokeWidth={2} name="Rating" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
