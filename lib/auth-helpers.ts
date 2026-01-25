import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Role } from '@/lib/rbac/permissions';

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/login');
  }
  
  return session;
}

export async function requireRole(allowedRoles: Role[]) {
  const session = await requireAuth();
  const userRole = session.user.role as Role;
  
  if (!allowedRoles.includes(userRole)) {
    redirect('/unauthorized');
  }
  
  return session;
}

export async function getSession() {
  return await getServerSession(authOptions);
}

export function getRoleDashboard(role: Role): string {
  const dashboards: Record<Role, string> = {
    [Role.ADMIN]: '/admin/dashboard',
    [Role.STORE_MANAGER]: '/manager/dashboard',
    [Role.CASHIER]: '/cashier/dashboard',
    [Role.SUPPLIER]: '/supplier/dashboard',
  };

  return dashboards[role] || '/';
}