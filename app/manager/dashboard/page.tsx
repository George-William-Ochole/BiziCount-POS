import { DepartmentPerformance } from "@/components/storemanager/dashboard/DepartmentPerformance";
import { EmployeeActivity } from "@/components/storemanager/dashboard/EmployeeActivity";
import { Header } from "@/components/storemanager/dashboard/Header";
import { InventoryAlerts } from "@/components/storemanager/dashboard/InventoryAlert";
import { ManagerQuickActions } from "@/components/storemanager/dashboard/ManagerQuickActions";
import { ManagerStats } from "@/components/storemanager/dashboard/ManagerStats";
import { PurchaseOrders } from "@/components/storemanager/dashboard/PurchaseOrders";
import { SalesChart } from "@/components/storemanager/dashboard/SalesChart";
import { Sidebar } from "@/components/storemanager/dashboard/SideBar";
import { TopProducts } from "@/components/storemanager/dashboard/TopProducts";

export default function App() {
  return (
    <div className="flex h-screen bg-[#0d0d0d] overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeItem="dashboard" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Manager Dashboard Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Page Title */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-white text-2xl font-semibold">Store Manager Dashboard</h1>
                <p className="text-gray-400 text-sm">Sunday, January 25, 2026 • M Super - Main Branch</p>
              </div>
            </div>

            {/* Manager Stats Overview */}
            <div className="mb-6">
              <ManagerStats />
            </div>

            {/* Quick Actions */}
            <div className="mb-6">
              <ManagerQuickActions />
            </div>

            {/* Main Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Sales Chart */}
              <SalesChart />

              {/* Department Performance */}
              <DepartmentPerformance />
            </div>

            {/* Products & Orders Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Top Products - Takes 2 columns */}
              <div className="lg:col-span-2">
                <TopProducts />
              </div>

              {/* Inventory Alerts */}
              <div>
                <InventoryAlerts />
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Purchase Orders */}
              <PurchaseOrders />

              {/* Employee Activity */}
              <EmployeeActivity />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}