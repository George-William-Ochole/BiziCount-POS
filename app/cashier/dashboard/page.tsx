import { Header } from "@/components/cashier/dashboard/Header";
import { PaymentPanel } from "@/components/cashier/dashboard/PaymentPannel";
import { POSCart } from "@/components/cashier/dashboard/POSCart";
import { ProductScanner } from "@/components/cashier/dashboard/ProductScanner";
import { QuickActions } from "@/components/cashier/dashboard/QuickActions";
import { QuickProductsGrid } from "@/components/cashier/dashboard/QuickProducts";
import { RecentSales } from "@/components/cashier/dashboard/RecentSales";
import { ShiftStats } from "@/components/cashier/dashboard/Shiftstats";
import { Sidebar } from "@/components/cashier/dashboard/SideBar";


export default function App() {
  return (
    <div className="flex h-screen bg-[#0d0d0d] overflow-hidden">
      {/* Sidebar */}
      <Sidebar activeItem="pos" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Cashier Board Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Page Title */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-white text-2xl font-semibold">Point of Sale</h1>
                <p className="text-gray-400 text-sm">Cashier Terminal - Register #3</p>
              </div>
              <span className="text-gray-400 text-sm">Sunday, January 25, 2026</span>
            </div>

            {/* Shift Stats */}
            <div className="mb-6">
              <ShiftStats />
            </div>

            {/* Main POS Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Section - Product Entry & Actions */}
              <div className="lg:col-span-2 space-y-6">
                {/* Scanner */}
                <ProductScanner />

                {/* Quick Categories */}
                <QuickProductsGrid />

                {/* Quick Actions */}
                <QuickActions />

                {/* Recent Sales */}
                <RecentSales />
              </div>

              {/* Right Section - Cart & Payment */}
              <div className="space-y-6">
                {/* Current Transaction Cart */}
                <div className="h-[500px]">
                  <POSCart />
                </div>

                {/* Payment Panel */}
                <PaymentPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
