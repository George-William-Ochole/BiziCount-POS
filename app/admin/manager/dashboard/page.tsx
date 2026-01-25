
import { requireRole } from '@/lib/auth-helpers';
import { Role } from '@/lib/rbac/permissions';

export default async function ManagerDashboard() {
  const session = await requireRole([Role.ADMIN, Role.STORE_MANAGER]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Store Manager Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-lg mb-4">Welcome, {session.user.name}!</p>
          <p className="text-gray-600">Role: {session.user.role}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900">Daily Sales</h3>
              <p className="text-2xl font-bold text-blue-600">--</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900">Inventory Status</h3>
              <p className="text-2xl font-bold text-green-600">Good</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}