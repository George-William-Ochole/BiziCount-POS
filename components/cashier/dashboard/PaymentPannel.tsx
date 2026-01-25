import { CreditCard, DollarSign, Smartphone, Wallet } from 'lucide-react';

export function PaymentPanel() {
  const paymentMethods = [
    { id: 'cash', label: 'Cash', icon: DollarSign, color: 'from-green-500 to-green-600' },
    { id: 'card', label: 'Card', icon: CreditCard, color: 'from-blue-500 to-blue-600' },
    { id: 'mobile', label: 'Mobile Pay', icon: Smartphone, color: 'from-purple-500 to-purple-600' },
    { id: 'wallet', label: 'E-Wallet', icon: Wallet, color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
      <h3 className="text-white text-lg font-semibold mb-4">Payment Method</h3>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <button
              key={method.id}
              className="bg-[#0d0d0d] hover:bg-[#2a2a2a] border border-gray-800 rounded-lg p-4 flex flex-col items-center gap-2 transition-all hover:border-gray-700 group"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-full flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-gray-300 text-sm">{method.label}</span>
            </button>
          );
        })}
      </div>

      {/* Amount Input */}
      <div className="space-y-3">
        <div>
          <label className="text-gray-400 text-sm mb-2 block">Amount Tendered</label>
          <input
            type="text"
            placeholder="$0.00"
            className="w-full bg-[#0d0d0d] border border-gray-800 rounded-lg px-4 py-3 text-white text-xl text-center focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
        
        <button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-lg py-4 font-semibold text-lg transition-all">
          Complete Transaction
        </button>
      </div>
    </div>
  );
}
