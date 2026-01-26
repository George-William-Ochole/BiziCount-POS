// Mock data for the admin dashboard

export const systemUsers = [
  { id: 'USR-001', name: 'John Admin', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2 hours ago', stores: ['All Stores'] },
  { id: 'USR-002', name: 'Sarah Manager', email: 'sarah@example.com', role: 'Store Manager', status: 'active', lastLogin: '30 mins ago', stores: ['Downtown Store'] },
  { id: 'USR-003', name: 'Mike Cashier', email: 'mike@example.com', role: 'Cashier', status: 'active', lastLogin: '5 mins ago', stores: ['Downtown Store'] },
  { id: 'USR-004', name: 'Emma Supplier', email: 'emma@example.com', role: 'Supplier', status: 'active', lastLogin: '1 hour ago', stores: ['N/A'] },
  { id: 'USR-005', name: 'Tom Manager', email: 'tom@example.com', role: 'Store Manager', status: 'inactive', lastLogin: '2 days ago', stores: ['Westside Market'] },
];

export const storesData = [
  { 
    id: 'STR-001', 
    name: 'Downtown Store', 
    location: '123 Main St, New York', 
    manager: 'Sarah Manager', 
    status: 'active', 
    revenue: 45200, 
    employees: 8,
    phone: '+1 555-0101',
    email: 'downtown@store.com'
  },
  { 
    id: 'STR-002', 
    name: 'Westside Market', 
    location: '456 West Ave, Brooklyn', 
    manager: 'Tom Manager', 
    status: 'active', 
    revenue: 38900, 
    employees: 6,
    phone: '+1 555-0102',
    email: 'westside@store.com'
  },
  { 
    id: 'STR-003', 
    name: 'Central Plaza', 
    location: '789 Central Blvd, Manhattan', 
    manager: 'Linda Davis', 
    status: 'active', 
    revenue: 52300, 
    employees: 10,
    phone: '+1 555-0103',
    email: 'central@store.com'
  },
];

export const financialOverview = {
  totalRevenue: 136400,
  totalExpenses: 89200,
  netProfit: 47200,
  profitMargin: 34.6,
  monthlyGrowth: 12.5,
};

export const revenueData = [
  { month: 'Jan', revenue: 98000, expenses: 65000, profit: 33000 },
  { month: 'Feb', revenue: 105000, expenses: 68000, profit: 37000 },
  { month: 'Mar', revenue: 112000, expenses: 72000, profit: 40000 },
  { month: 'Apr', revenue: 118000, expenses: 75000, profit: 43000 },
  { month: 'May', revenue: 125000, expenses: 80000, profit: 45000 },
  { month: 'Jun', revenue: 136400, expenses: 89200, profit: 47200 },
];

export const storePerformance = [
  { store: 'Central Plaza', revenue: 52300, growth: 15.2 },
  { store: 'Downtown Store', revenue: 45200, growth: 12.8 },
  { store: 'Westside Market', revenue: 38900, growth: 8.5 },
];

export const auditLogs = [
  { id: 'AUD-001', user: 'John Admin', action: 'User Created', target: 'Mike Cashier', timestamp: '2 hours ago', ip: '192.168.1.100' },
  { id: 'AUD-002', user: 'Sarah Manager', action: 'Product Updated', target: 'Coca Cola 500ml', timestamp: '3 hours ago', ip: '192.168.1.105' },
  { id: 'AUD-003', user: 'John Admin', action: 'Store Created', target: 'Central Plaza', timestamp: '5 hours ago', ip: '192.168.1.100' },
  { id: 'AUD-004', user: 'Mike Cashier', action: 'Sale Completed', target: 'TXN-245', timestamp: '10 mins ago', ip: '192.168.1.110' },
  { id: 'AUD-005', user: 'Emma Supplier', action: 'Order Updated', target: 'PO-089', timestamp: '1 hour ago', ip: '192.168.1.120' },
];

export const systemHealth = {
  uptime: '99.9%',
  activeUsers: 24,
  apiResponseTime: '145ms',
  databaseSize: '2.3 GB',
  backupStatus: 'Success',
  lastBackup: '2 hours ago',
};

export const productCategories = [
  { id: 'CAT-001', name: 'Beverages', products: 145, status: 'active' },
  { id: 'CAT-002', name: 'Dairy', products: 89, status: 'active' },
  { id: 'CAT-003', name: 'Bakery', products: 67, status: 'active' },
  { id: 'CAT-004', name: 'Meat', products: 52, status: 'active' },
  { id: 'CAT-005', name: 'Vegetables', products: 123, status: 'active' },
];

export const suppliersList = [
  { id: 'SUP-001', name: 'Fresh Farms Co.', category: 'Vegetables', orders: 45, rating: 4.8, status: 'active' },
  { id: 'SUP-002', name: 'Dairy Best Ltd.', category: 'Dairy', orders: 38, rating: 4.6, status: 'active' },
  { id: 'SUP-003', name: 'Quality Meats Inc.', category: 'Meat', orders: 32, rating: 4.9, status: 'active' },
  { id: 'SUP-004', name: 'Beverage Direct', category: 'Beverages', orders: 52, rating: 4.7, status: 'active' },
];

export const rolePermissions = {
  Admin: ['all_access', 'user_management', 'store_management', 'financial_reports', 'system_settings'],
  'Store Manager': ['inventory_control', 'purchase_orders', 'pricing', 'store_reports', 'employee_management'],
  Cashier: ['checkout', 'returns', 'customer_lookup', 'daily_reports'],
  Supplier: ['view_orders', 'update_status', 'upload_documents', 'view_payments'],
};

export const taxSettings = [
  { id: 'TAX-001', name: 'Standard VAT', rate: 18, type: 'percentage', status: 'active' },
  { id: 'TAX-002', name: 'Food Items Tax', rate: 5, type: 'percentage', status: 'active' },
  { id: 'TAX-003', name: 'Luxury Tax', rate: 25, type: 'percentage', status: 'active' },
];

export const paymentGateways = [
  { id: 'PAY-001', name: 'MTN Mobile Money', status: 'active', transactions: 1245, fee: '1.5%' },
  { id: 'PAY-002', name: 'Airtel Money', status: 'active', transactions: 892, fee: '1.5%' },
  { id: 'PAY-003', name: 'Visa/Mastercard', status: 'active', transactions: 567, fee: '2.5%' },
  { id: 'PAY-004', name: 'Cash', status: 'active', transactions: 2134, fee: '0%' },
];

export const systemNotifications = [
  { id: 'NOT-001', type: 'warning', title: 'Low Stock Alert', message: '15 products below threshold', time: '5 mins ago', read: false },
  { id: 'NOT-002', type: 'success', title: 'Backup Completed', message: 'System backup successful', time: '2 hours ago', read: false },
  { id: 'NOT-003', type: 'info', title: 'New User Registered', message: 'Mike Cashier joined Downtown Store', time: '3 hours ago', read: true },
  { id: 'NOT-004', type: 'error', title: 'Payment Failed', message: 'Gateway timeout on TXN-245', time: '4 hours ago', read: false },
];

export const topProducts = [
  { name: 'Coca Cola 500ml', sales: 1245, revenue: 3112.50, margin: 28 },
  { name: 'White Bread', sales: 987, revenue: 3207.75, margin: 35 },
  { name: 'Fresh Milk 1L', sales: 856, revenue: 3852.00, margin: 22 },
  { name: 'Rice 5kg', sales: 432, revenue: 5184.00, margin: 18 },
  { name: 'Cooking Oil 2L', sales: 678, revenue: 5932.50, margin: 25 },
];

export const customerSegments = [
  { segment: 'Platinum', customers: 45, avgSpent: 2100, color: '#8b5cf6' },
  { segment: 'Gold', customers: 128, avgSpent: 1250, color: '#eab308' },
  { segment: 'Silver', customers: 342, avgSpent: 780, color: '#6b7280' },
  { segment: 'Bronze', customers: 567, avgSpent: 420, color: '#d97706' },
];
