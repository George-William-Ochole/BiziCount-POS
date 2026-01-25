import { Role, Permission, rolePermissions } from './permissions';

export function hasPermission(userRole: Role, permission: Permission): boolean {
  const permissions = rolePermissions[userRole];
  return permissions.includes(permission);
}

export function hasAnyPermission(
  userRole: Role,
  permissions: Permission[]
): boolean {
  return permissions.some(permission => hasPermission(userRole, permission));
}

export function hasAllPermissions(
  userRole: Role,
  permissions: Permission[]
): boolean {
  return permissions.every(permission => hasPermission(userRole, permission));
}

export function canAccessRole(userRole: Role, requiredRoles: Role[]): boolean {
  return requiredRoles.includes(userRole);
}