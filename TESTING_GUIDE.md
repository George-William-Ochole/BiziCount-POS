# BiziCount POS - Testing Guide

## API Endpoint Testing with cURL

### 1. Test User Management

#### Create a user
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "cashier@bizicount.com",
    "username": "cashier1",
    "fullName": "John Cashier",
    "passwordHash": "hashed_password",
    "role": "CASHIER",
    "phone": "+256 700 123456"
  }'
```

#### List all users
```bash
curl http://localhost:3000/api/users
```

#### Get specific user
```bash
curl http://localhost:3000/api/users/USER_ID
```

#### Update user
```bash
curl -X PUT http://localhost:3000/api/users/USER_ID \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Updated Name",
    "phone": "+256 700 987654"
  }'
```

### 2. Test Product Management

#### Create product category
```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Beverages",
    "description": "All beverage products"
  }'
```

#### Create product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Coca Cola 500ml",
    "sku": "BEV-CC-500",
    "barcode": "5449000000996",
    "categoryId": "CATEGORY_ID",
    "costPrice": 1.80,
    "retailPrice": 2.50,
    "description": "Refreshing cola beverage"
  }'
```

#### List products
```bash
curl http://localhost:3000/api/products
```

### 3. Test Store Management

#### Create store
```bash
curl -X POST http://localhost:3000/api/stores \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Downtown Store",
    "location": "123 Main St, New York",
    "managerId": "MANAGER_USER_ID",
    "phone": "+1 555-0101",
    "email": "downtown@store.com"
  }'
```

#### List stores
```bash
curl http://localhost:3000/api/stores
```

### 4. Test Inventory Management

#### Add inventory item
```bash
curl -X POST http://localhost:3000/api/inventory \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "PRODUCT_ID",
    "storeId": "STORE_ID",
    "stock": 150,
    "reorderLevel": 100,
    "supplier": "Coca Cola Ltd",
    "expiryDate": "2024-06-15",
    "batchNumber": "CC-2024-001"
  }'
```

#### Get inventory
```bash
curl http://localhost:3000/api/inventory?storeId=STORE_ID
```

### 5. Test Transaction Management (MOST IMPORTANT)

#### Create transaction (Complete Sale)
```bash
curl -X POST http://localhost:3000/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "storeId": "STORE_ID",
    "userId": "CASHIER_USER_ID",
    "customerId": "CUSTOMER_ID_OR_NULL",
    "totalAmount": 150.50,
    "payment": "CASH",
    "items": [
      {
        "productId": "PRODUCT_ID_1",
        "quantity": 2,
        "unitPrice": 2.50,
        "totalPrice": 5.00
      },
      {
        "productId": "PRODUCT_ID_2",
        "quantity": 5,
        "unitPrice": 29.10,
        "totalPrice": 145.50
      }
    ]
  }'
```

**Expected Result:**
- Transaction is created with unique transaction number
- Inventory is automatically reduced by quantity sold
- Customer loyalty points are incremented (if customer assigned)
- Customer total spent is updated

#### List transactions for a store
```bash
curl http://localhost:3000/api/transactions?storeId=STORE_ID
```

#### Void a transaction
```bash
curl -X POST http://localhost:3000/api/transactions/TRANSACTION_ID?action=void
```

**Expected Result:**
- Transaction status changes to "VOIDED"
- Inventory is restored for all items
- Customer loyalty points are decremented (if applicable)

### 6. Test Supplier Management

#### Create supplier
```bash
curl -X POST http://localhost:3000/api/suppliers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Fresh Farms Co.",
    "contactPerson": "James Wilson",
    "phone": "+256 700 111222",
    "email": "orders@freshfarms.ug",
    "category": "Vegetables",
    "paymentTerms": "Net 30",
    "rating": 4.8
  }'
```

#### List suppliers
```bash
curl http://localhost:3000/api/suppliers
```

### 7. Test Purchase Orders

#### Create purchase order
```bash
curl -X POST http://localhost:3000/api/purchase-orders \
  -H "Content-Type: application/json" \
  -d '{
    "supplierId": "SUPPLIER_ID",
    "createdById": "MANAGER_USER_ID",
    "expectedDelivery": "2024-01-27",
    "items": [
      {
        "productId": "PRODUCT_ID",
        "quantity": 100,
        "unitCost": 1.80,
        "totalCost": 180.00
      }
    ]
  }'
```

#### Update purchase order status
```bash
curl -X PUT http://localhost:3000/api/purchase-orders/ORDER_ID \
  -H "Content-Type: application/json" \
  -d '{
    "status": "DELIVERED",
    "actualDelivery": "2024-01-27"
  }'
```

