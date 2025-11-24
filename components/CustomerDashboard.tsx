
import React from 'react';
import { Search, Upload, Percent, Heart, Activity, ShoppingBag, PlayCircle, Star, ChevronRight } from 'lucide-react';
import { Tab } from '../types';

interface CustomerDashboardProps {
  onNavigate: (tab: Tab) => void;
}

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8">
      {/* Brand Hero & Video */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#003366] rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Activity size={200} />
             </div>
             <div className="relative z-10 max-w-lg">
                <h1 className="text-4xl font-light mb-4 leading-tight">Trusted by Doctors,<br/><span className="font-bold">Loved by You.</span></h1>
                <p className="text-blue-100 mb-8 text-lg">Experience world-class pharmaceutical care with S&P USA.</p>
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

          <div className="bg-gray-900 rounded-2xl overflow-hidden relative group cursor-pointer">
             <img src="https://placehold.co/400x300/333/999?text=Brand+Ambassador" alt="Brand Ambassador" className="w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
             <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <PlayCircle size={48} className="mb-2 drop-shadow-lg" />
                <span className="font-bold tracking-wide">Our Mission</span>
                <span className="text-xs text-gray-300">Watch the film</span>
             </div>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
                onClick={() => onNavigate(Tab.CATALOG)}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-300 transition-all flex flex-col items-center gap-2 text-center group"
            >
                <div className="h-12 w-12 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ShoppingBag size={24} />
                </div>
                <span className="font-bold text-gray-700">Medicines</span>
            </button>
            <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-300 transition-all flex flex-col items-center gap-2 text-center group">
                <div className="h-12 w-12 bg-purple-50 text-purple-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Activity size={24} />
                </div>
                <span className="font-bold text-gray-700">Lab Tests</span>
            </button>
            <button 
                onClick={() => onNavigate(Tab.UPLOAD_RX)}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-teal-300 transition-all flex flex-col items-center gap-2 text-center group"
            >
                <div className="h-12 w-12 bg-teal-50 text-teal-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload size={24} />
                </div>
                <span className="font-bold text-gray-700">Upload Rx</span>
            </button>
            <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-red-300 transition-all flex flex-col items-center gap-2 text-center group">
                <div className="h-12 w-12 bg-red-50 text-red-900 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Heart size={24} />
                </div>
                <span className="font-bold text-gray-700">Care Plan</span>
            </button>
          </div>

          {/* Loyalty Widget */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-100 flex flex-col justify-between">
             <div className="flex justify-between items-start">
                 <div>
                    <h3 className="font-bold text-yellow-900">S&P Rewards</h3>
                    <p className="text-xs text-yellow-700">My Balance</p>
                 </div>
                 <div className="bg-white p-2 rounded-full shadow-sm text-yellow-500">
                    <Star fill="currentColor" size={20} />
                 </div>
             </div>
             <div>
                <span className="text-3xl font-bold text-yellow-900">240</span>
                <span className="text-sm font-medium text-yellow-700 ml-1">pts</span>
             </div>
             <button 
                onClick={() => onNavigate(Tab.LOYALTY)}
                className="mt-3 w-full bg-white text-yellow-800 text-sm font-bold py-2 rounded-lg shadow-sm hover:bg-yellow-100 flex items-center justify-center gap-1"
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
                <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 text-center hover:border-blue-500 cursor-pointer transition-colors group">
                    <img src={`https://placehold.co/100x100?text=${cat.substring(0,2)}`} alt={cat} className="mx-auto mb-2 rounded-full h-16 w-16 opacity-80 group-hover:opacity-100 transition-opacity" />
                    <span className="font-medium text-gray-700 text-sm">{cat}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
