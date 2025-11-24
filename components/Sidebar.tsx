
import React from 'react';
import { Tab, UserRole } from '../types';
import { LayoutDashboard, FileText, ShoppingCart, Package, Settings, LogOut, Store, List, Truck, Home, Upload, Award, Gift } from 'lucide-react';

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
    { id: Tab.LOYALTY, label: 'Loyalty Rewards', icon: Award },
  ];

  const distributorItems = [
    { id: Tab.RETAILER_DASHBOARD, label: 'Overview', icon: LayoutDashboard }, 
    { id: Tab.CATALOG, label: 'Bulk Catalog', icon: Truck },
    { id: Tab.MY_ORDERS, label: 'Bulk Orders', icon: List },
    { id: Tab.LOYALTY, label: 'Partner Rewards', icon: Award },
  ];

  const customerItems = [
    { id: Tab.B2C_HOME, label: 'Home', icon: Home },
    { id: Tab.CATALOG, label: 'Medicines', icon: Package },
    { id: Tab.UPLOAD_RX, label: 'Upload Prescription', icon: Upload },
    { id: Tab.MY_ORDERS, label: 'Your Orders', icon: List },
    { id: Tab.LOYALTY, label: 'Rewards', icon: Award },
  ];

  let menuItems = adminItems;
  if (userRole === 'retailer') menuItems = retailerItems;
  if (userRole === 'distributor') menuItems = distributorItems;
  if (userRole === 'customer') menuItems = customerItems;

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
        return 'bg-pharma-600 text-white';
    }
    return 'text-pharma-100 hover:bg-pharma-800 hover:text-white';
  }

  return (
    <div className="flex flex-col h-full bg-[#0a192f] text-white">
      <div className="p-6 flex items-center justify-center border-b border-gray-800">
        {/* S&P Branding Placeholder */}
        <div className="flex flex-col items-center gap-2">
            <div className="h-12 w-32 bg-white rounded flex items-center justify-center overflow-hidden">
                <img src="https://placehold.co/150x50/003366/ffffff?text=S%26P+USA" alt="S&P Logo" className="object-cover" />
            </div>
            <span className="text-xs text-gray-400 tracking-widest uppercase">Pharmaceuticals</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${getHoverClass(isActive)}`}
            >
              <Icon size={20} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-800 space-y-2">
         {userRole !== 'customer' && (
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                <Settings size={20} />
                <span>Settings</span>
            </button>
         )}
         <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-300 hover:text-red-100 hover:bg-red-900/30 rounded-lg transition-colors"
        >
            <LogOut size={20} />
            <span>Logout</span>
         </button>
      </div>
    </div>
  );
};

export default Sidebar;
