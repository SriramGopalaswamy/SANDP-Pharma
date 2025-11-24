
import React from 'react';
import { Search, Upload, Percent, Heart, Activity, ShoppingBag } from 'lucide-react';
import { Tab } from '../types';

interface CustomerDashboardProps {
  onNavigate: (tab: Tab) => void;
}

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8">
      {/* Search Hero */}
      <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-2xl p-8 text-white shadow-lg text-center md:text-left">
        <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Health, Delivered.</h1>
            <p className="text-emerald-50 mb-6 text-lg">Flat 20% off on your first order + Free Delivery</p>
            
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Search for medicines, lab tests, doctors..." 
                    className="w-full py-4 pl-12 pr-4 rounded-xl text-gray-800 shadow-lg focus:ring-4 focus:ring-emerald-300 focus:outline-none"
                    onClick={() => onNavigate(Tab.CATALOG)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col items-center gap-2 text-center">
            <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <ShoppingBag size={24} />
            </div>
            <span className="font-bold text-gray-700">Medicines</span>
        </button>
        <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col items-center gap-2 text-center">
            <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                <Activity size={24} />
            </div>
            <span className="font-bold text-gray-700">Lab Tests</span>
        </button>
        <button 
            onClick={() => onNavigate(Tab.UPLOAD_RX)}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col items-center gap-2 text-center"
        >
            <div className="h-12 w-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center">
                <Upload size={24} />
            </div>
            <span className="font-bold text-gray-700">Upload Rx</span>
        </button>
        <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col items-center gap-2 text-center">
            <div className="h-12 w-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                <Heart size={24} />
            </div>
            <span className="font-bold text-gray-700">Care Plan</span>
        </button>
      </div>

      {/* Offers Banner */}
      <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center">
                <Percent size={28} />
            </div>
            <div>
                <h3 className="font-bold text-orange-900 text-lg">Mega Health Festival</h3>
                <p className="text-orange-700">Extra 15% cashback via Cred Pay</p>
            </div>
        </div>
        <button 
            onClick={() => onNavigate(Tab.CATALOG)}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600"
        >
            Shop Now
        </button>
      </div>

      {/* Featured Categories */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Diabetes', 'Cardiac', 'Stomach', 'Pain Relief', 'Vitamins', 'Skin Care'].map((cat, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 text-center hover:border-emerald-500 cursor-pointer transition-colors">
                    <img src={`https://placehold.co/100x100?text=${cat.substring(0,2)}`} alt={cat} className="mx-auto mb-2 rounded-full h-16 w-16 opacity-80" />
                    <span className="font-medium text-gray-700 text-sm">{cat}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
