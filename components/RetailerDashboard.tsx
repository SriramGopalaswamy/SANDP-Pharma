
import React from 'react';
import { CreditCard, Package, ChevronRight } from 'lucide-react';

const RetailerDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Welcome back, Raj!</h2>
        <p className="text-gray-500">City Pharma (Lic: DL-KA-01-2024)</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-pharma-600 to-pharma-800 rounded-xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-pharma-100 text-sm font-medium">Available Credit</p>
              <h3 className="text-3xl font-bold mt-1">$12,450</h3>
            </div>
            <CreditCard className="text-pharma-200" />
          </div>
          <div className="w-full bg-pharma-900/30 rounded-full h-2 mb-2">
            <div className="bg-white/80 h-2 rounded-full" style={{ width: '70%' }}></div>
          </div>
          <p className="text-xs text-pharma-200">Limit: $18,000 • Due in 14 days</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-500 text-sm font-medium">Active Orders</p>
              <h3 className="text-3xl font-bold mt-1 text-gray-900">3</h3>
            </div>
            <Package className="text-pharma-500" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>ORD-9090 (Out for Delivery)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <span>ORD-9112 (Processing)</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-gray-500 text-sm font-medium">Loyalty Points</p>
              <h3 className="text-3xl font-bold mt-1 text-gray-900">850 pts</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
              <span className="font-bold text-lg">★</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">Next Reward: $50 voucher at 1000 pts</p>
          <button className="text-pharma-600 text-sm font-bold mt-2 hover:underline">View Rewards</button>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Recent Orders</h3>
          <button className="text-pharma-600 text-sm font-medium flex items-center gap-1 hover:text-pharma-800">
            View All <ChevronRight size={16} />
          </button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Date</th>
              <th className="p-4">Items</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            <tr className="hover:bg-gray-50">
              <td className="p-4 font-medium text-pharma-600">ORD-9090</td>
              <td className="p-4 text-gray-500">Oct 24, 2023</td>
              <td className="p-4 text-gray-900">24 Items</td>
              <td className="p-4 font-medium">$1,240.50</td>
              <td className="p-4"><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold">Shipped</span></td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="p-4 font-medium text-pharma-600">ORD-8821</td>
              <td className="p-4 text-gray-500">Oct 18, 2023</td>
              <td className="p-4 text-gray-900">12 Items</td>
              <td className="p-4 font-medium">$450.00</td>
              <td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">Delivered</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RetailerDashboard;
