'use client';

import { usePermission } from '@/hooks/usePermission';
import { Permission, Role } from '@/lib/rbac/permissions';
import { ReactNode } from 'react';

interface ProtectedComponentProps {
  children: ReactNode;
  permission?: Permission;
  roles?: Role[];
  fallback?: ReactNode;
}

export function ProtectedComponent({
  children,
  permission,
  roles,
  fallback = null,
}: ProtectedComponentProps) {
  const { hasPermission, hasRole } = usePermission();

  const isAuthorized = () => {
    if (permission && !hasPermission(permission)) {
      return false;
    }
    if (roles && !hasRole(roles)) {
      return false;
    }
    return true;
  };

  if (!isAuthorized()) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}