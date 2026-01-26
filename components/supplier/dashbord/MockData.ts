// Mock data for the supplier dashboard

export const ordersData = [
  {
    id: 'PO-001',
    storeName: 'Downtown Store',
    items: 12,
    total: 1245,
    status: 'pending',
    date: '2023-11-15',
    deliveryDate: '2023-11-18',
    location: '123 Main St, New York',
    manager: 'John Smith',
  },
  {
    id: 'PO-002',
    storeName: 'Westside Market',
    items: 8,
    total: 680,
    status: 'shipped',
    date: '2023-11-14',
    deliveryDate: '2023-11-17',
    location: '456 West Ave, Brooklyn',
    manager: 'Sarah Johnson',
  },
  {
    id: 'PO-003',
    storeName: 'Central Plaza',
    items: 15,
    total: 2150,
    status: 'delivered',
    date: '2023-11-12',
    deliveryDate: '2023-11-15',
    location: '789 Central Blvd, Manhattan',
    manager: 'Mike Davis',
  },
  {
    id: 'PO-004',
    storeName: 'East End Shop',
    items: 10,
    total: 890,
    status: 'pending',
    date: '2023-11-16',
    deliveryDate: '2023-11-19',
    location: '321 East St, Queens',
    manager: 'Emma Wilson',
  },
];

export const paymentsData = [
  { month: 'Jun', paid: 12500, pending: 3200 },
  { month: 'Jul', paid: 15800, pending: 2100 },
  { month: 'Aug', paid: 18200, pending: 4500 },
  { month: 'Sep', paid: 16500, pending: 3800 },
  { month: 'Oct', paid: 21000, pending: 2500 },
  { month: 'Nov', paid: 19500, pending: 5200 },
];

export const revenueTrends = [
  { month: 'Jun', revenue: 15700 },
  { month: 'Jul', revenue: 17900 },
  { month: 'Aug', revenue: 22700 },
  { month: 'Sep', revenue: 20300 },
  { month: 'Oct', revenue: 23500 },
  { month: 'Nov', revenue: 24700 },
];

export const performanceData = [
  { name: 'On Time', value: 87, color: '#22c55e' },
  { name: 'Delayed', value: 13, color: '#ef4444' },
];

export const categorySales = [
  { category: 'Vegetables', sales: 8500 },
  { category: 'Dairy', sales: 6200 },
  { category: 'Bakery', sales: 4800 },
  { category: 'Meat', sales: 7300 },
  { category: 'Beverages', sales: 3200 },
];

export const productsData = [
  {
    id: 'PROD-001',
    name: 'Organic Tomatoes',
    category: 'Vegetables',
    currentPrice: 45,
    priceHistory: [42, 43, 44, 45, 45],
    stock: 250,
    lowStockThreshold: 100,
    sku: 'VEG-TOM-001',
  },
  {
    id: 'PROD-002',
    name: 'Fresh Milk',
    category: 'Dairy',
    currentPrice: 68,
    priceHistory: [65, 66, 67, 68, 68],
    stock: 180,
    lowStockThreshold: 150,
    sku: 'DAI-MLK-002',
  },
  {
    id: 'PROD-003',
    name: 'Premium Bread',
    category: 'Bakery',
    currentPrice: 35,
    priceHistory: [35, 35, 34, 35, 35],
    stock: 320,
    lowStockThreshold: 100,
    sku: 'BAK-BRD-003',
  },
  {
    id: 'PROD-004',
    name: 'Fresh Chicken',
    category: 'Meat',
    currentPrice: 120,
    priceHistory: [115, 118, 120, 120, 120],
    stock: 95,
    lowStockThreshold: 150,
    sku: 'MEA-CHK-004',
  },
];

