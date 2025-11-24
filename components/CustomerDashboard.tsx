
import React from 'react';
import { Search, Upload, Heart, Activity, ShoppingBag, PlayCircle, Star, ChevronRight } from 'lucide-react';
import { Tab } from '../types';

interface CustomerDashboardProps {
  onNavigate: (tab: Tab) => void;
}

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8">
      {/* Brand Hero & Video */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-pharma-900 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden flex flex-col justify-center">
             <div className="absolute top-0 right-0 p-4 opacity-5">
                <Activity size={300} />
             </div>
             <div className="absolute bottom-0 left-0 h-32 w-32 bg-blue-500/20 blur-3xl rounded-full"></div>
             
             <div className="relative z-10 max-w-lg">
                <div className="mb-4">
                   <img src="https://placehold.co/120x40/003366/ffffff?text=S%26P+USA" alt="S&P Logo" className="rounded shadow-sm" />
                </div>
                <h1 className="text-4xl font-light mb-4 leading-tight">Trusted by Doctors,<br/><span className="font-bold text-blue-200">Loved by You.</span></h1>
                <p className="text-blue-100 mb-8 text-lg">Experience world-class pharmaceutical care delivered to your door.</p>
                <div className="relative">
                    <input 
                        type="text" 
                        placeholder="Search for medicines..." 
                        className="w-full py-4 pl-12 pr-4 rounded-xl text-gray-800 shadow-lg focus:ring-4 focus:ring-blue-400 focus:outline-none"
                        onClick={() => onNavigate(Tab.CATALOG)}
                    />
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
             </div>
          </div>

          <div className="bg-gray-900 rounded-2xl overflow-hidden relative group cursor-pointer shadow-lg">
             <img src="https://placehold.co/400x600/333/999?text=Brand+Ambassador" alt="Brand Ambassador" className="w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
             <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                <div className="flex items-center gap-3 mb-2">
                    <PlayCircle size={48} className="text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
                    <div>
                        <span className="font-bold tracking-wide block uppercase text-sm text-blue-300">Our Mission</span>
                        <span className="font-medium text-lg">Better Health for All</span>
                    </div>
                </div>
                <p className="text-xs text-gray-300 line-clamp-2">Watch our global brand ambassador discuss the future of healthcare with S&P USA.</p>
             </div>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
                onClick={() => onNavigate(Tab.CATALOG)}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-pharma-500 transition-all flex flex-col items-center gap-2 text-center group"
            >
                <div className="h-12 w-12 bg-blue-50 text-pharma-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ShoppingBag size={24} />
                </div>
                <span className="font-bold text-gray-700 group-hover:text-pharma-900">Medicines</span>
            </button>
            <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-pharma-500 transition-all flex flex-col items-center gap-2 text-center group">
                <div className="h-12 w-12 bg-purple-50 text-purple-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Activity size={24} />
                </div>
                <span className="font-bold text-gray-700 group-hover:text-pharma-900">Lab Tests</span>
            </button>
            <button 
                onClick={() => onNavigate(Tab.UPLOAD_RX)}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-pharma-500 transition-all flex flex-col items-center gap-2 text-center group"
            >
                <div className="h-12 w-12 bg-teal-50 text-teal-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload size={24} />
                </div>
                <span className="font-bold text-gray-700 group-hover:text-pharma-900">Upload Rx</span>
            </button>
            <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-pharma-500 transition-all flex flex-col items-center gap-2 text-center group">
                <div className="h-12 w-12 bg-red-50 text-red-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Heart size={24} />
                </div>
                <span className="font-bold text-gray-700 group-hover:text-pharma-900">Care Plan</span>
            </button>
          </div>

          {/* Loyalty Widget */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100 flex flex-col justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 -mt-2 -mr-2 text-amber-100 opacity-50">
                <Star size={100} fill="currentColor" />
             </div>
             <div className="flex justify-between items-start relative z-10">
                 <div>
                    <h3 className="font-bold text-amber-900">S&P Rewards</h3>
                    <p className="text-xs text-amber-700">My Balance</p>
                 </div>
                 <div className="bg-white p-2 rounded-full shadow-sm text-amber-500">
                    <Star fill="currentColor" size={20} />
                 </div>
             </div>
             <div className="relative z-10">
                <span className="text-3xl font-bold text-amber-900">240</span>
                <span className="text-sm font-medium text-amber-700 ml-1">pts</span>
             </div>
             <button 
                onClick={() => onNavigate(Tab.LOYALTY)}
                className="mt-3 w-full bg-white text-amber-900 text-sm font-bold py-2 rounded-lg shadow-sm hover:bg-amber-100 flex items-center justify-center gap-1 relative z-10"
             >
                View Rewards <ChevronRight size={14} />
             </button>
          </div>
      </div>

      {/* Featured Categories */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Diabetes', 'Cardiac', 'Stomach', 'Pain Relief', 'Vitamins', 'Skin Care'].map((cat, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 text-center hover:border-pharma-500 cursor-pointer transition-colors group">
                    <img src={`https://placehold.co/100x100?text=${cat.substring(0,2)}`} alt={cat} className="mx-auto mb-2 rounded-full h-16 w-16 opacity-80 group-hover:opacity-100 transition-opacity" />
                    <span className="font-medium text-gray-700 text-sm group-hover:text-pharma-900">{cat}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;