# BiziCount POS - API Documentation

## Overview
This document outlines all the API routes available in the BiziCount POS system, including complete CRUD operations for all entities.

## Base URL
All endpoints are prefixed with `/api`

---

## User Management

### Create User
```
POST /api/users
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "fullName": "John Doe",
  "phone": "+256 700 123456",
  "role": "CASHIER",
  "passwordHash": "hashed_password"
}
```
**Response:** 201 Created with user object

### List All Users
```
GET /api/users
```
**Response:** 200 OK with array of users

### Get User by ID
```
GET /api/users/[id]
```
**Response:** 200 OK with user object

### Update User
```
PUT /api/users/[id]
Content-Type: application/json

{
  "fullName": "Jane Doe",
  "phone": "+256 700 987654",
  "role": "MANAGER",
  "status": "ACTIVE"
}
```
**Response:** 200 OK with updated user object

### Delete User
```
DELETE /api/users/[id]
```
**Response:** 200 OK with success message

---

## Store Management

### Create Store
```
POST /api/stores
Content-Type: application/json

{
  "name": "Downtown Store",
  "location": "123 Main St, New York",
  "managerId": "user-id",
  "phone": "+1 555-0101",
  "email": "downtown@store.com"
}
```
**Response:** 201 Created with store object

### List All Stores
```
GET /api/stores
```
**Response:** 200 OK with array of stores

### Get Store by ID
```
GET /api/stores/[id]
```
**Response:** 200 OK with store object including users and inventory

### Update Store
```
PUT /api/stores/[id]
Content-Type: application/json

{
  "name": "Updated Store Name",
  "managerId": "new-manager-id",
  "revenue": 50000,
  "employees": 10,
  "status": "ACTIVE"
}
```
**Response:** 200 OK with updated store object

### Delete Store
```
DELETE /api/stores/[id]
```
**Response:** 200 OK with success message

---

## Product Management

### Create Product
```
POST /api/products
Content-Type: application/json

{
  "name": "Coca Cola 500ml",
  "sku": "BEV-CC-500",
  "barcode": "5449000000996",
  "categoryId": "category-id",
  "costPrice": 1.80,
  "retailPrice": 2.50,
  "description": "Refreshing cola beverage",
  "image": "product.jpg"
}
```
**Response:** 201 Created with product object

### List All Products
```
GET /api/products
GET /api/products?categoryId=[categoryId]
```
**Response:** 200 OK with array of products

### Get Product by ID
```
GET /api/products/[id]
```
**Response:** 200 OK with product object

### Update Product
```
PUT /api/products/[id]
Content-Type: application/json

{
  "name": "Updated Name",
  "costPrice": 1.85,
  "retailPrice": 2.75,
  "status": "ACTIVE"
}
```
**Response:** 200 OK with updated product object

### Delete Product
```
DELETE /api/products/[id]
```
**Response:** 200 OK with success message

---

## Categories

### Create Category
```
POST /api/categories
Content-Type: application/json

{
  "name": "Beverages",
  "description": "All beverage products"
}
```
**Response:** 201 Created with category object

### List All Categories
```
GET /api/categories
```
**Response:** 200 OK with array of categories

---

## Inventory Management

### Create Inventory Item
```
POST /api/inventory
Content-Type: application/json

{
  "productId": "product-id",
  "storeId": "store-id",
  "stock": 150,
  "reorderLevel": 100,
  "supplier": "Coca Cola Ltd",
  "expiryDate": "2024-06-15",
  "batchNumber": "CC-2024-001"
}
```
**Response:** 201 Created with inventory item object

### List Inventory
```
GET /api/inventory
GET /api/inventory?storeId=[storeId]
```
**Response:** 200 OK with array of inventory items

### Update Inventory Item
```
PUT /api/inventory/[id]
Content-Type: application/json

{
  "stock": 175,
  "reorderLevel": 95,
  "soldThisMonth": 350
}
```
**Response:** 200 OK with updated inventory item

---

## Transaction Management

### Create Transaction (Sale)
```
POST /api/transactions
Content-Type: application/json

{
  "storeId": "store-id",
  "userId": "user-id",
  "customerId": "customer-id" (optional),
  "totalAmount": 150.50,
  "payment": "CASH",
  "items": [
    {
      "productId": "product-id",
      "quantity": 2,
      "unitPrice": 2.50,
      "totalPrice": 5.00
    }
  ],
  "notes": "Regular sale"
}
```
**Response:** 201 Created with transaction object (updates inventory and customer points)

### List Transactions
```
GET /api/transactions
GET /api/transactions?storeId=[storeId]
```
**Response:** 200 OK with array of transactions

### Get Transaction by ID
```
GET /api/transactions/[id]
```
**Response:** 200 OK with transaction details

### Void Transaction
```
POST /api/transactions/[id]?action=void
```
**Response:** 200 OK with voided transaction (restores inventory)

---

## Supplier Management

### Create Supplier
```
POST /api/suppliers
Content-Type: application/json

{
  "name": "Fresh Farms Co.",
  "contactPerson": "James Wilson",
  "phone": "+256 700 111222",
  "email": "orders@freshfarms.ug",
  "category": "Vegetables",
  "paymentTerms": "Net 30",
  "rating": 4.8
}
```
**Response:** 201 Created with supplier object

