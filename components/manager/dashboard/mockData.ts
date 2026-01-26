// Mock data for the store manager dashboard

export const inventoryData = [
  { 
    id: 'INV-001', 
    name: 'Coca Cola 500ml', 
    sku: 'BEV-CC-500', 
    category: 'Beverages',
    stock: 150, 
    reorderLevel: 100,
    costPrice: 1.80,
    retailPrice: 2.50,
    supplier: 'Coca Cola Ltd',
    expiryDate: '2024-06-15',
    batchNumber: 'CC-2024-001',
    image: 'product1.jpg',
    lastRestocked: '2024-01-15',
    soldThisMonth: 320,
  },
  { 
    id: 'INV-002', 
    name: 'White Bread', 
    sku: 'BAK-WB-001', 
    category: 'Bakery',
    stock: 45, 
    reorderLevel: 50,
    costPrice: 2.00,
    retailPrice: 3.25,
    supplier: 'Fresh Bakery Co',
    expiryDate: '2024-01-28',
    batchNumber: 'FB-2024-012',
    image: 'product2.jpg',
    lastRestocked: '2024-01-26',
    soldThisMonth: 180,
  },
  { 
    id: 'INV-003', 
    name: 'Fresh Milk 1L', 
    sku: 'DAI-FM-1L', 
    category: 'Dairy',
    stock: 80, 
    reorderLevel: 60,
    costPrice: 3.20,
    retailPrice: 4.50,
    supplier: 'Dairy Farms Ltd',
    expiryDate: '2024-02-02',
    batchNumber: 'DF-2024-003',
    image: 'product3.jpg',
    lastRestocked: '2024-01-24',
    soldThisMonth: 240,
  },
  { 
    id: 'INV-004', 
    name: 'Rice 5kg', 
    sku: 'GRN-RC-5K', 
    category: 'Grains',
    stock: 30, 
    reorderLevel: 40,
    costPrice: 9.00,
    retailPrice: 12.00,
    supplier: 'Grain Suppliers Inc',
    expiryDate: '2024-12-31',
    batchNumber: 'GS-2024-008',
    image: 'product4.jpg',
    lastRestocked: '2024-01-10',
    soldThisMonth: 95,
  },
  { 
    id: 'INV-005', 
    name: 'Cooking Oil 2L', 
    sku: 'OIL-CO-2L', 
    category: 'Oils',
    stock: 15, 
    reorderLevel: 30,
    costPrice: 6.50,
    retailPrice: 8.75,
    supplier: 'Oil Distributors',
    expiryDate: '2024-08-20',
    batchNumber: 'OD-2024-015',
    image: 'product5.jpg',
    lastRestocked: '2024-01-12',
    soldThisMonth: 67,
  },
];

export const purchaseOrders = [
  {
    id: 'PO-2024-001',
    supplier: 'Coca Cola Ltd',
    items: 12,
    totalCost: 2160,
    status: 'pending',
    orderDate: '2024-01-20',
    expectedDelivery: '2024-01-27',
    createdBy: 'Manager John',
  },
  {
    id: 'PO-2024-002',
    supplier: 'Fresh Bakery Co',
    items: 8,
    totalCost: 640,
    status: 'approved',
    orderDate: '2024-01-22',
    expectedDelivery: '2024-01-28',
    createdBy: 'Manager John',
  },
  {
    id: 'PO-2024-003',
    supplier: 'Dairy Farms Ltd',
    items: 15,
    totalCost: 1920,
    status: 'received',
    orderDate: '2024-01-18',
    expectedDelivery: '2024-01-25',
    createdBy: 'Manager Sarah',
  },
];

export const lowStockItems = inventoryData.filter(item => item.stock <= item.reorderLevel);

export const expiringItems = inventoryData.filter(item => {
  const expiryDate = new Date(item.expiryDate);
  const today = new Date();
  const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
});

export const salesAnalytics = [
  { month: 'Aug', revenue: 18500, profit: 4200 },
  { month: 'Sep', revenue: 21200, profit: 5100 },
  { month: 'Oct', revenue: 19800, profit: 4650 },
  { month: 'Nov', revenue: 23400, profit: 5800 },
  { month: 'Dec', revenue: 26700, profit: 6500 },
  { month: 'Jan', revenue: 24500, profit: 6100 },
];

export const topProducts = [
  { name: 'Coca Cola 500ml', sold: 320, revenue: 800 },
  { name: 'Fresh Milk 1L', sold: 240, revenue: 1080 },
  { name: 'White Bread', sold: 180, revenue: 585 },
  { name: 'Rice 5kg', sold: 95, revenue: 1140 },
  { name: 'Cooking Oil 2L', sold: 67, revenue: 586 },
];

export const deadStock = [
  { name: 'Instant Noodles', daysInStock: 90, quantity: 45, value: 135 },
  { name: 'Canned Beans', daysInStock: 75, quantity: 32, value: 96 },
  { name: 'Old Cereal Brand', daysInStock: 60, quantity: 28, value: 168 },
];

export const categoryPerformance = [
  { category: 'Beverages', revenue: 8500, profit: 2100, margin: 24.7 },
  { category: 'Dairy', revenue: 6200, profit: 1550, margin: 25.0 },
  { category: 'Bakery', revenue: 4800, profit: 960, margin: 20.0 },
  { category: 'Grains', revenue: 7300, profit: 1825, margin: 25.0 },
  { category: 'Oils', revenue: 3200, profit: 720, margin: 22.5 },
];

export const suppliers = [
  {
    id: 'SUP-001',
    name: 'Coca Cola Ltd',
    contact: 'James Wilson',
    phone: '+256 700 111222',
    email: 'orders@cocacola.ug',
    products: 12,
    totalOrders: 45,
    totalSpent: 25400,
    rating: 4.8,
    paymentTerms: 'Net 30',
    status: 'active',
  },
  {
    id: 'SUP-002',
    name: 'Fresh Bakery Co',
    contact: 'Mary Johnson',
    phone: '+256 700 222333',
    email: 'supply@freshbakery.ug',
    products: 8,
    totalOrders: 38,
    totalSpent: 18900,
    rating: 4.6,
    paymentTerms: 'Net 15',
    status: 'active',
  },
  {
    id: 'SUP-003',
    name: 'Dairy Farms Ltd',
    contact: 'Peter Brown',
    phone: '+256 700 333444',
    email: 'orders@dairyfarms.ug',
    products: 15,
    totalOrders: 52,
    totalSpent: 32100,
    rating: 4.9,
    paymentTerms: 'Net 30',
    status: 'active',
  },
];

export const pricingRules = [
  {
    id: 'PROMO-001',
    product: 'Coca Cola 500ml',
    type: 'promotional',
    originalPrice: 2.50,
    promoPrice: 2.00,
    startDate: '2024-01-25',
    endDate: '2024-02-10',
    active: true,
  },
  {
    id: 'BULK-001',
    product: 'Rice 5kg',
    type: 'bulk',
    quantity: 10,
    discount: 10,
    active: true,
  },
];

export const stockMovements = [
  { date: '2024-01-26 10:30', product: 'Coca Cola 500ml', type: 'sale', quantity: -12, user: 'Cashier Sarah' },
  { date: '2024-01-26 11:15', product: 'Fresh Milk 1L', type: 'sale', quantity: -8, user: 'Cashier John' },
  { date: '2024-01-26 14:20', product: 'White Bread', type: 'restock', quantity: +50, user: 'Manager John' },
  { date: '2024-01-26 15:45', product: 'Rice 5kg', type: 'adjustment', quantity: -2, user: 'Manager John' },
];
