import { useState } from 'react';
import { Scan, Search, Plus, Minus, Trash2, Tag, DollarSign, CreditCard, Smartphone, Split, Printer, Mail, MessageSquare, X, ShoppingCart } from 'lucide-react';
import { productCatalog } from './mockData';
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
  barcode: string;
}

export function CheckoutTab() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const addToCart = (product: typeof productCatalog[0]) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        barcode: product.barcode,
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
    const product = productCatalog.find(p => p.barcode === barcode);
    if (product) {
      addToCart(product);
      setBarcodeInput('');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  const clearCart = () => {
    setCartItems([]);
    setDiscount(0);
  };

  const filteredProducts = productCatalog.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.barcode.includes(searchQuery)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-180px)]">
      {/* Left - Product Selection */}
      <Card className="lg:col-span-2 bg-[#1a1625] border-gray-800 p-6 overflow-hidden flex flex-col">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-3">Product Selection</h2>
          
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
                autoFocus
              />
            </div>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => handleBarcodeSearch(barcodeInput)}
            >
              <Scan className="w-4 h-4 mr-2" />
              Scan
            </Button>
          </div>

          {/* Product Search */}
          <div className="relative">
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => addToCart(product)}
                className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-4 hover:border-green-500/50 transition-colors cursor-pointer"
              >
                <div className="mb-2">
                  <p className="font-semibold text-sm">{product.name}</p>
                  <p className="text-xs text-gray-400">{product.barcode}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-400">Ush {product.price.toFixed(2)}</span>
                  <Badge variant={product.stock < 20 ? 'destructive' : 'secondary'} className="text-xs">
                    {product.stock} left
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Right - Cart & Payment */}
      <Card className="bg-[#1a1625] border-gray-800 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Shopping Cart</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearCart}
            className="text-red-500 hover:text-red-400"
          >
            Clear All
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-2">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Cart is empty</p>
              <p className="text-xs">Scan or add products to start</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-3"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400">Ush {item.price.toFixed(2)} each</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-red-500"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 border-gray-700"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 border-gray-700"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                  <span className="font-bold text-green-400">
                    Ush {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Discount */}
        <div className="bg-[#0f0a1a] rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-4 h-4 text-yellow-500" />
            <label className="text-sm font-semibold">Discount %</label>
          </div>
          <Input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(Math.max(0, Math.min(100, Number(e.target.value))))}
            className="bg-[#1a1625] border-gray-700"
            placeholder="0"
          />
        </div>

        {/* Totals */}
        <div className="bg-[#0f0a1a] rounded-lg p-4 mb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Subtotal:</span>
            <span className="font-semibold">Ush {subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Discount ({discount}%):</span>
              <span className="font-semibold text-yellow-500">-Ush {discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="border-t border-gray-700 pt-2 flex justify-between">
            <span className="font-bold text-lg">Total:</span>
            <span className="font-bold text-2xl text-green-400">Ush {total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button 
            className="bg-green-600 hover:bg-green-700"
            disabled={cartItems.length === 0}
            onClick={() => {
              setPaymentMethod('cash');
              setShowPaymentModal(true);
            }}
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Cash
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            disabled={cartItems.length === 0}
            onClick={() => {
              setPaymentMethod('card');
              setShowPaymentModal(true);
            }}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Card
          </Button>
          <Button 
            className="bg-yellow-600 hover:bg-yellow-700"
            disabled={cartItems.length === 0}
            onClick={() => {
              setPaymentMethod('mtn');
              setShowPaymentModal(true);
            }}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            MTN
          </Button>
          <Button 
            className="bg-red-600 hover:bg-red-700"
            disabled={cartItems.length === 0}
            onClick={() => {
              setPaymentMethod('airtel');
              setShowPaymentModal(true);
            }}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Airtel
          </Button>
        </div>
        <Button 
          variant="outline"
          className="w-full mt-2 border-gray-700"
          disabled={cartItems.length === 0}
          onClick={() => {
            setPaymentMethod('split');
            setShowPaymentModal(true);
          }}
        >
          <Split className="w-4 h-4 mr-2" />
          Split Payment
        </Button>
      </Card>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <Card className="bg-[#1a1625] border-gray-800 p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Complete Payment</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPaymentModal(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="bg-[#0f0a1a] rounded-lg p-4">
                <p className="text-gray-400 mb-1">Amount Due</p>
                <p className="text-3xl font-bold text-green-400">Ush {total.toFixed(2)}</p>
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Payment Method</label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="bg-[#0f0a1a] border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1625] border-gray-700">
                    <SelectItem value="cash" className="hover:bg-[#2a2535] focus:bg-[#2a2535]">Cash</SelectItem>
                    <SelectItem value="card" className="hover:bg-[#2a2535] focus:bg-[#2a2535]">Card</SelectItem>
                    <SelectItem value="mtn" className="hover:bg-[#2a2535] focus:bg-[#2a2535]">MTN Money</SelectItem>
                    <SelectItem value="airtel" className="hover:bg-[#2a2535] focus:bg-[#2a2535]">Airtel Money</SelectItem>
                    <SelectItem value="split" className="hover:bg-[#2a2535] focus:bg-[#2a2535]">Split Payment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {paymentMethod === 'cash' && (
                <div>
                  <label className="text-sm font-semibold mb-2 block">Cash Tendered</label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    className="bg-[#0f0a1a] border-gray-700"
                  />
                </div>
              )}

              {(paymentMethod === 'mtn' || paymentMethod === 'airtel') && (
                <div>
                  <label className="text-sm font-semibold mb-2 block">Phone Number</label>
                  <Input
                    placeholder="+256 700 000000"
                    className="bg-[#0f0a1a] border-gray-700"
                  />
                </div>
              )}

              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-800">
                <Button
                  variant="outline"
                  className="border-gray-700"
                  onClick={() => {
                    console.log('Print receipt');
                    clearCart();
                    setShowPaymentModal(false);
                  }}
                >
                  <Printer className="w-4 h-4 mr-1" />
                  Print
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700"
                  onClick={() => {
                    console.log('Email receipt');
                    clearCart();
                    setShowPaymentModal(false);
                  }}
                >
                  <Mail className="w-4 h-4 mr-1" />
                  Email
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700"
                  onClick={() => {
                    console.log('SMS receipt');
                    clearCart();
                    setShowPaymentModal(false);
                  }}
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  SMS
                </Button>
              </div>

              <Button
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => {
                  console.log('Payment completed');
                  clearCart();
                  setShowPaymentModal(false);
                }}
              >
                Complete Transaction
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
