
import React from 'react';
import { Search, Upload, Heart, Activity, ShoppingBag, PlayCircle, Star, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Tab } from '../types';

interface CustomerDashboardProps {
  onNavigate: (tab: Tab) => void;
}

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Brand Hero & Video Section - S&P USA Style */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Hero - 8 Cols */}
          <div className="lg:col-span-8 bg-gradient-to-r from-[#003366] to-[#004080] rounded-2xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden flex flex-col justify-center min-h-[420px]">
             {/* Background Elements */}
             <div className="absolute top-0 right-0 opacity-10 transform scale-125 translate-x-10 -translate-y-10">
                <img src="https://placehold.co/400x400/ffffff/ffffff?text=S%26P" alt="Watermark" className="rounded-full" />
             </div>
             <div className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
             
             <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded-full border border-yellow-300 mb-6 shadow-sm">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-bold uppercase tracking-wider">Sunny Club Exclusive</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
                    Your Health,<br/>
                    <span className="text-blue-300 font-light">Our Promise.</span>
                </h1>
                <p className="text-blue-100 mb-8 text-lg max-w-lg leading-relaxed font-light">
                    Join Sunny Leone and the S&P family in our mission to make world-class healthcare accessible to every home.
                </p>
                
                <div className="relative max-w-lg group">
                    <input 
                        type="text" 
                        placeholder="Search for medicines, brands, or symptoms..." 
                        className="w-full py-4 pl-14 pr-4 rounded-full text-gray-800 shadow-2xl focus:ring-4 focus:ring-yellow-400 focus:outline-none transition-all border-none"
                        onClick={() => onNavigate(Tab.CATALOG)}
                    />
                    <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-pharma-900 group-hover:scale-110 transition-transform" size={24} />
                    <button className="absolute right-2 top-2 bottom-2 bg-pharma-900 text-white px-6 rounded-full font-bold hover:bg-pharma-800 transition-colors">
                        Search
                    </button>
                </div>
             </div>
          </div>

          {/* Sunny Leone / Brand Ambassador Feature - 4 Cols */}
          <div className="lg:col-span-4 flex flex-col gap-6">
              
              <div className="flex-1 bg-black rounded-2xl overflow-hidden relative group cursor-pointer shadow-lg border border-gray-800">
                 {/* Simulated Sunny Leone Thumbnail */}
                 <img src="https://placehold.co/400x600/333/fff?text=Sunny+Leone+Video" alt="Sunny Leone" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
                 
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl border-4 border-white/20">
                        <PlayCircle size={32} className="text-white fill-white" />
                    </div>
                 </div>

                 <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black via-black/80 to-transparent">
                    <h3 className="text-white font-bold text-xl leading-tight mb-1">"Why I choose S&P."</h3>
                    <p className="text-yellow-400 text-xs uppercase tracking-widest font-bold">Watch Sunny's Story</p>
                 </div>
              </div>

              {/* Loyalty Widget */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm flex items-center justify-between">
                 <div>
                    <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide flex items-center gap-2">
                        <Star size={16} className="text-yellow-500" fill="currentColor" /> Sunny Club
                    </h4>
                    <div className="text-xs text-gray-500 mt-1">Earn coins on every order</div>
                 </div>
                 <button 
                    onClick={() => onNavigate(Tab.LOYALTY)}
                    className="bg-pharma-50 text-pharma-900 px-4 py-2 rounded-lg text-xs font-bold hover:bg-pharma-100 transition-colors"
                 >
                    View Wallet
                 </button>
              </div>

          </div>
      </div>

      {/* Quick Access Grid */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Activity size={20} className="text-pharma-600" /> Essentials
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickAction icon={ShoppingBag} color="text-white" bg="bg-blue-600" label="Order Medicines" desc="Flat 15% Off" onClick={() => onNavigate(Tab.CATALOG)} />
            <QuickAction icon={Upload} color="text-teal-700" bg="bg-teal-100" label="Upload Prescription" desc="We digitize for you" onClick={() => onNavigate(Tab.UPLOAD_RX)} />
            <QuickAction icon={Activity} color="text-purple-700" bg="bg-purple-100" label="Book Lab Tests" desc="Home Collection" />
            <QuickAction icon={Heart} color="text-red-700" bg="bg-red-100" label="Health Plans" desc="Family Care" />
        </div>
      </div>

      {/* Trust Markers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-100 pt-8">
          <TrustItem title="100% Genuine Products" desc="Sourced directly from manufacturers" />
          <TrustItem title="Secure Payments" desc="PCI-DSS Compliant Gateway" />
          <TrustItem title="Easy Returns" desc="No questions asked policy" />
      </div>
    </div>
  );
};

const QuickAction = ({ icon: Icon, color, bg, label, desc, onClick }: any) => (
    <button 
        onClick={onClick}
        className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all text-left group"
    >
        <div className={`h-12 w-12 ${bg} ${color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner`}>
            <Icon size={24} />
        </div>
        <h3 className="font-bold text-gray-900">{label}</h3>
        <p className="text-xs text-gray-500 mt-1">{desc}</p>
    </button>
);

const TrustItem = ({ title, desc }: any) => (
    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
        <div className="h-8 w-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
            <CheckCircle2 size={16} />
        </div>
        <div>
            <h4 className="font-bold text-gray-900 text-sm">{title}</h4>
            <p className="text-xs text-gray-500">{desc}</p>
        </div>
    </div>
);

export default CustomerDashboard;
