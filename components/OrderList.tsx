import React from 'react';
import { Order } from '../types';
import { Eye, Filter, Download } from 'lucide-react';

const OrderList: React.FC = () => {
  const orders: Order[] = [
    { id: 'ORD-24-001', retailer: 'City Pharma', amount: '$1,250.00', status: 'Pending', date: '2023-10-24', paymentMethod: 'Credit' },
    { id: 'ORD-24-002', retailer: 'MediCare Plus', amount: '$450.50', status: 'Shipped', date: '2023-10-23', paymentMethod: 'Instant' },
    { id: 'ORD-24-003', retailer: 'Green Cross', amount: '$2,890.00', status: 'Processing', date: '2023-10-23', paymentMethod: 'Credit' },
    { id: 'ORD-24-004', retailer: 'Health First', amount: '$125.00', status: 'Delivered', date: '2023-10-22', paymentMethod: 'Instant' },
    { id: 'ORD-24-005', retailer: 'City Pharma', amount: '$800.00', status: 'On Hold', date: '2023-10-22', paymentMethod: 'Credit' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-gray-800">Order Management</h2>
           <p className="text-gray-500">Manage and track retailer orders.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
            <Filter size={18} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-pharma-600 text-white rounded-lg hover:bg-pharma-700 shadow-sm">
            <Download size={18} /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                <th className="p-4">Order ID</th>
                <th className="p-4">Retailer</th>
                <th className="p-4">Date</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-pharma-600">{order.id}</td>
                  <td className="p-4 text-gray-800 font-medium">{order.retailer}</td>
                  <td className="p-4 text-gray-500">{order.date}</td>
                  <td className="p-4 font-medium text-gray-900">{order.amount}</td>
                  <td className="p-4 text-gray-600">
                    <span className="px-2 py-1 rounded bg-gray-100 text-xs border border-gray-200">{order.paymentMethod}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      order.status === 'On Hold' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-gray-400 hover:text-pharma-600 p-1">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
          <span>Showing 5 of 128 orders</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;