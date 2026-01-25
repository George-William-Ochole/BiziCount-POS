import { useSession } from 'next-auth/react';
import { Role, Permission } from '@/lib/rbac/permissions';
import { hasPermission, canAccessRole } from '@/lib/rbac/rbac';

export function usePermission() {
  const { data: session } = useSession();
  const userRole = session?.user?.role as Role;

  const checkPermission = (permission: Permission): boolean => {
    if (!userRole) return false;
    return hasPermission(userRole, permission);
  };

  const checkRole = (roles: Role[]): boolean => {
    if (!userRole) return false;
    return canAccessRole(userRole, roles);
  };

  return {
    hasPermission: checkPermission,
    hasRole: checkRole,
    role: userRole,
  };
}