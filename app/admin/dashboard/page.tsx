
import { requireRole } from '@/lib/auth-helpers';
import { Role } from '@/lib/rbac/permissions';

export default async function AdminDashboard() {
  const session = await requireRole([Role.ADMIN]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-lg mb-4">Welcome, {session.user.name}!</p>
          <p className="text-gray-600">Role: {session.user.role}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900">Total Users</h3>
              <p className="text-2xl font-bold text-blue-600">--</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900">Total Sales</h3>
              <p className="text-2xl font-bold text-green-600">--</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900">Products</h3>
              <p className="text-2xl font-bold text-purple-600">--</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}