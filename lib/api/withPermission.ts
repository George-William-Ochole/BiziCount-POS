import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { Permission, Role } from '@/lib/rbac/permissions';
import { hasPermission } from '@/lib/rbac/rbac';

export async function requirePermission(permission: Permission) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userRole = session.user.role as Role;

  if (!hasPermission(userRole, permission)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return null; // Permission granted
}

export async function requireRole(roles: Role[]) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userRole = session.user.role as Role;

  if (!roles.includes(userRole)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  return null; // Role check passed
}