
import React from 'react';
import { CreditCard, Package, Truck, Activity } from 'lucide-react';

const DistributorDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Distributor Portal</h2>
        <p className="text-gray-500">Global Meds Supply Chain (Distributor ID: DST-992)</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-800 to-indigo-900 rounded-xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-purple-200 text-sm font-medium">Bulk Credit Limit</p>
              <h3 className="text-3xl font-bold mt-1">₹45,00,000</h3>
            </div>
            <CreditCard className="text-purple-300" />
          </div>
          <div className="w-full bg-black/20 rounded-full h-2 mb-2">
            <div className="bg-white/90 h-2 rounded-full" style={{ width: '20%' }}></div>
          </div>
          <p className="text-xs text-purple-200">Used: ₹9L • Available: ₹36L</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-500 text-sm font-medium">Active Bulk Shipments</p>
              <h3 className="text-3xl font-bold mt-1 text-gray-900">2</h3>
            </div>
            <Truck className="text-purple-500" />
          </div>
          <p className="text-sm text-gray-600">Next Delivery: Tomorrow, 10 AM (Truck #TRK-99)</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-500 text-sm font-medium">Volume Rebate</p>
              <h3 className="text-3xl font-bold mt-1 text-gray-900">3.5%</h3>
            </div>
            <Activity className="text-green-500" />
          </div>
          <p className="text-sm text-gray-600">Current tier: Gold. Reach ₹1Cr for 4%.</p>
        </div>
      </div>

      {/* Quick Actions for Distributor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 flex items-center justify-between">
            <div>
                <h3 className="font-bold text-purple-900">Bulk Order Upload</h3>
                <p className="text-sm text-purple-700">Upload CSV for >100 SKUs</p>
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Upload</button>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex items-center justify-between">
            <div>
                <h3 className="font-bold text-blue-900">Download Price List</h3>
                <p className="text-sm text-blue-700">Updated daily at 8:00 AM</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Download PDF</button>
        </div>
      </div>
    </div>
  );
};

export default DistributorDashboard;
