'use client';

import { AnalyticsTab } from '@/components/admin/dashboard/AnalyticsTab';
import { AuditTab } from '@/components/admin/dashboard/AuditTab';
import { FinancialTab } from '@/components/admin/dashboard/FinancialTab';
import { Header } from '@/components/admin/dashboard/Header';
import { systemNotifications } from '@/components/admin/dashboard/mockData';
import { OverviewTab } from '@/components/admin/dashboard/OverviewTab';
import { PermissionsTab } from '@/components/admin/dashboard/PermissionsTab';
import { ReportsTab } from '@/components/admin/dashboard/ReportsTab';
import { SettingsTab } from '@/components/admin/dashboard/SettingsTab';
import { Sidebar } from '@/components/admin/dashboard/Sidebar';
import { StoresTab } from '@/components/admin/dashboard/StoresTab';
import { SuppliersTab } from '@/components/admin/dashboard/SuppliersTab';
import { SystemTab } from '@/components/admin/dashboard/SystemTab';
import { UsersTab } from '@/components/admin/dashboard/UsersTab';
import { InventoryTab } from '@/components/manager/dashboard/InventoryTab';
import { useState } from 'react';


export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const unreadNotifications = systemNotifications.filter((n) => !n.read).length;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab onTabChange={setActiveTab} />;
      case 'users':
        return <UsersTab />;
      case 'stores':
        return <StoresTab />;
      case 'financial':
        return <FinancialTab />;
      case 'inventory':
        return <InventoryTab />;
      case 'suppliers':
        return <SuppliersTab />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'reports':
        return <ReportsTab />;
      case 'audit':
        return <AuditTab />;
      case 'permissions':
        return <PermissionsTab />;
      case 'system':
        return <SystemTab />;
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
          notificationCount={unreadNotifications}
        />

        {/* Main Content Area */}
        <main className="p-6">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}
