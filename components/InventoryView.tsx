import React from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const InventoryView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <div>
           <h2 className="text-2xl font-bold text-gray-800">Inventory Status</h2>
           <p className="text-gray-500">Real-time stock levels across Distribution Centers (DC).</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Summary Cards */}
         <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="text-gray-500 text-sm font-medium">Total SKUs</h4>
            <p className="text-2xl font-bold text-gray-900 mt-2">12,450</p>
         </div>
         <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="text-gray-500 text-sm font-medium">Low Stock Alerts</h4>
            <div className="flex items-center gap-2 mt-2 text-orange-600">
               <AlertTriangle size={24} />
               <p className="text-2xl font-bold">24</p>
            </div>
         </div>
         <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <h4 className="text-gray-500 text-sm font-medium">Sync Status (ERP)</h4>
            <div className="flex items-center gap-2 mt-2 text-green-600">
               <CheckCircle size={24} />
               <p className="text-xl font-bold">Healthy</p>
               <span className="text-xs text-gray-400 ml-auto">Last sync: 2m ago</span>
            </div>
         </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
           <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                 <th className="p-4">SKU Code</th>
                 <th className="p-4">Product Name</th>
                 <th className="p-4">DC-1 (North)</th>
                 <th className="p-4">DC-2 (South)</th>
                 <th className="p-4">Total Stock</th>
                 <th className="p-4">Status</th>
              </tr>
           </thead>
           <tbody className="divide-y divide-gray-100 text-sm">
              {[
                 { sku: 'PCM-500-T', name: 'Paracetamol 500mg (Tabs)', dc1: 5000, dc2: 2400, status: 'In Stock' },
                 { sku: 'AMX-250-S', name: 'Amoxicillin 250mg (Syrup)', dc1: 120, dc2: 40, status: 'Low Stock' },
                 { sku: 'IBU-400-T', name: 'Ibuprofen 400mg', dc1: 0, dc2: 0, status: 'Out of Stock' },
                 { sku: 'CTZ-10-T', name: 'Cetirizine 10mg', dc1: 15000, dc2: 8000, status: 'In Stock' },
              ].map((item, i) => (
                 <tr key={i} className="hover:bg-gray-50">
                    <td className="p-4 font-mono text-xs text-gray-500">{item.sku}</td>
                    <td className="p-4 font-medium text-gray-900">{item.name}</td>
                    <td className="p-4 text-gray-700">{item.dc1}</td>
                    <td className="p-4 text-gray-700">{item.dc2}</td>
                    <td className="p-4 font-bold text-gray-900">{item.dc1 + item.dc2}</td>
                    <td className="p-4">
                       <span className={`px-2 py-1 rounded text-xs font-bold ${
                          item.status === 'In Stock' ? 'text-green-700 bg-green-100' :
                          item.status === 'Low Stock' ? 'text-orange-700 bg-orange-100' :
                          'text-red-700 bg-red-100'
                       }`}>
                          {item.status}
                       </span>
                    </td>
                 </tr>
              ))}
           </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryView;