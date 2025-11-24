
import React, { useState } from 'react';
import { Gift, Users, TrendingUp, AlertCircle, Plus, Edit2, Trash2, CheckCircle } from 'lucide-react';

interface AdminLoyaltyManagerProps {
  onAdjustPoints?: (role: string, amount: number, type: 'add' | 'sub') => void;
}

const AdminLoyaltyManager: React.FC<AdminLoyaltyManagerProps> = ({ onAdjustPoints }) => {
  const [allocationSuccess, setAllocationSuccess] = useState(false);
  const [selectedRole, setSelectedRole] = useState('retailer');
  const [amount, setAmount] = useState<string>('500');
  const [actionType, setActionType] = useState<'add' | 'sub'>('add');

  // Mock data for rewards
  const [rewards, setRewards] = useState([
    { id: 1, title: '₹500 Store Credit', cost: 500, type: 'Voucher', status: 'Active' },
    { id: 2, title: 'Free Delivery', cost: 200, type: 'Service', status: 'Active' },
    { id: 3, title: 'Marketing Kit', cost: 1500, type: 'Physical', status: 'Active' },
    { id: 4, title: 'Bulk Discount (1%)', cost: 10000, type: 'Discount', status: 'Active' },
    { id: 5, title: 'Health Checkup', cost: 800, type: 'Service', status: 'Active' },
  ]);

  const handleAllocate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onAdjustPoints && amount) {
        onAdjustPoints(selectedRole, parseInt(amount), actionType);
        setAllocationSuccess(true);
        setTimeout(() => setAllocationSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Loyalty Program Management</h2>
        <p className="text-gray-500">Manage rewards, configure rules, and handle customer support issues.</p>
      </div>

      {/* Program Health Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Outstanding Liability</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">1.2M Pts</h3>
              <p className="text-xs text-gray-400 mt-1">≈ ₹6,00,000 value</p>
            </div>
            <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
               <AlertCircle size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Redemption Rate</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">68%</h3>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                 <TrendingUp size={12} /> +5% this month
              </p>
            </div>
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
               <TrendingUp size={20} />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Participants</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">842</h3>
              <p className="text-xs text-gray-400 mt-1">Retailers & Customers</p>
            </div>
            <div className="bg-green-100 p-2 rounded-lg text-green-600">
               <Users size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Rewards Configuration */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">Active Rewards</h3>
                <button className="flex items-center gap-1 text-sm bg-pharma-600 text-white px-3 py-1.5 rounded-lg hover:bg-pharma-700">
                    <Plus size={16} /> Add New
                </button>
             </div>
             <table className="w-full text-left text-sm">
                 <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                    <tr>
                        <th className="p-4">Title</th>
                        <th className="p-4">Cost (Pts)</th>
                        <th className="p-4">Type</th>
                        <th className="p-4 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                    {rewards.map(r => (
                        <tr key={r.id} className="hover:bg-gray-50">
                            <td className="p-4 font-medium text-gray-900">{r.title}</td>
                            <td className="p-4 text-gray-600">{r.cost.toLocaleString()}</td>
                            <td className="p-4">
                                <span className="px-2 py-1 bg-gray-100 rounded text-xs border border-gray-200">{r.type}</span>
                            </td>
                            <td className="p-4 flex justify-end gap-2">
                                <button className="p-1 text-gray-400 hover:text-blue-600"><Edit2 size={16} /></button>
                                <button className="p-1 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                            </td>
                        </tr>
                    ))}
                 </tbody>
             </table>
          </div>

          <div className="space-y-8">
             {/* Rules Engine Preview */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800">Earning Rules</h3>
                    <button className="text-pharma-600 text-sm font-medium">Edit Rules</button>
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div>
                            <p className="font-bold text-gray-800 text-sm">Retailer Standard</p>
                            <p className="text-xs text-gray-500">1 Point per ₹100 spent</p>
                        </div>
                        <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div>
                            <p className="font-bold text-gray-800 text-sm">Distributor Bulk Bonus</p>
                            <p className="text-xs text-gray-500">2 Points per ₹100 spent (Order > ₹1L)</p>
                        </div>
                        <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <div>
                            <p className="font-bold text-gray-800 text-sm">B2C User</p>
                            <p className="text-xs text-gray-500">1 Point per ₹100 spent</p>
                        </div>
                        <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                    </div>
                </div>
             </div>

             {/* Manual Adjustment Tool */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-800 mb-4">Manual Point Allocation</h3>
                {allocationSuccess ? (
                    <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center gap-2 mb-4">
                        <CheckCircle size={20} />
                        <span>Points allocated successfully!</span>
                    </div>
                ) : (
                    <form onSubmit={handleAllocate} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select User</label>
                            <select 
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-pharma-500 focus:outline-none"
                            >
                                <option value="retailer">Raj StoreOwner (Retailer)</option>
                                <option value="customer">Anita Kumar (Customer)</option>
                                <option value="distributor">Global Supply (Distributor)</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
                                <select 
                                    value={actionType}
                                    onChange={(e) => setActionType(e.target.value as 'add' | 'sub')}
                                    className="w-full border border-gray-300 rounded-lg p-2"
                                >
                                    <option value="add">Credit (+)</option>
                                    <option value="sub">Debit (-)</option>
                                </select>
                             </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
                                <input 
                                    type="number" 
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-2" 
                                    placeholder="e.g. 500" 
                                    required 
                                />
                             </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                            <input type="text" className="w-full border border-gray-300 rounded-lg p-2" placeholder="e.g. Goodwill adjustment" />
                        </div>
                        <button type="submit" className="w-full bg-pharma-600 text-white font-bold py-2 rounded-lg hover:bg-pharma-700">
                            Process Transaction
                        </button>
                    </form>
                )}
             </div>
          </div>
      </div>
    </div>
  );
};

export default AdminLoyaltyManager;