### 8. Test Customer Management

#### Create customer
```bash
curl -X POST http://localhost:3000/api/customers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phone": "+256 700 123456",
    "email": "john@example.com",
    "tier": "Bronze"
  }'
```

#### List customers
```bash
curl http://localhost:3000/api/customers
```

#### Get customer details (including transaction history)
```bash
curl http://localhost:3000/api/customers/CUSTOMER_ID
```

### 9. Test Returns

#### Create return
```bash
curl -X POST http://localhost:3000/api/returns \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "CUSTOMER_ID",
    "itemCount": 2,
    "amount": 18.50,
    "reason": "Defective product",
    "notes": "Item packaging was damaged"
  }'
```

#### Update return status
```bash
curl -X PUT http://localhost:3000/api/returns/RETURN_ID \
  -H "Content-Type: application/json" \
  -d '{
    "status": "APPROVED"
  }'
```

---

## Frontend Component Testing

### 1. UsersTab Component
**File:** `components/admin/dashboard/UsersTabNew.tsx`

**Test Steps:**
1. Load Admin Dashboard
2. Click "Add User" button
3. Fill form with user details
4. Submit and verify user appears in list
5. Click Edit to modify user
6. Click Delete to remove user
7. Verify all database operations complete

### 2. CheckoutTab Component  
**File:** `components/cashier/dashboard/CheckoutTabNew.tsx`

**Test Steps:**
1. Scan a product barcode
2. Product appears in cart
3. Modify quantity with +/- buttons
4. Apply discount percentage
5. Select payment method
6. Complete sale
7. Verify transaction in database
8. Check inventory updated
9. Check customer loyalty points incremented

### 3. InventoryTab Component
**File:** `components/manager/dashboard/InventoryTabNew.tsx`

**Test Steps:**
1. View all products
2. Filter by category
3. Search for product
4. Click Edit on product
5. Update stock, reorder level
6. Submit and verify database updated
7. Check low stock alerts highlighted
8. Add new product

### 4. SuppliersTab Component
**File:** `components/manager/dashboard/SuppliersTabNew.tsx`

**Test Steps:**
1. Add new supplier
2. Fill supplier form
3. Submit and verify in database
4. Edit supplier details
5. Delete supplier
6. Verify all operations sync to database

---

## Verification Checklist

### ✅ Database Operations
- [ ] Can create new records
- [ ] Can read records
- [ ] Can update records
- [ ] Can delete records
- [ ] Foreign key relationships work correctly
- [ ] Constraints are enforced

### ✅ Inventory System
- [ ] Stock decreases when transaction created
- [ ] Stock increases when transaction voided
- [ ] Low stock alerts display correctly
- [ ] Reorder levels are respected

### ✅ Customer System
- [ ] Loyalty points accumulate correctly
- [ ] Customer tier updates based on spending
- [ ] Transaction history tracked
- [ ] Returns affect customer account

### ✅ Transaction System
- [ ] Transactions create with unique number
- [ ] All items added to transaction
- [ ] Calculations are correct
- [ ] Multiple payment methods work
- [ ] Discount applied correctly
- [ ] Void restores inventory

### ✅ Supplier Management
- [ ] Purchase orders link to products
- [ ] Order status tracking works
- [ ] Delivery dates recorded
- [ ] Supplier ratings update

### ✅ Error Handling
- [ ] Invalid input rejected
- [ ] Unique constraints enforced
- [ ] Error messages displayed
- [ ] No data loss on errors

---

## Database Inspection

### View users
```bash
pnpm prisma studio
# Then navigate to 'User' table
```

### Run SQL queries
```bash
pnpm prisma db execute --stdin << EOF
SELECT * FROM users;
SELECT * FROM transactions;
SELECT * FROM inventory_items;
EOF
```

---

## Performance Notes

- Transaction creation should complete in <500ms
- Inventory queries should be indexed on (productId, storeId)
- Customer queries should be indexed on loyalty tier for reporting
- Archive old transactions (>1 year) for performance

---

## Known Issues & Solutions

### Issue: Inventory not updating
**Solution:** Ensure transaction item quantities match inventory deduction

### Issue: Customer points not updating
**Solution:** Verify customer relationship is set during transaction creation

### Issue: Purchase order total not calculated
**Solution:** Ensure all order items include unitCost and quantity

### Issue: Supplier products not linking
**Solution:** Verify productId exists before creating purchase order item

---

## Next Testing Phase

1. Load testing with multiple concurrent users
2. Stress test database with large volumes
3. Test backup and recovery procedures
4. Test authentication and authorization
5. Test audit logging
6. Test report generation
