
import React from 'react';
import { CreditCard, Truck, Activity, Building2 } from 'lucide-react';

interface DistributorDashboardProps {
  points: number;
}

const DistributorDashboard: React.FC<DistributorDashboardProps> = ({ points }) => {
  return (
    <div className="space-y-8">
      {/* Branded Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-pharma-900 rounded-xl p-8 text-white shadow-lg relative overflow-hidden">
         <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-12 pointer-events-none"></div>
         <div className="relative z-10 flex items-center gap-6">
             <div className="h-20 w-20 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
                <Building2 size={40} />
             </div>
             <div>
                <h2 className="text-3xl font-light tracking-wide">DISTRIBUTOR <span className="font-bold">PORTAL</span></h2>
                <p className="text-slate-300">Global Meds Supply Chain (Distributor ID: DST-992)</p>
                <div className="flex gap-4 mt-4">
                    <span className="text-xs bg-white/10 px-2 py-1 rounded border border-white/10">Bulk Partner</span>
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded border border-green-500/30">Active Status</span>
                </div>
             </div>
         </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border-l-4 border-purple-800 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-500 text-sm font-medium">Bulk Credit Limit</p>
              <h3 className="text-3xl font-bold mt-1 text-gray-900">₹45,00,000</h3>
            </div>
            <CreditCard className="text-purple-800" />
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
            <div className="bg-purple-800 h-2 rounded-full" style={{ width: '20%' }}></div>
          </div>
          <p className="text-xs text-gray-400">Used: ₹9L • Available: ₹36L</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-500 text-sm font-medium">Active Bulk Shipments</p>
              <h3 className="text-3xl font-bold mt-1 text-gray-900">2</h3>
            </div>
            <Truck className="text-pharma-900" />
          </div>
          <p className="text-sm text-gray-600">Next Delivery: Tomorrow, 10 AM (Truck #TRK-99)</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-500 text-sm font-medium">Loyalty Points</p>
              <h3 className="text-3xl font-bold mt-1 text-gray-900">{points.toLocaleString()} pts</h3>
            </div>
            <Activity className="text-green-600" />
          </div>
          <p className="text-sm text-gray-600">Current tier: Platinum. 2x Points Active.</p>
        </div>
      </div>

      {/* Quick Actions for Distributor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex items-center justify-between hover:border-pharma-900 transition-colors group cursor-pointer">
            <div>
                <h3 className="font-bold text-slate-900 group-hover:text-pharma-900 transition-colors">Bulk Order Upload</h3>
                <p className="text-sm text-slate-600">Upload CSV for >100 SKUs</p>
            </div>
            <button className="px-4 py-2 bg-slate-800 text-white rounded-lg group-hover:bg-pharma-900 transition-colors">Upload</button>
        </div>
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex items-center justify-between hover:border-pharma-900 transition-colors group cursor-pointer">
            <div>
                <h3 className="font-bold text-slate-900 group-hover:text-pharma-900 transition-colors">Download Price List</h3>
                <p className="text-sm text-slate-600">Updated daily at 8:00 AM</p>
            </div>
            <button className="px-4 py-2 bg-slate-800 text-white rounded-lg group-hover:bg-pharma-900 transition-colors">Download PDF</button>
        </div>
      </div>
    </div>
  );
};

export default DistributorDashboard;