
import React from 'react';
import { Tab, UserRole } from '../types';
import { LayoutDashboard, FileText, ShoppingCart, Package, Settings, LogOut, Store, List, Truck, Home, Upload, Award, Gift, Sun, UserCheck } from 'lucide-react';

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  userRole: UserRole;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, userRole, onLogout }) => {
  
  const adminItems = [
    { id: Tab.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: Tab.ORDERS, label: 'Order Management', icon: ShoppingCart },
    { id: Tab.INVENTORY, label: 'Inventory & Stock', icon: Package },
    { id: Tab.LOYALTY_MANAGEMENT, label: 'Loyalty Program', icon: Gift },
    { id: Tab.SPECIFICATION, label: 'Project Specification', icon: FileText },
  ];

  const retailerItems = [
    { id: Tab.RETAILER_DASHBOARD, label: 'My Store', icon: Store },
    { id: Tab.CATALOG, label: 'Catalog', icon: Package },
    { id: Tab.MY_ORDERS, label: 'My Orders', icon: List },
    { id: Tab.SUNNY_CLUB, label: 'Sunny Club', icon: Sun }, 
  ];

  const distributorItems = [
    { id: Tab.RETAILER_DASHBOARD, label: 'Overview', icon: LayoutDashboard }, 
    { id: Tab.CATALOG, label: 'Bulk Catalog', icon: Truck },
    { id: Tab.MY_ORDERS, label: 'Bulk Orders', icon: List },
    { id: Tab.SUNNY_CLUB, label: 'Partner Rewards', icon: Award },
  ];

  const customerItems = [
    { id: Tab.B2C_HOME, label: 'Home', icon: Home },
    { id: Tab.CATALOG, label: 'Medicines', icon: Package },
    { id: Tab.UPLOAD_RX, label: 'Upload Prescription', icon: Upload },
    { id: Tab.MY_ORDERS, label: 'Your Orders', icon: List },
    { id: Tab.LOYALTY, label: 'Rewards', icon: Award },
  ];

  const deliveryItems = [
    { id: Tab.MY_ORDERS, label: 'Assigned Deliveries', icon: Truck },
    { id: Tab.RETAILER_DASHBOARD, label: 'Route Map', icon: LayoutDashboard },
  ];

  let menuItems = adminItems;
  if (userRole === 'retailer') menuItems = retailerItems;
  if (userRole === 'distributor') menuItems = distributorItems;
  if (userRole === 'customer') menuItems = customerItems;
  if (userRole === 'delivery' || userRole === 'stockist') menuItems = deliveryItems;

  // Visual Theme based on role
  const getThemeColor = () => {
      switch(userRole) {
          case 'customer': return 'bg-teal-100 text-teal-800';
          case 'distributor': return 'bg-purple-100 text-purple-800';
          case 'retailer': return 'bg-emerald-100 text-emerald-800';
          default: return 'bg-white text-pharma-900';
      }
  }

  const getHoverClass = (isActive: boolean) => {
    if (isActive) {
        if (userRole === 'customer') return 'bg-teal-600 text-white';
        if (userRole === 'distributor') return 'bg-purple-600 text-white';
        if (userRole === 'retailer' && activeTab === Tab.SUNNY_CLUB) return 'bg-orange-500 text-white';
        return 'bg-pharma-600 text-white';
    }
    return 'text-pharma-100 hover:bg-pharma-800 hover:text-white';
  }

  return (
    <div className="flex flex-col h-full bg-[#0a192f] text-white shadow-2xl relative z-20 font-sans">
      <div className="px-6 py-8 flex flex-col items-start border-b border-gray-800 bg-[#051020]">
        {/* S&P Branding */}
        <img src="https://placehold.co/200x60/003366/ffffff?text=S%26P+USA" alt="S&P Logo" className="h-10 mb-2 rounded-sm" />
        <span className="text-[10px] text-gray-400 tracking-[0.2em] uppercase pl-1">Pharmaceuticals</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${getHoverClass(isActive)}`}
            >
              <Icon size={20} className={`transition-colors ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
              <span className="font-medium tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800 space-y-2 bg-[#051020]">
         {userRole !== 'customer' && (
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                <Settings size={20} />
                <span>Settings</span>
            </button>
         )}
         <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:text-red-100 hover:bg-red-900/20 rounded-lg transition-colors"
        >
            <LogOut size={20} />
            <span>Logout</span>
         </button>
      </div>
    </div>
  );
};

export default Sidebar;
