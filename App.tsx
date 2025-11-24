import React, { useState } from 'react';
import { Tab } from './types';
import Sidebar from './components/Sidebar';
import AdminDashboard from './components/AdminDashboard';
import SpecificationViewer from './components/SpecificationViewer';
import OrderList from './components/OrderList';
import InventoryView from './components/InventoryView';
import { Menu, LayoutDashboard, FileText, ShoppingCart, Package } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case Tab.DASHBOARD:
        return <AdminDashboard />;
      case Tab.SPECIFICATION:
        return <SpecificationViewer />;
      case Tab.ORDERS:
        return <OrderList />;
      case Tab.INVENTORY:
        return <InventoryView />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {!isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-30 w-64 bg-pharma-900 text-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 shadow-xl`}
      >
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 tracking-tight">SANDP Pharma</h1>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Admin & Spec Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex flex-col items-end mr-4">
                <span className="text-sm font-medium text-gray-700">Mike Administrator</span>
                <span className="text-xs text-pharma-600">Head of Ops</span>
             </div>
             <div className="h-10 w-10 rounded-full bg-pharma-100 flex items-center justify-center text-pharma-700 font-bold border-2 border-pharma-200">
                MA
             </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 spec-scroll">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}