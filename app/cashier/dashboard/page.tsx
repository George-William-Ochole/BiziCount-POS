'use client';

import { CheckoutTab } from '@/components/cashier/dashboard/CheckoutTab';
import { CustomersTab } from '@/components/cashier/dashboard/CustomersTab';
import { EndOfDayTab } from '@/components/cashier/dashboard/EndOfDayTab';
import { Header } from '@/components/cashier/dashboard/Header';
import { offlineQueue } from '@/components/cashier/dashboard/mockData';
import { ReportsTab } from '@/components/cashier/dashboard/ReportsTab';
import { ReturnsTab } from '@/components/cashier/dashboard/ReturnsTab';
import { SettingsTab } from '@/components/cashier/dashboard/SettingsTab';
import { ShortcutsTab } from '@/components/cashier/dashboard/ShortcutTab';
import { Sidebar } from '@/components/cashier/dashboard/SideBar';
import { TransactionsTab } from '@/components/cashier/dashboard/TransactionsTab';
import { useState } from 'react';


export default function CashierDashboard() {
  const [activeTab, setActiveTab] = useState('checkout');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'checkout':
        return <CheckoutTab />;
      case 'returns':
        return <ReturnsTab />;
      case 'transactions':
        return <TransactionsTab />;
      case 'customers':
        return <CustomersTab />;
      case 'eod':
        return <EndOfDayTab />;
      case 'reports':
        return <ReportsTab />;
      case 'shortcuts':
        return <ShortcutsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <CheckoutTab />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0a1a] text-gray-100 flex">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOffline={isOffline}
      />

      {/* Main Content */}
      <div className={`flex-1 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
        {/* Top Header */}
        <Header
          activeTab={activeTab}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          isOffline={isOffline}
          offlineQueueCount={offlineQueue.length}
        />

        {/* Main Content Area */}
        <main className="p-6">
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
}
