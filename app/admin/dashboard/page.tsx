"use client"
import { ActionCard } from '@/components/admin/dashboard/ActionCard';
import { Header } from '@/components/admin/dashboard/MHeader';
import { OrderSummaryChart } from '@/components/admin/dashboard/OrderSummary';
import { RecentTransactions } from '@/components/admin/dashboard/RecentTransactiona';
import { Sidebar } from '@/components/admin/dashboard/SideBar';
import { StatCard } from '@/components/admin/dashboard/StatCard';
import { TopCategoriesChart } from '@/components/admin/dashboard/TopCategories';
import { ShoppingCart, UserPlus, Truck, FilePlus } from 'lucide-react';

// Mock data for stat cards
const statData = {
  totalOrders: {
    data: [
      { value: 50 },
      { value: 55 },
      { value: 52 },
      { value: 58 },
      { value: 62 },
      { value: 59 },
      { value: 65 },
    ],
  },
  totalSales: {
    data: [
      { value: 85000 },
      { value: 88000 },
      { value: 90000 },
      { value: 92000 },
      { value: 94000 },
      { value: 95000 },
      { value: 97056 },
    ],
  },
  newCustomers: {
    data: [
      { value: 28 },
      { value: 26 },
      { value: 27 },
      { value: 25 },
      { value: 26 },
      { value: 25 },
      { value: 24 },
    ],
  },
  totalRevenue: {
    data: [
      { value: 24000 },
      { value: 25000 },
      { value: 25500 },
      { value: 26000 },
      { value: 26500 },
      { value: 27000 },
      { value: 27230 },
    ],
  },
};

export default function App() {
  return (
    <div className="flex h-screen bg-[#0d0d0d] overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeItem="dashboard" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Page Title */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-white text-2xl font-semibold">Dashboard</h1>
              <span className="text-gray-400 text-sm">05/11/2023 - 11/11/ 2023</span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard
                title="Total Orders"
                value={65}
                change={12}
                data={statData.totalOrders.data}
                color="#ec4899"
              />
              <StatCard
                title="Total Sales"
                value="97,056"
                change={8.1}
                data={statData.totalSales.data}
                color="#fb923c"
              />
              <StatCard
                title="New Customers"
                value={24}
                change={-3.2}
                data={statData.newCustomers.data}
                color="#22d3ee"
              />
              <StatCard
                title="Total Revenue"
                value="27,230"
                change={4.3}
                data={statData.totalRevenue.data}
                color="#a3e635"
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <OrderSummaryChart />
              </div>
              <div>
                <TopCategoriesChart />
              </div>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <ActionCard
                title="Add New Item"
                icon={ShoppingCart}
                iconColor="#ec4899"
              />
              <ActionCard
                title="Add New Customer"
                icon={UserPlus}
                iconColor="#ec4899"
              />
              <ActionCard
                title="Add New Supplier"
                icon={Truck}
                iconColor="#ec4899"
              />
              <ActionCard
                title="Add New Order"
                icon={FilePlus}
                iconColor="#ec4899"
              />
            </div>

            {/* Recent Transactions */}
            <RecentTransactions />
          </div>
        </div>
      </div>
    </div>
  );
}
