
import React, { useState } from 'react';
import { Award, Gift, Clock, ArrowRight, Star, Check } from 'lucide-react';
import { UserRole, LoyaltyHistoryItem } from '../types';

interface LoyaltyViewProps {
  userRole: UserRole;
  points: number;
  history: LoyaltyHistoryItem[];
  onRedeem: (cost: number, title: string) => boolean;
}

const LoyaltyView: React.FC<LoyaltyViewProps> = ({ userRole, points, history, onRedeem }) => {
  const isDistributor = userRole === 'distributor';
  const isCustomer = userRole === 'customer';
  const [successMsg, setSuccessMsg] = useState('');

  // Tiers calculation logic
  let tier = 'Gold Retailer';
  let nextTier = 2000;
  let tierColor = 'from-blue-900 to-blue-700';
  let iconColor = 'text-yellow-400';

  if (isDistributor) {
      tier = 'Platinum Partner';
      nextTier = 50000;
      tierColor = 'from-purple-900 to-purple-700';
      iconColor = 'text-purple-200';
  } else if (isCustomer) {
      tier = 'Silver Member';
      nextTier = 500;
      tierColor = 'from-teal-800 to-teal-600';
      iconColor = 'text-teal-200';
  }

  const progress = Math.min((points / nextTier) * 100, 100);

  // Rewards Logic
  const baseRewards = [
    { id: 1, title: '₹500 Store Credit', cost: 500, desc: 'Instant credit applied to next invoice.' },
    { id: 2, title: 'Free Delivery Voucher', cost: 200, desc: 'Waive shipping fees on next order.' },
    { id: 3, title: 'Marketing Kit', cost: 1500, desc: 'Posters and standees for your shop.' },
    { id: 4, title: 'Brand Merchandise', cost: 800, desc: 'T-Shirts and Pens for staff.' },
  ];

  const distributorRewards = [
    { id: 1, title: '₹5000 Bulk Credit', cost: 5000, desc: 'Credit for bulk orders.' },
    { id: 2, title: 'Priority Logistics', cost: 2000, desc: 'Next truck dispatch guarantee.' },
    { id: 3, title: '1% Extra Discount', cost: 10000, desc: 'Applied for 30 days on all SKUs.' },
    { id: 4, title: 'Warehouse Audit', cost: 25000, desc: 'Expert S&P audit for your facility.' },
  ];

  const customerRewards = [
    { id: 1, title: '₹100 Coupon', cost: 100, desc: 'Save on your next medicine order.' },
    { id: 2, title: 'Free Health Checkup', cost: 800, desc: 'Basic blood work at partner labs.' },
    { id: 3, title: 'Free Delivery', cost: 50, desc: 'No delivery fee on next order.' },
    { id: 4, title: 'Vitamin Pack', cost: 400, desc: '30-day supply of Multivitamins.' },
  ];

  let rewards = baseRewards;
  if (isDistributor) rewards = distributorRewards;
  if (isCustomer) rewards = customerRewards;

  const handleRedeemClick = (cost: number, title: string) => {
    const success = onRedeem(cost, title);
    if (success) {
      setSuccessMsg(`Successfully redeemed ${title}!`);
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Brand Visuals */}
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${tierColor} text-white shadow-xl`}>
        <div className="absolute top-0 right-0 p-10 opacity-10">
            <Award size={200} />
        </div>
        <div className="relative p-8 md:p-12">
            <div className="flex items-center gap-4 mb-4">
                <div className="bg-white/20 backdrop-blur text-white p-2 rounded-lg font-bold text-xs uppercase tracking-wider">
                    S&P Rewards
                </div>
                <div className={`flex ${iconColor}`}>
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                </div>
            </div>
            <h1 className="text-4xl font-bold mb-2">{tier}</h1>
            <p className="text-white/80 max-w-lg">
                {isDistributor ? 'Bulk orders earn 2x points.' : isCustomer ? 'Earn points on every health purchase.' : 'Earn 1 pt per ₹100 spent.'}
            </p>

            <div className="mt-8 bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-white/10 max-w-md shadow-inner">
                <div className="flex justify-between items-end mb-2">
                    <div>
                        <span className="text-3xl font-bold">{points.toLocaleString()}</span>
                        <span className="text-sm ml-1 text-white/70">pts</span>
                    </div>
                    <span className="text-xs text-white/70">{nextTier.toLocaleString()} needed for next tier</span>
                </div>
                <div className="w-full bg-black/30 rounded-full h-2">
                    <div 
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(250,204,21,0.5)]" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
      </div>

      {successMsg && (
        <div className="bg-green-100 border border-green-200 text-green-800 px-6 py-4 rounded-xl flex items-center gap-2 animate-in slide-in-from-top-4">
          <Check size={20} />
          <span className="font-bold">{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rewards Catalog */}
        <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Redeem Rewards</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rewards.map(r => (
                    <div key={r.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all group">
                        <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${
                            isCustomer ? 'bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white' : 
                            isDistributor ? 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white' : 
                            'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                        }`}>
                            <Gift size={24} />
                        </div>
                        <h3 className="font-bold text-gray-900">{r.title}</h3>
                        <p className="text-sm text-gray-500 mt-1 h-10">{r.desc}</p>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="font-bold text-yellow-600 flex items-center gap-1">
                                <Star size={14} fill="currentColor" /> {r.cost} pts
                            </span>
                            <button 
                                onClick={() => handleRedeemClick(r.cost, r.title)}
                                disabled={points < r.cost}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-transform active:scale-95 ${
                                    points >= r.cost 
                                    ? 'bg-gray-900 text-white hover:bg-gray-700' 
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                Redeem
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* History */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Clock size={18} className="text-gray-400" /> Recent Activity
            </h3>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                {history.map((item) => (
                    <div key={item.id} className="relative flex items-center justify-between pl-8 animate-in fade-in slide-in-from-left-4">
                         <div className={`absolute left-0 h-5 w-5 rounded-full border-2 border-white z-10 ${item.type === 'earn' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                         <div>
                            <p className="font-medium text-gray-900 text-sm">{item.title}</p>
                            <p className="text-xs text-gray-500">{item.date}</p>
                         </div>
                         <span className={`font-bold text-sm ${item.type === 'earn' ? 'text-green-600' : 'text-red-600'}`}>
                            {item.type === 'earn' ? '+' : '-'}{item.points}
                         </span>
                    </div>
                ))}
                {history.length === 0 && (
                   <p className="pl-8 text-gray-400 text-sm">No recent activity.</p>
                )}
            </div>
            
        </div>
      </div>
    </div>
  );
};

export default LoyaltyView;