### List All Suppliers
```
GET /api/suppliers
```
**Response:** 200 OK with array of suppliers

### Get Supplier by ID
```
GET /api/suppliers/[id]
```
**Response:** 200 OK with supplier object

### Update Supplier
```
PUT /api/suppliers/[id]
Content-Type: application/json

{
  "contactPerson": "New Contact",
  "paymentTerms": "Net 15",
  "rating": 4.9
}
```
**Response:** 200 OK with updated supplier object

### Delete Supplier
```
DELETE /api/suppliers/[id]
```
**Response:** 200 OK with success message

---

## Purchase Orders

### Create Purchase Order
```
POST /api/purchase-orders
Content-Type: application/json

{
  "supplierId": "supplier-id",
  "createdById": "user-id",
  "expectedDelivery": "2024-01-27",
  "items": [
    {
      "productId": "product-id",
      "quantity": 12,
      "unitCost": 1.80,
      "totalCost": 21.60
    }
  ],
  "notes": "Urgent order"
}
```
**Response:** 201 Created with purchase order object

### List Purchase Orders
```
GET /api/purchase-orders
GET /api/purchase-orders?supplierId=[supplierId]
GET /api/purchase-orders?status=PENDING
```
**Response:** 200 OK with array of purchase orders

### Get Purchase Order by ID
```
GET /api/purchase-orders/[id]
```
**Response:** 200 OK with purchase order details

### Update Purchase Order Status
```
PUT /api/purchase-orders/[id]
Content-Type: application/json

{
  "status": "DELIVERED",
  "actualDelivery": "2024-01-27"
}
```
**Response:** 200 OK with updated purchase order

---

## Customers

### Create Customer
```
POST /api/customers
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "+256 700 123456",
  "email": "john@example.com",
  "tier": "Gold"
}
```
**Response:** 201 Created with customer object

### List All Customers
```
GET /api/customers
```
**Response:** 200 OK with array of customers

### Get Customer by ID
```
GET /api/customers/[id]
```
**Response:** 200 OK with customer details including transactions

### Update Customer
```
PUT /api/customers/[id]
Content-Type: application/json

{
  "tier": "Platinum",
  "loyaltyPoints": 500
}
```
**Response:** 200 OK with updated customer object

---

## Returns & Refunds

### Create Return
```
POST /api/returns
Content-Type: application/json

{
  "customerId": "customer-id",
  "itemCount": 2,
  "amount": 18.50,
  "reason": "Defective product",
  "notes": "Item was damaged"
}
```
**Response:** 201 Created with return object

### List Returns
```
GET /api/returns
```
**Response:** 200 OK with array of returns

### Update Return Status
```
PUT /api/returns/[id]
Content-Type: application/json

{
  "status": "APPROVED"
}
```
**Response:** 200 OK with updated return object

---

## Payment Methods

- `CASH` - Cash payment
- `MTN_MONEY` - MTN Mobile Money
- `AIRTEL_MONEY` - Airtel Money
- `CARD` - Credit/Debit Card
- `SPLIT` - Split payment across methods

## Status Values

### User Status
- `ACTIVE` - Active user
- `INACTIVE` - Inactive user
- `SUSPENDED` - Suspended user

### Transaction Status
- `COMPLETED` - Completed transaction
- `PENDING` - Pending transaction
- `FAILED` - Failed transaction
- `VOIDED` - Voided transaction

### Order Status
- `PENDING` - Pending order
- `APPROVED` - Approved order
- `SHIPPED` - Order shipped
- `DELIVERED` - Order delivered
- `CANCELLED` - Order cancelled

### Return Status
- `PENDING` - Pending return
- `APPROVED` - Approved return
- `REJECTED` - Rejected return
- `COMPLETED` - Completed return

---

## Hooks for Frontend

### useUsers()
```typescript
const { users, loading, error, createUser, updateUser, deleteUser, fetchUsers } = useUsers();
```

### useProducts()
```typescript
const { products, loading, error, createProduct, updateProduct, deleteProduct, fetchProducts } = useProducts();
```

### useTransactions(storeId?)
```typescript
const { transactions, loading, error, createTransaction, voidTransaction, fetchTransactions } = useTransactions(storeId);
```

### useSuppliers()
```typescript
const { suppliers, loading, error, createSupplier, updateSupplier, deleteSupplier, fetchSuppliers } = useSuppliers();
```

### useCustomers()
```typescript
const { customers, loading, error, createCustomer, updateCustomer, deleteCustomer, fetchCustomers } = useCustomers();
```

### useStores()
```typescript
const { stores, loading, error, createStore, updateStore, deleteStore, fetchStores } = useStores();
```

---

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Invalid input
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

Error responses include a message:
```json
{
  "error": "Error description"
}
```

---

## Authentication Note

All routes should be protected with authentication middleware. Add to your API routes:

```typescript
import { requireRole } from '@/lib/auth-helpers';

export async function GET(request: NextRequest) {
  const session = await requireRole(['ADMIN', 'MANAGER']);
  // Your logic here
}
```
