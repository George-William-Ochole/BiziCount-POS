import { X, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  barcode: string;
}

export function POSCart() {
  const [items, setItems] = useState<CartItem[]>([
    { id: '1', name: 'Fresh Milk 1L', price: 3.99, quantity: 2, barcode: '123456789' },
    { id: '2', name: 'White Bread', price: 2.49, quantity: 1, barcode: '987654321' },
    { id: '3', name: 'Bananas (1kg)', price: 1.99, quantity: 3, barcode: '456789123' },
    { id: '4', name: 'Orange Juice 2L', price: 5.99, quantity: 1, barcode: '789123456' },
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-xl h-full flex flex-col">
      {/* Cart Header */}
      <div className="p-4 border-b border-gray-800">
        <h3 className="text-white text-lg font-semibold">Current Transaction</h3>
        <p className="text-gray-400 text-sm">Transaction #1842</p>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-[#0d0d0d] border border-gray-800 rounded-lg p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="text-white text-sm font-medium">{item.name}</h4>
                <p className="text-gray-400 text-xs">{item.barcode}</p>
              </div>
              <button 
                onClick={() => removeItem(item.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-6 h-6 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded flex items-center justify-center text-white transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-white text-sm w-8 text-center">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-6 h-6 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded flex items-center justify-center text-white transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-xs">${item.price.toFixed(2)} each</p>
                <p className="text-white font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Total */}
      <div className="p-4 border-t border-gray-800 space-y-2">
        <div className="flex justify-between text-gray-400 text-sm">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-400 text-sm">
          <span>Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-white text-xl font-bold pt-2 border-t border-gray-800">
          <span>Total</span>
          <span className="text-green-500">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
