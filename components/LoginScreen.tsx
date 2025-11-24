
import React from 'react';
import { ShieldCheck, Store, Truck, User } from 'lucide-react';
import { UserRole } from '../types';

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="mb-10 text-center">
        {/* S&P USA Branding Placeholder */}
        <div className="mb-8 flex justify-center">
             <img src="https://placehold.co/220x80/003366/ffffff?text=S%26P+USA" alt="S&P USA" className="shadow-2xl rounded-lg" />
        </div>
        <h1 className="text-3xl font-light text-gray-800 tracking-wide uppercase">Unified Commerce Platform</h1>
        <p className="text-pharma-500 text-sm mt-2 font-medium tracking-wider">SECURE ACCESS PORTAL</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
        {/* Admin Card */}
        <button
          onClick={() => onLogin('admin')}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-pharma-900 transition-all group text-left relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <ShieldCheck size={80} className="text-pharma-900" />
          </div>
          <div className="h-12 w-12 bg-pharma-50 text-pharma-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <ShieldCheck size={28} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Admin Portal</h2>
          <p className="text-sm text-gray-500">
            Internal ops, inventory, and KYC management.
          </p>
        </button>

        {/* Distributor Card */}
        <button
          onClick={() => onLogin('distributor')}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-purple-600 transition-all group text-left relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <Truck size={80} className="text-purple-900" />
          </div>
          <div className="h-12 w-12 bg-purple-50 text-purple-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Truck size={28} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Distributor (Bulk)</h2>
          <p className="text-sm text-gray-500">
            High volume procurement with MOQ constraints.
          </p>
        </button>

        {/* Retailer Card */}
        <button
          onClick={() => onLogin('retailer')}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-pharma-500 transition-all group text-left relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <Store size={80} className="text-pharma-900" />
          </div>
          <div className="h-12 w-12 bg-blue-50 text-pharma-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Store size={28} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Retailer App</h2>
          <p className="text-sm text-gray-500">
            Pharmacy stores, credit limits, and standard catalog.
          </p>
        </button>

        {/* Customer Card */}
        <button
          onClick={() => onLogin('customer')}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-teal-500 transition-all group text-left relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
             <User size={80} className="text-teal-900" />
          </div>
          <div className="h-12 w-12 bg-teal-50 text-teal-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <User size={28} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">End Customer (B2C)</h2>
          <p className="text-sm text-gray-500">
            D2C Experience for patients and consumers.
          </p>
        </button>
      </div>
      
      <p className="mt-12 text-gray-400 text-sm">© 2024 S&P Pharmaceuticals. All Rights Reserved.</p>
    </div>
  );
};

export default LoginScreen;