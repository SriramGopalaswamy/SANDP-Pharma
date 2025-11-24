
import React from 'react';
import { ShieldCheck, Store, Truck, User } from 'lucide-react';
import { UserRole } from '../types';

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-pharma-50 flex flex-col items-center justify-center p-4">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-xl bg-pharma-600 text-white mb-4 shadow-lg">
          <span className="text-2xl font-bold">SP</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">SANDP Pharma</h1>
        <p className="text-gray-500 mt-2 text-lg">Unified Commerce Platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
        {/* Admin Card */}
        <button
          onClick={() => onLogin('admin')}
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl border-2 border-transparent hover:border-blue-500 transition-all group text-left"
        >
          <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <ShieldCheck size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Admin Portal</h2>
          <p className="text-sm text-gray-500">
            Internal ops, inventory, and KYC management.
          </p>
        </button>

        {/* Distributor Card */}
        <button
          onClick={() => onLogin('distributor')}
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl border-2 border-transparent hover:border-purple-500 transition-all group text-left"
        >
          <div className="h-10 w-10 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Truck size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Distributor (Bulk)</h2>
          <p className="text-sm text-gray-500">
            High volume procurement with MOQ constraints.
          </p>
        </button>

        {/* Retailer Card */}
        <button
          onClick={() => onLogin('retailer')}
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl border-2 border-transparent hover:border-emerald-500 transition-all group text-left"
        >
          <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Store size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Retailer App</h2>
          <p className="text-sm text-gray-500">
            Pharmacy stores, credit limits, and standard catalog.
          </p>
        </button>

        {/* Customer Card */}
        <button
          onClick={() => onLogin('customer')}
          className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl border-2 border-transparent hover:border-orange-500 transition-all group text-left"
        >
          <div className="h-10 w-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <User size={24} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">End Customer (B2C)</h2>
          <p className="text-sm text-gray-500">
            B2C experience similar to 1mg/Pharmeasy.
          </p>
        </button>
      </div>
      
      <p className="mt-12 text-gray-400 text-sm">Select a role to simulate the experience.</p>
    </div>
  );
};

export default LoginScreen;
