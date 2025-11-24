
import React, { useState } from 'react';
import { Tab, UserRole, CartItem, LoyaltyHistoryItem } from './types';
import Sidebar from './components/Sidebar';
import AdminDashboard from './components/AdminDashboard';
import SpecificationViewer from './components/SpecificationViewer';
import OrderList from './components/OrderList';
import InventoryView from './components/InventoryView';
import RetailerDashboard from './components/RetailerDashboard';
import DistributorDashboard from './components/DistributorDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import ProductCatalog from './components/ProductCatalog';
import LoginScreen from './components/LoginScreen';
import CheckoutView from './components/CheckoutView';
import LoyaltyView from './components/LoyaltyView';
import { Menu, ShoppingCart, UploadCloud } from 'lucide-react';

export default function App() {
  const [userRole, setUserRole] = useState<UserRole | null>(null); 
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);

  // Loyalty State
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(850);
  const [loyaltyHistory, setLoyaltyHistory] = useState<LoyaltyHistoryItem[]>([
    { id: 1, title: 'Order #ORD-9090', date: 'Oct 24', points: 120, type: 'earn' },
    { id: 2, title: 'Redeemed Voucher', date: 'Oct 20', points: 500, type: 'burn' },
    { id: 3, title: 'Order #ORD-8821', date: 'Oct 18', points: 85, type: 'earn' },
    { id: 4, title: 'Tier Bonus', date: 'Oct 01', points: 50, type: 'earn' },
  ]);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    // Set initial tab based on role
    if (role === 'admin') setActiveTab(Tab.DASHBOARD);
    else if (role === 'customer') setActiveTab(Tab.B2C_HOME);
    else setActiveTab(Tab.RETAILER_DASHBOARD);

    // Reset points for demo realism based on role
    if (role === 'distributor') setLoyaltyPoints(15400);
    else if (role === 'retailer') setLoyaltyPoints(850);
    else if (role === 'customer') setLoyaltyPoints(240);
  };

  const handleLogout = () => {
    setUserRole(null);
    setCart([]); 
  };

  const addToCart = (newItem: CartItem) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === newItem.id);
      if (existing) {
        return prev.map(item => 
          item.id === newItem.id 
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    // Redirect logic
    if (userRole === 'customer') setActiveTab(Tab.B2C_HOME);
    else setActiveTab(Tab.RETAILER_DASHBOARD);
  };

  // Loyalty Handlers
  const handleEarnPoints = (amount: number) => {
    const newHistoryItem: LoyaltyHistoryItem = {
      id: Date.now(),
      title: `Order #${Math.floor(Math.random() * 9000) + 1000}`,
      date: 'Just Now',
      points: amount,
      type: 'earn'
    };
    setLoyaltyPoints(prev => prev + amount);
    setLoyaltyHistory(prev => [newHistoryItem, ...prev]);
  };

  const handleRedeemPoints = (cost: number, rewardTitle: string) => {
    if (loyaltyPoints >= cost) {
      const newHistoryItem: LoyaltyHistoryItem = {
        id: Date.now(),
        title: `Redeemed: ${rewardTitle}`,
        date: 'Just Now',
        points: cost,
        type: 'burn'
      };
      setLoyaltyPoints(prev => prev - cost);
      setLoyaltyHistory(prev => [newHistoryItem, ...prev]);
      return true;
    }
    return false;
  };

  const renderContent = () => {
    switch (activeTab) {
      // Admin
      case Tab.DASHBOARD: return <AdminDashboard />;
      case Tab.SPECIFICATION: return <SpecificationViewer />;
      case Tab.INVENTORY: return <InventoryView />;
      case Tab.ORDERS: return <OrderList />;
      
      // Retailer / Distributor Shared Route Key
      case Tab.RETAILER_DASHBOARD:
        return userRole === 'distributor' 
          ? <DistributorDashboard points={loyaltyPoints} /> 
          : <RetailerDashboard points={loyaltyPoints} />;
      
      case Tab.LOYALTY:
        return (
          <LoyaltyView 
            userRole={userRole} 
            points={loyaltyPoints} 
            history={loyaltyHistory}
            onRedeem={handleRedeemPoints}
          />
        );

      // Customer
      case Tab.B2C_HOME: return <CustomerDashboard onNavigate={setActiveTab} />;
      case Tab.UPLOAD_RX: 
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 m-4">
                <UploadCloud size={64} className="text-gray-400 mb-4" />
                <h3 className="text-xl font-bold text-gray-700">Upload Prescription</h3>
                <p className="text-gray-500 mb-6">Take a photo of your prescription to order</p>
                <button className="bg-teal-600 text-white px-6 py-2 rounded-lg font-bold">Select File</button>
            </div>
        );

      // Shared
      case Tab.CATALOG:
        return <ProductCatalog cart={cart} onAddToCart={addToCart} userRole={userRole} />;
      case Tab.MY_ORDERS:
        return <OrderList />;
      case Tab.CHECKOUT:
        return (
          <CheckoutView 
            cart={cart} 
            onRemoveItem={removeFromCart} 
            onClearCart={clearCart} 
            userRole={userRole}
            onEarnPoints={handleEarnPoints}
          />
        );

      default:
        return <AdminDashboard />;
    }
  };

  if (!userRole) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Helper for Role Display info
  const getRoleInfo = () => {
      switch(userRole) {
          case 'admin': return { name: 'Mike Admin', label: 'Head of Ops', badge: 'MA', color: 'bg-blue-100 text-blue-700' };
          case 'retailer': return { name: 'Raj StoreOwner', label: 'City Pharma', badge: 'RJ', color: 'bg-emerald-100 text-emerald-700' };
          case 'distributor': return { name: 'Global Supply', label: 'Bulk Partner', badge: 'GS', color: 'bg-purple-100 text-purple-700' };
          case 'customer': return { name: 'Anita Kumar', label: 'Prime Member', badge: 'AK', color: 'bg-teal-100 text-teal-700' };
          default: return { name: 'User', label: '', badge: 'U', color: 'bg-gray-100' };
      }
  };

  const roleInfo = getRoleInfo();

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
        } fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 shadow-xl`}
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
            <div className="flex items-center gap-2">
              <div className="lg:hidden h-8 w-8 bg-blue-900 text-white flex items-center justify-center font-bold rounded">SP</div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 tracking-tight">
                  {activeTab === Tab.LOYALTY ? 'Rewards Program' : 
                   activeTab === Tab.CATALOG ? 'Product Catalog' :
                   activeTab === Tab.CHECKOUT ? 'Secure Checkout' : 'Dashboard'}
                </h1>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
             {/* Cart Icon (Not for Admin) */}
             {userRole !== 'admin' && (
               <button 
                onClick={() => setActiveTab(Tab.CHECKOUT)}
                className="relative p-2 text-gray-500 hover:text-pharma-600 transition-colors"
               >
                 <ShoppingCart size={24} />
                 {cart.length > 0 && (
                   <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1">
                     {cart.length}
                   </span>
                 )}
               </button>
             )}

             <div className="hidden md:flex flex-col items-end mr-4">
                <span className="text-sm font-medium text-gray-700">{roleInfo.name}</span>
                <span className="text-xs text-gray-400">{roleInfo.label}</span>
             </div>
             <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold border-2 border-opacity-20 ${roleInfo.color} border-current`}>
                {roleInfo.badge}
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
