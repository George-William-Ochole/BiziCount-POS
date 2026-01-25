import { Apple, Milk, Beef, Coffee, ShoppingBag, Carrot } from 'lucide-react';

export function QuickProductsGrid() {
  const quickProducts = [
    { id: '1', name: 'Fruits', icon: Apple, color: 'from-red-500 to-red-600' },
    { id: '2', name: 'Dairy', icon: Milk, color: 'from-blue-400 to-blue-500' },
    { id: '3', name: 'Meat', icon: Beef, color: 'from-red-600 to-red-700' },
    { id: '4', name: 'Beverages', icon: Coffee, color: 'from-amber-600 to-amber-700' },
    { id: '5', name: 'Vegetables', icon: Carrot, color: 'from-green-500 to-green-600' },
    { id: '6', name: 'Grocery', icon: ShoppingBag, color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl p-6">
      <h3 className="text-white text-lg font-semibold mb-4">Quick Categories</h3>
      
      <div className="grid grid-cols-3 gap-3">
        {quickProducts.map((product) => {
          const Icon = product.icon;
          return (
            <button
              key={product.id}
              className="bg-[#0d0d0d] hover:bg-[#2a2a2a] border border-gray-800 rounded-lg p-4 flex flex-col items-center gap-2 transition-colors group"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${product.color} rounded-lg flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-gray-300 text-xs text-center">{product.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
