
import React from 'react';
import { Tab, UserRole } from '../types';
import { LayoutDashboard, FileText, ShoppingCart, Package, Settings, LogOut, Store, List, Truck, Home, Upload, Heart } from 'lucide-react';

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
    { id: Tab.SPECIFICATION, label: 'Project Specification', icon: FileText },
  ];

  const retailerItems = [
    { id: Tab.RETAILER_DASHBOARD, label: 'My Store', icon: Store },
    { id: Tab.CATALOG, label: 'Catalog', icon: Package },
    { id: Tab.MY_ORDERS, label: 'My Orders', icon: List },
  ];

  const distributorItems = [
    { id: Tab.RETAILER_DASHBOARD, label: 'Overview', icon: LayoutDashboard }, // Re-using retailer dashboard route but rendering Distributor Dashboard
    { id: Tab.CATALOG, label: 'Bulk Catalog', icon: Truck },
    { id: Tab.MY_ORDERS, label: 'Bulk Orders', icon: List },
  ];

  const customerItems = [
    { id: Tab.B2C_HOME, label: 'Home', icon: Home },
    { id: Tab.CATALOG, label: 'Medicines', icon: Package },
    { id: Tab.UPLOAD_RX, label: 'Upload Prescription', icon: Upload },
    { id: Tab.MY_ORDERS, label: 'Your Orders', icon: List },
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
    <div className="flex flex-col h-full">
      <div className="p-6 flex items-center justify-center border-b border-pharma-800">
        <div className={`font-bold p-2 rounded shadow-lg ${getThemeColor()}`}>SP</div>
        <span className="ml-3 text-xl font-bold tracking-wider">SANDP</span>
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
              <Icon size={20} className={isActive ? 'text-white' : 'text-pharma-300 group-hover:text-white'} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-pharma-800 space-y-2">
         {userRole !== 'customer' && (
            <button className="w-full flex items-center gap-3 px-4 py-3 text-pharma-300 hover:text-white hover:bg-pharma-800 rounded-lg transition-colors">
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
