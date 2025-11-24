
import React from 'react';
import { Tab, UserRole } from '../types';
import { LayoutDashboard, FileText, ShoppingCart, Package, Settings, LogOut, Store, List } from 'lucide-react';

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

  const menuItems = userRole === 'retailer' ? retailerItems : adminItems;

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 flex items-center justify-center border-b border-pharma-800">
        <div className={`text-pharma-900 font-bold p-2 rounded shadow-lg ${userRole === 'retailer' ? 'bg-emerald-100' : 'bg-white'}`}>SP</div>
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
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive
                  ? 'bg-pharma-600 text-white shadow-md'
                  : 'text-pharma-100 hover:bg-pharma-800 hover:text-white'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-white' : 'text-pharma-300 group-hover:text-white'} />
              <span className="font-medium">{item.label}</span>
              {item.id === Tab.SPECIFICATION && (
                 <span className="ml-auto bg-yellow-500 text-xs text-black px-1.5 py-0.5 rounded font-bold">DOCS</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-pharma-800 space-y-2">
         <button className="w-full flex items-center gap-3 px-4 py-3 text-pharma-300 hover:text-white hover:bg-pharma-800 rounded-lg transition-colors">
            <Settings size={20} />
            <span>Settings</span>
         </button>
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
