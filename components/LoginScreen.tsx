
import React from 'react';
import { ShieldCheck, Store, Truck, User, Box, Headphones, PlayCircle, Star } from 'lucide-react';
import { UserRole } from '../types';

interface LoginScreenProps {
  onLogin: (role: UserRole) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row font-sans">
      
      {/* Left Panel: Role Selection */}
      <div className="flex-1 flex flex-col justify-center p-8 lg:p-16 relative z-10 bg-white">
        <div className="max-w-xl mx-auto w-full space-y-8">
            <div className="mb-8 border-l-4 border-pharma-900 pl-6">
                <img src="https://placehold.co/200x60/003366/ffffff?text=S%26P+USA" alt="S&P USA" className="h-12 mb-4" />
                <h1 className="text-4xl font-light text-gray-900 tracking-tight">
                    Unified <span className="font-bold text-pharma-900">Partner Portal</span>
                </h1>
                <p className="text-gray-500 mt-2 text-lg">Seamless access for our Global Network.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LoginCard 
                    role="admin" 
                    icon={ShieldCheck} 
                    title="Admin & Ops" 
                    desc="Internal Management" 
                    color="text-pharma-900" 
                    bg="bg-pharma-50" 
                    onClick={() => onLogin('admin')} 
                />
                <LoginCard 
                    role="retailer" 
                    icon={Store} 
                    title="Retailer" 
                    desc="Pharmacy Owners" 
                    color="text-emerald-700" 
                    bg="bg-emerald-50" 
                    onClick={() => onLogin('retailer')} 
                />
                <LoginCard 
                    role="distributor" 
                    icon={Truck} 
                    title="Distributor" 
                    desc="Bulk Procurement" 
                    color="text-purple-700" 
                    bg="bg-purple-50" 
                    onClick={() => onLogin('distributor')} 
                />
                <LoginCard 
                    role="customer" 
                    icon={User} 
                    title="Customer" 
                    desc="Patients & D2C" 
                    color="text-teal-700" 
                    bg="bg-teal-50" 
                    onClick={() => onLogin('customer')} 
                />
                <LoginCard 
                    role="stockist" 
                    icon={Box} 
                    title="Stockist" 
                    desc="Warehouse Ops" 
                    color="text-orange-700" 
                    bg="bg-orange-50" 
                    onClick={() => onLogin('stockist')} 
                />
                <LoginCard 
                    role="delivery" 
                    icon={Headphones} 
                    title="Support" 
                    desc="Logistics Team" 
                    color="text-indigo-700" 
                    bg="bg-indigo-50" 
                    onClick={() => onLogin('delivery')} 
                />
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <p>© 2024 S&P Pharmaceuticals USA. All Rights Reserved.</p>
                <div className="flex gap-4">
                    <span className="cursor-pointer hover:text-gray-600">Privacy Policy</span>
                    <span className="cursor-pointer hover:text-gray-600">Terms of Service</span>
                </div>
            </div>
        </div>
      </div>

      {/* Right Panel: Brand Visuals & Sunny Leone */}
      <div className="hidden lg:flex flex-1 bg-[#002244] relative overflow-hidden text-white flex-col justify-between p-16">
         {/* Background Image Effect */}
         <div className="absolute inset-0 opacity-40">
            {/* Simulating a high-end studio shot */}
            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="Lab Background" />
         </div>
         <div className="absolute inset-0 bg-gradient-to-t from-[#002244] via-[#002244]/80 to-transparent"></div>

         <div className="relative z-10 flex justify-end">
             <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                 <Star fill="currentColor" className="text-yellow-400" size={16} />
                 <span className="font-bold text-sm tracking-wide uppercase">Join the Sunny Club</span>
             </div>
         </div>

         <div className="relative z-10 mt-auto">
             <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl border border-white/20 group cursor-pointer relative bg-black">
                 {/* Placeholder for Sunny Leone Video/Image */}
                 <img src="https://placehold.co/800x450/111/fff?text=Sunny+Leone+Campaign+Video" alt="Sunny Leone Brand Ambassador" className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity" />
                 
                 <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                     <div className="h-16 w-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/50">
                         <PlayCircle size={40} className="text-white ml-1" />
                     </div>
                 </div>
                 
                 <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/60 to-transparent">
                     <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full border-2 border-white overflow-hidden">
                             <img src="https://placehold.co/100x100/333/fff?text=SL" alt="Sunny Leone" className="object-cover" />
                        </div>
                        <div>
                             <p className="font-serif italic text-lg text-gray-100">"S&P USA isn't just about medicine, it's about trust."</p>
                             <p className="font-bold text-xs uppercase tracking-widest text-yellow-400">— Sunny Leone, Brand Ambassador</p>
                        </div>
                     </div>
                 </div>
             </div>
             
             <h2 className="text-3xl font-light leading-tight">Global Quality.<br/><span className="font-bold text-blue-200">Local Care.</span></h2>
         </div>
      </div>

    </div>
  );
};

const LoginCard = ({ role, icon: Icon, title, desc, color, bg, onClick }: any) => (
    <button 
        onClick={onClick}
        className="text-left p-4 rounded-xl border border-gray-100 hover:border-pharma-200 hover:shadow-lg transition-all group bg-white relative overflow-hidden"
    >
        <div className={`absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity text-pharma-300`}>
            <Icon size={40} className="transform rotate-12 translate-x-2 -translate-y-2" />
        </div>
        <div className={`h-10 w-10 ${bg} ${color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform relative z-10`}>
            <Icon size={20} />
        </div>
        <h3 className="font-bold text-gray-900 relative z-10">{title}</h3>
        <p className="text-xs text-gray-500 mt-1 relative z-10">{desc}</p>
    </button>
);

export default LoginScreen;
