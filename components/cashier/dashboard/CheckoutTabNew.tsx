'use client';

import { useState, useEffect } from 'react';
import { Scan, Search, Plus, Minus, Trash2, DollarSign, CreditCard, Smartphone, Split, X, ShoppingCart } from 'lucide-react';
import { useTransactions } from '@/hooks/useTransactions';
import { useProducts } from '@/hooks/useProducts';
import { useCustomers } from '@/hooks/useCustomers';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  productId: string;
}

export function CheckoutTabNew() {
  const storeId = 'store-1'; // Would come from session/context
  const userId = 'user-1'; // Would come from session/context
  
  const { products, loading: productsLoading } = useProducts();
  const { createTransaction } = useTransactions(storeId);
  const { customers } = useCustomers();
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [discount, setDiscount] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('CASH');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addToCart = (product: any) => {
    const existingItem = cartItems.find(item => item.productId === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: `${Date.now()}`,
        name: product.name,
        price: product.retailPrice,
        quantity: 1,
        productId: product.id,
      }]);
    }
  };

  const updateQuantity = (id: string, change: number) => {
    setCartItems(cartItems.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleBarcodeSearch = (barcode: string) => {
    const product = products.find((p: any) => p.barcode === barcode);
    if (product) {
      addToCart(product);
      setBarcodeInput('');
    } else {
      setError('Product not found');
      setTimeout(() => setError(null), 3000);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      setError('Cart is empty');
      return;
    }

    setIsProcessing(true);
    try {
      const transactionData = {
        storeId,
        userId,
        customerId: selectedCustomer || null,
        totalAmount: total,
        payment: paymentMethod,
        items: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.price,
          totalPrice: item.price * item.quantity,
        })),
      };

      await createTransaction(transactionData);
      
      // Clear cart
      setCartItems([]);
      setDiscount(0);
      setSelectedCustomer('');
      setShowPaymentModal(false);
      
      alert('Transaction completed successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to complete transaction');
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredProducts = products.filter((product: any) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.includes(searchQuery)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-180px)]">
      {/* Left - Product Selection */}
      <Card className="lg:col-span-2 bg-[#1a1625] border-gray-800 p-6 overflow-hidden flex flex-col">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-3">Product Selection</h2>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-400 p-2 rounded mb-3 text-sm">
              {error}
            </div>
          )}
          
          {/* Barcode Scanner Input */}
          <div className="flex gap-2 mb-3">
            <div className="flex-1 relative">
              <Scan className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Scan or enter barcode..."
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && barcodeInput) {
                    handleBarcodeSearch(barcodeInput);
                  }
                }}
                className="pl-10 bg-[#0f0a1a] border-gray-700"
              />
            </div>
          </div>

          {/* Search Products */}
          <div className="relative mb-3">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#0f0a1a] border-gray-700"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            {productsLoading ? (
              <div className="col-span-2 text-center text-gray-400 py-8">Loading products...</div>
            ) : (
              filteredProducts.map((product: any) => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-3 hover:border-blue-500 transition-colors text-left"
                >
                  <p className="font-semibold text-sm mb-1">{product.name}</p>
                  <p className="text-xs text-gray-400 mb-2">{product.sku}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 font-bold">${product.retailPrice.toFixed(2)}</span>
                    <Badge variant="secondary">{product.stock} in stock</Badge>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </Card>

      {/* Right - Cart and Payment */}
      <div className="flex flex-col gap-4">
        {/* Cart */}
        <Card className="bg-[#1a1625] border-gray-800 p-6 flex-1 overflow-hidden flex flex-col">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Cart ({cartItems.length})
          </h2>

          <div className="flex-1 overflow-y-auto space-y-2 mb-4">
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-400 py-8">Cart is empty</div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-400">${item.price.toFixed(2)}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFromCart(item.id)}
                      className="h-6 w-6 p-0"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 w-6 p-0 border-gray-700"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="text-sm font-semibold flex-1 text-center">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 w-6 p-0 border-gray-700"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Discount */}
          <div className="border-t border-gray-800 pt-4">
            <div className="mb-3">
              <label className="text-sm text-gray-400 mb-1 block">Discount %</label>
              <Input
                type="number"
                placeholder="0"
                value={discount}
                onChange={(e) => setDiscount(Math.max(0, parseFloat(e.target.value) || 0))}
                className="bg-[#0f0a1a] border-gray-700"
                min="0"
                max="100"
              />
            </div>

            {/* Customer Selection */}
            <div className="mb-3">
              <label className="text-sm text-gray-400 mb-1 block">Loyalty Customer</label>
              <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                <SelectTrigger className="bg-[#0f0a1a] border-gray-700">
                  <SelectValue placeholder="Select customer..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {customers.map((customer: any) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name} ({customer.tier})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Discount ({discount}%):</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold border-t border-gray-800 pt-2 mt-2">
                <span>Total:</span>
                <span className="text-blue-400">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="border-t border-gray-800 pt-4 mt-4 space-y-2">
            <label className="text-sm text-gray-400 block">Payment Method</label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod}>
              <SelectTrigger className="bg-[#0f0a1a] border-gray-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CASH">Cash</SelectItem>
                <SelectItem value="MTN_MONEY">MTN Mobile Money</SelectItem>
                <SelectItem value="AIRTEL_MONEY">Airtel Money</SelectItem>
                <SelectItem value="CARD">Card</SelectItem>
                <SelectItem value="SPLIT">Split Payment</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={() => setShowPaymentModal(true)}
              disabled={cartItems.length === 0 || isProcessing}
              className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : 'Complete Sale'}
            </Button>
            <Button
              onClick={() => setCartItems([])}
              variant="outline"
              className="w-full border-gray-700"
            >
              Clear Cart
            </Button>
          </div>
        </Card>
      </div>

      {/* Payment Confirmation Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="bg-[#1a1625] border-gray-800 p-8 w-96">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Confirm Payment</h2>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowPaymentModal(false)}
                className="h-6 w-6 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount:</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold border-t border-gray-800 pt-2 mt-2">
                  <span>Total Amount:</span>
                  <span className="text-blue-400">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm pt-2">
                  <span className="text-gray-400">Payment Method:</span>
                  <span>{paymentMethod.replace(/_/g, ' ')}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {isProcessing ? 'Processing...' : 'Confirm'}
              </Button>
              <Button
                onClick={() => setShowPaymentModal(false)}
                variant="outline"
                className="flex-1 border-gray-700"
                disabled={isProcessing}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
