// Mock data for the cashier dashboard

export const recentTransactions = [
  { id: 'TXN-001', time: '10:30 AM', items: 5, total: 45.50, payment: 'Cash', status: 'completed' },
  { id: 'TXN-002', time: '10:45 AM', items: 3, total: 28.00, payment: 'MTN Money', status: 'completed' },
  { id: 'TXN-003', time: '11:15 AM', items: 8, total: 67.25, payment: 'Card', status: 'completed' },
  { id: 'TXN-004', time: '11:30 AM', items: 2, total: 15.00, payment: 'Airtel Money', status: 'completed' },
  { id: 'TXN-005', time: '11:45 AM', items: 4, total: 52.75, payment: 'Split', status: 'completed' },
];

export const productCatalog = [
  { id: 'PRD-001', name: 'Coca Cola 500ml', barcode: '5449000000996', price: 2.50, stock: 150, category: 'Beverages' },
  { id: 'PRD-002', name: 'White Bread', barcode: '1234567890123', price: 3.25, stock: 45, category: 'Bakery' },
  { id: 'PRD-003', name: 'Fresh Milk 1L', barcode: '9876543210987', price: 4.50, stock: 80, category: 'Dairy' },
  { id: 'PRD-004', name: 'Rice 5kg', barcode: '5555555555555', price: 12.00, stock: 30, category: 'Grains' },
  { id: 'PRD-005', name: 'Cooking Oil 2L', barcode: '7777777777777', price: 8.75, stock: 25, category: 'Oils' },
  { id: 'PRD-006', name: 'Sugar 2kg', barcode: '8888888888888', price: 5.50, stock: 60, category: 'Sweeteners' },
];

export const customerLoyalty = [
  { id: 'CUST-001', name: 'Moses Peter', phone: '+256 700 123456', points: 450, tier: 'Gold', totalSpent: 1250 },
  { id: 'CUST-002', name: 'Yafet', phone: '+256 700 234567', points: 280, tier: 'Silver', totalSpent: 780 },
  { id: 'CUST-003', name: 'Mohamed Johnson', phone: '+256 700 345678', points: 150, tier: 'Bronze', totalSpent: 420 },
  { id: 'CUST-004', name: 'Alice Williams', phone: '+256 700 456789', points: 620, tier: 'Platinum', totalSpent: 2100 },
];

export const pendingReturns = [
  { id: 'RET-001', txnId: 'TXN-087', customer: 'Mary Jones', items: 2, amount: 18.50, reason: 'Defective product', status: 'pending' },
  { id: 'RET-002', txnId: 'TXN-092', customer: 'Peter Brown', items: 1, amount: 12.00, reason: 'Wrong item', status: 'pending' },
];

export const todaySummary = {
  totalSales: 1247.50,
  transactions: 45,
  averageBasket: 27.72,
  cashSales: 520.00,
  mobilePayments: 430.50,
  cardPayments: 297.00,
  returns: 25.00,
  discounts: 18.50,
};

export const hourlyData = [
  { hour: '8am', sales: 45 },
  { hour: '9am', sales: 89 },
  { hour: '10am', sales: 134 },
  { hour: '11am', sales: 167 },
  { hour: '12pm', sales: 201 },
  { hour: '1pm', sales: 178 },
  { hour: '2pm', sales: 156 },
  { hour: '3pm', sales: 189 },
  { hour: '4pm', sales: 88 },
];

export const paymentMethodsData = [
  { name: 'Cash', value: 520, color: '#22c55e' },
  { name: 'MTN Money', value: 280, color: '#eab308' },
  { name: 'Airtel Money', value: 150.50, color: '#ef4444' },
  { name: 'Card', value: 297, color: '#3b82f6' },
];

export const keyboardShortcuts = [
  { key: 'F1', action: 'New Sale' },
  { key: 'F2', action: 'Customer Lookup' },
  { key: 'F3', action: 'Product Search' },
  { key: 'F4', action: 'Apply Discount' },
  { key: 'F5', action: 'Cash Payment' },
  { key: 'F6', action: 'Mobile Money' },
  { key: 'F7', action: 'Card Payment' },
  { key: 'F8', action: 'Print Receipt' },
  { key: 'F9', action: 'Void Transaction' },
  { key: 'F10', action: 'End of Day' },
  { key: 'ESC', action: 'Cancel' },
  { key: 'Enter', action: 'Confirm' },
];

export const offlineQueue = [
  { id: 'OFF-001', time: '10:15 AM', items: 3, total: 34.50, status: 'pending' },
  { id: 'OFF-002', time: '10:20 AM', items: 5, total: 52.25, status: 'pending' },
];
