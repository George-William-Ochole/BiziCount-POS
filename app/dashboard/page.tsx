
import { requireRole } from '@/lib/auth-helpers';
import { Role } from '@/lib/rbac/permissions';

export default async function CashierDashboard() {
  const session = await requireRole([Role.ADMIN, Role.STORE_MANAGER, Role.CASHIER]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Cashier Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-lg mb-4">Welcome, {session.user.name}!</p>
          <p className="text-gray-600">Role: {session.user.role}</p>
          
          <div className="mt-6">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 text-lg">
              New Sale
            </button>
          </div>
          
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Today&apos;s Sales</h3>
            <p className="text-gray-600">No sales yet</p>
          </div>
        </div>
      </div>
    </div>
  );
}