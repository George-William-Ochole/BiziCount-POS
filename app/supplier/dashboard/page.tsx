"use client"
import { CommunicationTab } from '@/components/supplier/dashbord/CommunicationTab';
import { CustomersTab } from '@/components/supplier/dashbord/CustomersTab';
import { DocumentsTab } from '@/components/supplier/dashbord/DocumentsTab';
import { Header } from '@/components/supplier/dashbord/Header';
import { notificationsData } from '@/components/supplier/dashbord/MockData';
import { NotificationsPanel } from '@/components/supplier/dashbord/NotificationsPanel';
import { OrdersTab } from '@/components/supplier/dashbord/OrdersTab';
import { OverviewTab } from '@/components/supplier/dashbord/OverviewTab';
import { PaymentsTab } from '@/components/supplier/dashbord/PaymentsTab';
import { PerformanceTab } from '@/components/supplier/dashbord/PerformanceTab';
import { ProductsTab } from '@/components/supplier/dashbord/ProductsTab';
import { SettingsTab } from '@/components/supplier/dashbord/SettingsTab';
import { Sidebar } from '@/components/supplier/dashbord/SideBar';
import { useState } from 'react';


export default function SupplierDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notificationsData.filter((n) => n.unread).length;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab onTabChange={setActiveTab} />;
      case 'orders':
        return <OrdersTab />;
      case 'payments':
        return <PaymentsTab />;
      case 'products':
        return <ProductsTab />;
      case 'performance':
        return <PerformanceTab />;
      case 'communication':
        return <CommunicationTab />;
      case 'documents':
        return <DocumentsTab />;
      case 'customers':
        return <CustomersTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <OverviewTab onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0a1a] text-gray-100 flex">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Main Content */}
      <div className={`flex-1 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
        {/* Top Header */}
        <Header
          activeTab={activeTab}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          onToggleNotifications={() => setShowNotifications(!showNotifications)}
          unreadCount={unreadCount}
        />

        {/* Notifications Dropdown */}
        <NotificationsPanel
          notifications={notificationsData}
          show={showNotifications}
        />

        {/* Main Content Area */}
        <main className="p-6">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}