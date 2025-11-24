
import React, { useState } from 'react';
import { Tab, UserRole } from './types';
import Sidebar from './components/Sidebar';
import AdminDashboard from './components/AdminDashboard';
import SpecificationViewer from './components/SpecificationViewer';
import OrderList from './components/OrderList';
import InventoryView from './components/InventoryView';
import RetailerDashboard from './components/RetailerDashboard';
import ProductCatalog from './components/ProductCatalog';
import LoginScreen from './components/LoginScreen';
import { Menu } from 'lucide-react';

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>('admin'); // Default to admin for spec viewing, but allows logout
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setActiveTab(role === 'retailer' ? Tab.RETAILER_DASHBOARD : Tab.DASHBOARD);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      // Admin Tabs
      case Tab.DASHBOARD:
        return <AdminDashboard />;
      case Tab.SPECIFICATION:
        return <SpecificationViewer />;
      case Tab.ORDERS:
        return <OrderList />;
      case Tab.INVENTORY:
        return <InventoryView />;
      
      // Retailer Tabs
      case Tab.RETAILER_DASHBOARD:
        return <RetailerDashboard />;
      case Tab.CATALOG:
        return <ProductCatalog />;
      case Tab.MY_ORDERS:
        // Reuse OrderList for simplicity but conceptually this would be filtered
        return <OrderList />;

      default:
        return <AdminDashboard />;
    }
  };

  if (!userRole) {
    return <LoginScreen onLogin={handleLogin} />;
  }

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
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          userRole={userRole}
          onLogout={handleLogout}
        />
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
              <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                {userRole === 'admin' ? 'Admin & Spec Portal' : 'Retailer Portal'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex flex-col items-end mr-4">
                <span className="text-sm font-medium text-gray-700">
                  {userRole === 'admin' ? 'Mike Administrator' : 'Raj StoreOwner'}
                </span>
                <span className="text-xs text-pharma-600">
                  {userRole === 'admin' ? 'Head of Ops' : 'City Pharma'}
                </span>
             </div>
             <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold border-2 ${
               userRole === 'admin' 
                ? 'bg-pharma-100 text-pharma-700 border-pharma-200' 
                : 'bg-emerald-100 text-emerald-700 border-emerald-200'
             }`}>
                {userRole === 'admin' ? 'MA' : 'RJ'}
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
