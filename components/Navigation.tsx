'use client';

import Link from 'next/link';
import { usePermission } from '@/hooks/usePermission';
import { Permission, Role } from '@/lib/rbac/permissions';

export function Navigation() {
  const { hasPermission, hasRole } = usePermission();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex gap-4">
        <li><Link href="/">Home</Link></li>
        
        {hasRole([Role.ADMIN]) && (
          <li><Link href="/admin">Admin</Link></li>
        )}
        
        {hasRole([Role.ADMIN, Role.STORE_MANAGER]) && (
          <li><Link href="/manager">Manager</Link></li>
        )}
        
        {hasPermission(Permission.CREATE_SALES) && (
          <li><Link href="/cashier">Sales</Link></li>
        )}
        
        {hasRole([Role.SUPPLIER]) && (
          <li><Link href="/supplier">Supplier</Link></li>
        )}
        
        {hasPermission(Permission.VIEW_REPORTS) && (
          <li><Link href="/reports">Reports</Link></li>
        )}
      </ul>
    </nav>
  );
}