export const notificationsData = [
  {
    id: 1,
    type: 'order',
    title: 'New Order Received',
    message: 'PO-005 from Downtown Store',
    time: '5 mins ago',
    unread: true,
  },
  {
    id: 2,
    type: 'payment',
    title: 'Payment Received',
    message: 'Ush 2,150 from Central Plaza',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 3,
    type: 'alert',
    title: 'Low Stock Alert',
    message: 'Fresh Chicken is running low',
    time: '2 hours ago',
    unread: false,
  },
  {
    id: 4,
    type: 'message',
    title: 'New Message',
    message: 'John Smith sent you a message',
    time: '3 hours ago',
    unread: true,
  },
];

export const upcomingDeliveries = [
  { id: 'PO-001', store: 'Downtown Store', date: '2023-11-18', time: '10:00 AM', items: 12 },
  { id: 'PO-004', store: 'East End Shop', date: '2023-11-19', time: '2:00 PM', items: 10 },
  { id: 'PO-006', store: 'North Mall', date: '2023-11-20', time: '11:30 AM', items: 8 },
];

export const invoicesData = [
  { id: 'INV-234', store: 'Downtown Store', amount: 1245, status: 'paid', date: '11/15/2023', dueDate: '11/25/2023' },
  { id: 'INV-235', store: 'Westside Market', amount: 680, status: 'pending', date: '11/14/2023', dueDate: '11/24/2023' },
  { id: 'INV-236', store: 'Central Plaza', amount: 2150, status: 'paid', date: '11/12/2023', dueDate: '11/22/2023' },
  { id: 'INV-237', store: 'East End Shop', amount: 890, status: 'pending', date: '11/16/2023', dueDate: '11/26/2023' },
  { id: 'INV-238', store: 'North Mall', amount: 1560, status: 'overdue', date: '11/10/2023', dueDate: '11/20/2023' },
];

export const storeManagers = [
  { name: 'John Smith', store: 'Downtown Store', unread: 2, status: 'online' },
  { name: 'Sarah Johnson', store: 'Westside Market', unread: 0, status: 'offline' },
  { name: 'Mike Davis', store: 'Central Plaza', unread: 1, status: 'online' },
  { name: 'Emma Wilson', store: 'East End Shop', unread: 0, status: 'offline' },
];

export const documentsData = [
  { name: 'Invoice_PO-234.pdf', type: 'Invoice', size: '245 KB', date: '2023-11-15', category: 'invoices' },
  { name: 'Delivery_Note_001.pdf', type: 'Delivery Note', size: '156 KB', date: '2023-11-14', category: 'delivery' },
  { name: 'Contract_Downtown_Store.pdf', type: 'Contract', size: '890 KB', date: '2023-11-10', category: 'contracts' },
  { name: 'Invoice_PO-235.pdf', type: 'Invoice', size: '198 KB', date: '2023-11-12', category: 'invoices' },
  { name: 'Quality_Certificate.pdf', type: 'Certificate', size: '320 KB', date: '2023-11-08', category: 'other' },
  { name: 'Delivery_Note_002.pdf', type: 'Delivery Note', size: '178 KB', date: '2023-11-13', category: 'delivery' },
];

export const customersData = [
  { name: 'Downtown Store', orders: 45, total: 12500, status: 'active', rating: 4.9, contact: 'John Smith' },
  { name: 'Westside Market', orders: 38, total: 9800, status: 'active', rating: 4.7, contact: 'Sarah Johnson' },
  { name: 'Central Plaza', orders: 52, total: 15200, status: 'active', rating: 4.8, contact: 'Mike Davis' },
  { name: 'East End Shop', orders: 29, total: 7600, status: 'active', rating: 4.6, contact: 'Emma Wilson' },
];

export const performanceMonthlyData = [
  { month: 'Jun', onTime: 85, quality: 90, rating: 4.6 },
  { month: 'Jul', onTime: 82, quality: 88, rating: 4.5 },
  { month: 'Aug', onTime: 89, quality: 91, rating: 4.7 },
  { month: 'Sep', onTime: 86, quality: 89, rating: 4.6 },
  { month: 'Oct', onTime: 88, quality: 92, rating: 4.8 },
  { month: 'Nov', onTime: 87, quality: 92, rating: 4.8 },
];
