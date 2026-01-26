'use client';

import { AnalyticsTab } from '@/components/manager/dashboard/AnalyticsTab';
import { BulkImportTab } from '@/components/manager/dashboard/BulkIportsTab';
import { ExportTab } from '@/components/manager/dashboard/ExportTab';
import { Header } from '@/components/manager/dashboard/Header';
import { InventoryTab } from '@/components/manager/dashboard/InventoryTab';
import { OverviewTab } from '@/components/manager/dashboard/OverviewTab';
import { PricingTab } from '@/components/manager/dashboard/PricingTab';
import { PurchaseOrdersTab } from '@/components/manager/dashboard/PurchaseOrdersTab';
import { Sidebar } from '@/components/manager/dashboard/SideBar';
import { SuppliersTab } from '@/components/manager/dashboard/SuppliersTab';
import { useState } from 'react';


export default function ManagerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab onTabChange={setActiveTab} />;
      case 'inventory':
        return <InventoryTab />;
      case 'products':
        return <InventoryTab />;
      case 'pricing':
        return <PricingTab />;
      case 'purchase-orders':
        return <PurchaseOrdersTab />;
      case 'suppliers':
        return <SuppliersTab />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'reports':
        return <AnalyticsTab />;
      case 'import':
        return <BulkImportTab />;
      case 'export':
        return <ExportTab />;
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Settings</h2>
            <p className="text-gray-400">Settings panel coming soon...</p>
          </div>
        );
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
        />

        {/* Main Content Area */}
        <main className="p-6">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}
