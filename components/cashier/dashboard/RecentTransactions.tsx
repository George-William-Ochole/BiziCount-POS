import { ChevronDown } from 'lucide-react';

interface Transaction {
  customerName: string;
  totalPayment: number;
  date: string;
  status: 'completed' | 'pending';
}

const transactions: Transaction[] = [
  { customerName: 'Tom Johnson', totalPayment: 540, date: '11/11/2023', status: 'completed' },
  { customerName: 'Kate Morrison', totalPayment: 430, date: '11/11/2023', status: 'pending' },
  { customerName: 'Jame Sonnet', totalPayment: 250, date: '11/11/2023', status: 'completed' },
  { customerName: 'Peter Smith', totalPayment: 880, date: '10/11/2023', status: 'completed' },
];

export function RecentTransactions() {
  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white text-lg font-semibold">Recent Transactions</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#0d0d0d] border border-gray-800 rounded-lg text-gray-300 text-sm hover:bg-[#2a2a2a] transition-colors">
          Last Month
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left pb-3 text-gray-400 text-sm font-medium">Customer Name</th>
              <th className="text-left pb-3 text-gray-400 text-sm font-medium">Total Payment</th>
              <th className="text-left pb-3 text-gray-400 text-sm font-medium">Date</th>
              <th className="text-left pb-3 text-gray-400 text-sm font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="border-b border-gray-800/50">
                <td className="py-4 text-gray-300 text-sm">{transaction.customerName}</td>
                <td className="py-4 text-gray-300 text-sm">$ {transaction.totalPayment}</td>
                <td className="py-4 text-gray-300 text-sm">{transaction.date}</td>
                <td className="py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded text-xs font-medium ${
                      transaction.status === 'completed'
                        ? 'text-green-500 bg-green-500/10'
                        : 'text-orange-500 bg-orange-500/10'
                    }`}
                  >
                    {transaction.status === 'completed' ? 'Completed' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
