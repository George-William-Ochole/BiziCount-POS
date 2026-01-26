# BiziCount POS - Setup & Integration Guide

## Quick Start

### 1. Run Database Migrations

After the Prisma schema is in place, run:

```bash
cd bizicount
pnpm prisma migrate dev --name init
```

This will:
- Create all tables in your PostgreSQL database
- Generate Prisma Client
- Run any seed scripts

### 2. Seed Initial Data (Optional)

Create a seed file at `prisma/seed.ts`:

```typescript
import { prisma } from '@/lib/prisma';

async function main() {
  // Create admin user
  const admin = await prisma.user.create({
    data: {
      email: 'admin@bizicount.com',
      username: 'admin',
      fullName: 'Admin User',
      passwordHash: 'hash_of_password', // Use bcrypt or similar
      role: 'ADMIN',
    },
  });

  // Create stores
  const store = await prisma.store.create({
    data: {
      name: 'Downtown Store',
      location: '123 Main St',
      managerId: admin.id,
    },
  });

  // Create product categories
  const category = await prisma.productCategory.create({
    data: {
      name: 'Beverages',
      description: 'All beverage products',
    },
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Then run:
```bash
pnpm prisma db seed
```

### 3. Start the Application

```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

---

## Component Integration Checklist

### Admin Dashboard
- [ ] Replace `UsersTab` with `UsersTabNew` in AdminDashboard
- [ ] Update imports: `import { UsersTabNew as UsersTab } from '@/components/admin/dashboard/UsersTabNew'`
- [ ] Test user creation, update, and deletion
- [ ] Verify data persists in database

### Manager Dashboard
- [ ] Replace `InventoryTab` with `InventoryTabNew`
- [ ] Replace `SuppliersTab` with `SuppliersTabNew`
- [ ] Test inventory management
- [ ] Test supplier management

### Cashier Dashboard
- [ ] Replace `CheckoutTab` with `CheckoutTabNew`
- [ ] Test transaction creation
- [ ] Verify inventory updates after sale
- [ ] Test payment methods
- [ ] Verify customer loyalty points update

---

## Database Schema Overview

### Core Tables

**users**
- Stores system users with roles and permissions
- Fields: id, email, username, passwordHash, role, fullName, phone, status

**stores**
- Store locations and branches
- Fields: id, name, location, managerId, status, revenue, employees, phone, email

**products**
- Product master data
- Fields: id, name, sku, barcode, categoryId, costPrice, retailPrice, image, status

**inventory_items**
- Stock levels per store
- Fields: id, productId, storeId, stock, reorderLevel, supplier, expiryDate, batchNumber

**transactions**
- Point-of-sale transactions
- Fields: id, transactionNumber, storeId, userId, customerId, totalAmount, payment, status

**suppliers**
- Supplier information
- Fields: id, name, contactPerson, phone, email, category, status, paymentTerms, rating

**purchase_orders**
- Orders from suppliers
- Fields: id, poNumber, supplierId, createdById, totalCost, status, orderDate, expectedDelivery

**customers**
- Customer loyalty information
- Fields: id, name, phone, email, loyaltyPoints, tier, totalSpent

---

## Key Features Implemented

### ✅ User Management
- Create new users with roles (Admin, Manager, Cashier, Supplier)
- Edit user details
- Delete users
- Filter by role and status

### ✅ Product Management
- Add products with SKU and barcode
- Manage product categories
- Update pricing
- Track cost and retail prices

### ✅ Inventory Control
- Track stock levels per store
- Set reorder levels
- Track batch numbers and expiry dates
- View low stock alerts

### ✅ Point of Sale
- Barcode scanning
- Product search
- Shopping cart with quantity management
- Multiple payment methods (Cash, MTN Money, Airtel Money, Card, Split)
- Customer loyalty integration
- Discount application

### ✅ Supplier Management
- Create and manage suppliers
- Track supplier ratings and payment terms
- Create purchase orders
- Track order status

### ✅ Transaction Management
- Complete transaction creation with automatic inventory updates
- Transaction history
- Void transactions with inventory restoration
- Customer loyalty points calculation

### ✅ Reporting & Analytics
- Sales analytics
- Inventory reports
- Supplier performance
- Customer segments

---

## API Endpoints Reference

### Users
- `GET /api/users` - List all users
- `POST /api/users` - Create user
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

### Products
- `GET /api/products` - List products
- `POST /api/products` - Create product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

### Transactions
- `GET /api/transactions` - List transactions
- `POST /api/transactions` - Create transaction
- `POST /api/transactions/[id]?action=void` - Void transaction

### Suppliers
- `GET /api/suppliers` - List suppliers
- `POST /api/suppliers` - Create supplier
- `PUT /api/suppliers/[id]` - Update supplier
- `DELETE /api/suppliers/[id]` - Delete supplier

### Inventory
- `GET /api/inventory` - List inventory
- `POST /api/inventory` - Add inventory
- `PUT /api/inventory/[id]` - Update inventory

### Customers
- `GET /api/customers` - List customers
- `POST /api/customers` - Create customer
- `PUT /api/customers/[id]` - Update customer

---

## Testing the API

### Using cURL

**Create a user:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "john",
    "fullName": "John Doe",
    "passwordHash": "hashed_password",
    "role": "CASHIER"
  }'
```

**Create a transaction:**
```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "storeId": "store-id",
    "userId": "user-id",
    "totalAmount": 150.50,
    "payment": "CASH",
    "items": [
      {
        "productId": "product-id",
        "quantity": 2,
        "unitPrice": 2.50,
        "totalPrice": 5.00
      }
    ]
  }'
```

---

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check DATABASE_URL in `.env.local`
- Run `pnpm prisma db push` to sync schema

### Migration Errors
- Clear migrations: `pnpm prisma migrate reset`
- Then re-run: `pnpm prisma migrate dev`

### API Route Errors
- Check request method (GET, POST, PUT, DELETE)
- Verify JSON format in request body
- Check error response for details

### Component Not Updating
- Ensure hooks are called with `'use client'` directive
- Check browser console for errors
- Verify API endpoints are accessible

---

## Next Steps

1. **Authentication**: Integrate NextAuth.js for user authentication
2. **Authorization**: Add role-based access control middleware
3. **Validation**: Add server-side validation for all inputs
4. **Error Handling**: Improve error messages and user feedback
5. **Performance**: Add caching and pagination
6. **Reports**: Generate PDF reports for transactions and inventory
7. **Mobile**: Build mobile app for cashiers

---

## Support

For issues or questions, refer to:
- API Documentation: See `API_DOCUMENTATION.md`
- Prisma Docs: https://www.prisma.io/docs/
- Next.js Docs: https://nextjs.org/docs
