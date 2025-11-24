
import React, { useState } from 'react';
import { Tab, UserRole, CartItem, LoyaltyHistoryItem, Wish, ScratchCard } from './types';
import Sidebar from './components/Sidebar';
import AdminDashboard from './components/AdminDashboard';
import AdminLoyaltyManager from './components/AdminLoyaltyManager';
import SpecificationViewer from './components/SpecificationViewer';
import OrderList from './components/OrderList';
import InventoryView from './components/InventoryView';
import RetailerDashboard from './components/RetailerDashboard';
import DistributorDashboard from './components/DistributorDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import ProductCatalog from './components/ProductCatalog';
import LoginScreen from './components/LoginScreen';
import CheckoutView from './components/CheckoutView';
import SunnyClubView from './components/SunnyClubView';
import LoyaltyView from './components/LoyaltyView';
import { Menu, ShoppingCart, UploadCloud } from 'lucide-react';

export default function App() {
  const [userRole, setUserRole] = useState<UserRole | null>(null); 
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);

  // --- SUNNY CLUB STATE ---
  // Persistent Loyalty State for all roles (Reward Coins)
  const [userCoins, setUserCoins] = useState<Record<string, number>>({
    retailer: 12500, // Includes welcome bonus logic conceptually
    distributor: 154000,
    customer: 240,
    admin: 0
  });

  // Wishes State
  const [wishes, setWishes] = useState<Wish[]>([
    { id: '1', title: 'Royal Enfield Classic 350', targetAmount: 250000, currentAmount: 12500, image: 'https://placehold.co/200?text=Bike', status: 'Active' },
    { id: '2', title: 'Family Trip to Dubai', targetAmount: 500000, currentAmount: 0, image: 'https://placehold.co/200?text=Dubai', status: 'Active' }
  ]);

  // Scratch Cards
  const [scratchCards, setScratchCards] = useState<ScratchCard[]>([
    { id: 'sc_1', status: 'Unopened', dateEarned: 'Oct 25' },
    { id: 'sc_2', status: 'Opened', reward: '500 Coins', dateEarned: 'Oct 20' }
  ]);

  // Free Goods Ledger Balance
  const [freeGoodsLedger, setFreeGoodsLedger] = useState(4000);

  const [loyaltyHistory, setLoyaltyHistory] = useState<LoyaltyHistoryItem[]>([
    { id: 1, title: 'Welcome Bonus', date: 'Oct 24', points: 10000, type: 'earn' },
    { id: 2, title: 'Order #ORD-9090', date: 'Oct 24', points: 120, type: 'earn' },
  ]);

  // Derived state for current user
  const currentCoins = userRole ? userCoins[userRole] : 0;

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    // Set initial tab based on role
    if (role === 'admin') setActiveTab(Tab.DASHBOARD);
    else if (role === 'customer') setActiveTab(Tab.B2C_HOME);
    else setActiveTab(Tab.RETAILER_DASHBOARD);

    // Simulate Welcome Bonus if New User (Conceptually)
    // In a real app, this checks DB. Here we just assume "Retailer" has it in init state.
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
    if (!userRole) return;
    
    // 1. Add Coins
    setUserCoins(prev => ({
      ...prev,
      [userRole]: (prev[userRole] || 0) + amount
    }));

    // 2. Add History
    const newHistoryItem: LoyaltyHistoryItem = {
      id: Date.now(),
      title: `Order #${Math.floor(Math.random() * 9000) + 1000}`,
      date: 'Just Now',
      points: amount,
      type: 'earn'
    };
    setLoyaltyHistory(prev => [newHistoryItem, ...prev]);

    // 3. Update Wishes Progress (Auto-allocation logic)
    setWishes(prev => prev.map(w => ({
        ...w,
        currentAmount: w.currentAmount + amount // Simplified: 100% allocation to all active wishes for demo
    })));

    // 4. Issue Scratch Card
    setScratchCards(prev => [{ id: `sc_${Date.now()}`, status: 'Unopened', dateEarned: 'Just Now' }, ...prev]);
  };

  const handleSignBond = (wishId: string) => {
    setWishes(prev => prev.map(w => w.id === wishId ? { ...w, bondSigned: true } : w));
  };

  const handleScratch = (cardId: string) => {
    // Random reward logic
    const rewards = ['100 Coins', '500 Coins', '1% Cashback', 'Gold Coin Chance'];
    const reward = rewards[Math.floor(Math.random() * rewards.length)];

    setScratchCards(prev => prev.map(c => c.id === cardId ? { ...c, status: 'Opened', reward } : c));
    
    // If coins won, add to balance
    if (reward.includes('Coins')) {
        const amt = parseInt(reward);
        if (!isNaN(amt) && userRole) {
            setUserCoins(prev => ({ ...prev, [userRole]: prev[userRole] + amt }));
        }
    }
  };

  const handleRedeemMagicItem = (cost: number, itemName: string) => {
      if (!userRole) return;
      if (currentCoins >= cost) {
          setUserCoins(prev => ({ ...prev, [userRole]: prev[userRole] - cost }));
          alert(`Success! You redeemed ${itemName}.`);
      }
  };

  // Admin Handler to adjust points for other users
  const handleAdminAdjustPoints = (targetRole: string, amount: number, type: 'add' | 'sub') => {
    setUserCoins(prev => ({
      ...prev,
      [targetRole]: type === 'add' 
        ? (prev[targetRole] || 0) + amount 
        : Math.max(0, (prev[targetRole] || 0) - amount)
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      // Admin
      case Tab.DASHBOARD: return <AdminDashboard />;
      case Tab.SPECIFICATION: return <SpecificationViewer />;
      case Tab.INVENTORY: return <InventoryView />;
      case Tab.ORDERS: return <OrderList />;
      case Tab.LOYALTY_MANAGEMENT: 
        return <AdminLoyaltyManager onAdjustPoints={handleAdminAdjustPoints} />;
      
      // Retailer / Distributor Shared Route Key
      case Tab.RETAILER_DASHBOARD:
        return userRole === 'distributor' 
          ? <DistributorDashboard points={currentCoins} /> 
          : <RetailerDashboard points={currentCoins} />;
      
      // NEW SUNNY CLUB VIEW (Replaces generic Loyalty for B2B)
      case Tab.SUNNY_CLUB:
        return (
          <SunnyClubView 
            userRole={userRole}
            coins={currentCoins}
            wishes={wishes}
            scratchCards={scratchCards}
            freeGoodsBalance={freeGoodsLedger}
            onSignBond={handleSignBond}
            onScratch={handleScratch}
            onRedeem={handleRedeemMagicItem}
          />
        );

      // Customer
      case Tab.B2C_HOME: return <CustomerDashboard onNavigate={setActiveTab} />;
      case Tab.LOYALTY: return <LoyaltyView userRole={userRole} points={currentCoins} history={loyaltyHistory} onRedeem={() => true} />; // Keep simple view for B2C
      case Tab.UPLOAD_RX: 
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 m-4">
                <UploadCloud size={64} className="text-gray-400 mb-4" />
                <h3 className="text-xl font-bold text-gray-700">Upload Prescription</h3>
                <p className="text-gray-500 mb-6">Take a photo of your prescription to order</p>
                <button className="bg-pharma-900 text-white px-6 py-2 rounded-lg font-bold">Select File</button>
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
          default: return { name: 'User', label: 'Staff', badge: 'U', color: 'bg-gray-100' };
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
            <div className="flex items-center gap-2">
              <div className="lg:hidden">
                <img src="https://placehold.co/100x30/003366/ffffff?text=S%26P" alt="S&P Logo" className="h-8 rounded" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800 tracking-tight hidden md:block">
                  {activeTab === Tab.SUNNY_CLUB ? 'Sunny Club Rewards' : 
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
                className="relative p-2 text-gray-500 hover:text-pharma-900 transition-colors"
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
