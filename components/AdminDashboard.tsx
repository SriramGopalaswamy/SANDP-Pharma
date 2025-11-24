
import React from 'react';
import { Metric } from '../types';
import { TrendingUp, TrendingDown, Users, DollarSign, Package, AlertTriangle, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const AdminDashboard: React.FC = () => {
  const metrics: Metric[] = [
    { label: 'Total Revenue (MTD)', value: '₹1.14 Cr', trend: 12.5, status: 'up' },
    { label: 'Active Retailers', value: '452', trend: 8.2, status: 'up' },
    { label: 'Pending KYC', value: '18', trend: -2.4, status: 'down' },
    { label: 'Low Stock SKUs', value: '24', trend: 5.1, status: 'neutral' },
  ];

  const chartData = [
    { name: 'Mon', revenue: 320000, orders: 24 },
    { name: 'Tue', revenue: 240000, orders: 18 },
    { name: 'Wed', revenue: 160000, orders: 12 },
    { name: 'Thu', revenue: 224000, orders: 32 },
    { name: 'Fri', revenue: 471000, orders: 45 },
    { name: 'Sat', revenue: 672000, orders: 60 },
    { name: 'Sun', revenue: 519000, orders: 50 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
        <p className="text-gray-500">Real-time insights into SANDP operations.</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">{metric.label}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</h3>
              </div>
              <div className={`p-2 rounded-lg ${
                metric.status === 'up' ? 'bg-green-50 text-green-600' : 
                metric.status === 'down' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
              }`}>
                 {metric.status === 'up' ? <TrendingUp size={20} /> : 
                  metric.status === 'down' ? <TrendingDown size={20} /> : <AlertTriangle size={20} />}
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={`font-medium ${
                 metric.status === 'up' ? 'text-green-600' : 
                 metric.status === 'down' ? 'text-red-600' : 'text-orange-600'
              }`}>
                {metric.trend > 0 ? '+' : ''}{metric.trend}%
              </span>
              <span className="text-gray-400 ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <h3 className="text-lg font-bold text-gray-800 mb-6">Revenue Trend (INR)</h3>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={chartData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} tickFormatter={(val) => `₹${val/1000}k`} />
                 <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
                 <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
           <h3 className="text-lg font-bold text-gray-800 mb-6">Order Volume</h3>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={chartData}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                 <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                 <Tooltip cursor={{fill: '#f0f9ff'}} />
                 <Bar dataKey="orders" fill="#0369a1" radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Action Required */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Pending Actions</h3>
          <button className="text-sm text-pharma-600 font-medium hover:text-pharma-800">View All</button>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            { title: "KYC Verification", desc: "City Pharma uploaded new Drug License", time: "2h ago", type: "kyc" },
            { title: "High Value Order", desc: "Order #9090 requires credit approval (₹9.6L)", time: "4h ago", type: "credit" },
            { title: "Stock Alert", desc: "Paracetamol 500mg below safety stock in DC-1", time: "5h ago", type: "stock" }
          ].map((item, i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
               <div className="flex items-start gap-4">
                 <div className={`mt-1 h-2 w-2 rounded-full ${
                   item.type === 'kyc' ? 'bg-blue-500' : item.type === 'credit' ? 'bg-purple-500' : 'bg-orange-500'
                 }`} />
                 <div>
                   <h4 className="font-medium text-gray-900">{item.title}</h4>
                   <p className="text-sm text-gray-500">{item.desc}</p>
                 </div>
               </div>
               <div className="flex items-center gap-4">
                 <span className="text-xs text-gray-400">{item.time}</span>
                 <button className="p-2 text-gray-400 hover:text-pharma-600 hover:bg-pharma-50 rounded-full">
                    <ArrowRight size={18} />
                 </button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
