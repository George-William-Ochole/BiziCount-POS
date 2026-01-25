import { Users, Clock, TrendingUp, Award } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'break' | 'offline';
  transactions: number;
  sales: number;
  performance: number;
}

const employees: Employee[] = [
  { id: '1', name: 'Andy Lane', role: 'Cashier #42', status: 'active', transactions: 47, sales: 2845, performance: 98 },
  { id: '2', name: 'Maria Garcia', role: 'Cashier #35', status: 'active', transactions: 52, sales: 3120, performance: 95 },
  { id: '3', name: 'John Smith', role: 'Cashier #28', status: 'break', transactions: 38, sales: 2240, performance: 92 },
  { id: '4', name: 'Lisa Chen', role: 'Cashier #41', status: 'active', transactions: 45, sales: 2680, performance: 96 },
];

export function EmployeeActivity() {
  const getStatusColor = (status: Employee['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'break': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: Employee['status']) => {
    switch (status) {
      case 'active': return 'Active';
      case 'break': return 'On Break';
      case 'offline': return 'Offline';
    }
  };

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-white text-lg font-semibold">Employee Activity</h3>
          <p className="text-gray-400 text-sm">Real-time performance tracking</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 border border-green-500/30 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-500 text-xs font-medium">4 Active</span>
        </div>
      </div>

      <div className="space-y-3">
        {employees.map((employee) => (
          <div key={employee.id} className="bg-[#0d0d0d] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">
                    {employee.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">{employee.name}</h4>
                  <p className="text-gray-400 text-xs">{employee.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 ${getStatusColor(employee.status)} rounded-full`}></div>
                <span className="text-gray-400 text-xs">{getStatusLabel(employee.status)}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-gray-500 text-xs mb-1">Transactions</p>
                <p className="text-white text-sm font-medium">{employee.transactions}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Sales</p>
                <p className="text-white text-sm font-medium">${employee.sales.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Performance</p>
                <div className="flex items-center gap-1">
                  <p className="text-green-500 text-sm font-medium">{employee.performance}%</p>
                  {employee.performance >= 95 && <Award className="w-3 h-3 text-yellow-500" />}
                </div>
              </div>
            </div>

            {/* Performance Bar */}
            <div className="mt-3">
              <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all"
                  style={{ width: `${employee.performance}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 bg-[#0d0d0d] hover:bg-[#2a2a2a] border border-gray-800 rounded-lg py-3 text-gray-300 text-sm transition-colors">
        Manage Employees
      </button>
    </div>
  );
}
