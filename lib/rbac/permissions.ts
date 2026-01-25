export enum Role {
  ADMIN = 'ADMIN',
  STORE_MANAGER = 'STORE_MANAGER',
  CASHIER = 'CASHIER',
  SUPPLIER = 'SUPPLIER'
}

export enum Permission {
  // User Management
  CREATE_USERS = 'CREATE_USERS',
  VIEW_USERS = 'VIEW_USERS',
  EDIT_USERS = 'EDIT_USERS',
  DELETE_USERS = 'DELETE_USERS',
  
  // Product Management
  CREATE_PRODUCTS = 'CREATE_PRODUCTS',
  VIEW_PRODUCTS = 'VIEW_PRODUCTS',
  EDIT_PRODUCTS = 'EDIT_PRODUCTS',
  DELETE_PRODUCTS = 'DELETE_PRODUCTS',
  
  // Sales
  CREATE_SALES = 'CREATE_SALES',
  VIEW_SALES = 'VIEW_SALES',
  VOID_SALES = 'VOID_SALES',
  
  // Inventory
  VIEW_INVENTORY = 'VIEW_INVENTORY',
  UPDATE_INVENTORY = 'UPDATE_INVENTORY',
  SUPPLY_INVENTORY = 'SUPPLY_INVENTORY',
  
  // Reports
  VIEW_REPORTS = 'VIEW_REPORTS',
  VIEW_FINANCIAL_REPORTS = 'VIEW_FINANCIAL_REPORTS',
  
  // System
  MANAGE_SETTINGS = 'MANAGE_SETTINGS',
}

export const rolePermissions: Record<Role, Permission[]> = {
  [Role.ADMIN]: [
    Permission.CREATE_USERS,
    Permission.VIEW_USERS,
    Permission.EDIT_USERS,
    Permission.DELETE_USERS,
    Permission.CREATE_PRODUCTS,
    Permission.VIEW_PRODUCTS,
    Permission.EDIT_PRODUCTS,
    Permission.DELETE_PRODUCTS,
    Permission.CREATE_SALES,
    Permission.VIEW_SALES,
    Permission.VOID_SALES,
    Permission.VIEW_INVENTORY,
    Permission.UPDATE_INVENTORY,
    Permission.VIEW_REPORTS,
    Permission.VIEW_FINANCIAL_REPORTS,
    Permission.MANAGE_SETTINGS,
  ],
  
  [Role.STORE_MANAGER]: [
    Permission.VIEW_USERS,
    Permission.CREATE_PRODUCTS,
    Permission.VIEW_PRODUCTS,
    Permission.EDIT_PRODUCTS,
    Permission.CREATE_SALES,
    Permission.VIEW_SALES,
    Permission.VOID_SALES,
    Permission.VIEW_INVENTORY,
    Permission.UPDATE_INVENTORY,
    Permission.VIEW_REPORTS,
    Permission.VIEW_FINANCIAL_REPORTS,
  ],
  
  [Role.CASHIER]: [
    Permission.VIEW_PRODUCTS,
    Permission.CREATE_SALES,
    Permission.VIEW_SALES,
    Permission.VIEW_INVENTORY,
  ],
  
  [Role.SUPPLIER]: [
    Permission.VIEW_PRODUCTS,
    Permission.VIEW_INVENTORY,
    Permission.SUPPLY_INVENTORY,
  ],
};