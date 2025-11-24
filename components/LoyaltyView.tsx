
import React from 'react';
import { Award, Gift, Clock, ArrowRight, Star } from 'lucide-react';
import { UserRole } from '../types';

interface LoyaltyViewProps {
  userRole: UserRole;
}

const LoyaltyView: React.FC<LoyaltyViewProps> = ({ userRole }) => {
  const isDistributor = userRole === 'distributor';

  // Mock Data
  const points = isDistributor ? 15400 : 850;
  const tier = isDistributor ? 'Platinum Partner' : 'Gold Retailer';
  const nextTier = isDistributor ? 50000 : 1000;
  const progress = (points / nextTier) * 100;

  const rewards = [
    { id: 1, title: '₹500 Store Credit', cost: 500, desc: 'Instant credit applied to next invoice.' },
    { id: 2, title: 'Free Delivery Voucher', cost: 200, desc: 'Waive shipping fees on next order.' },
    { id: 3, title: isDistributor ? '1% Extra Bulk Discount' : 'Marketing Kit', cost: isDistributor ? 10000 : 1500, desc: isDistributor ? 'Applied for 30 days.' : 'Posters and standees for your shop.' },
  ];

  return (
    <div className="space-y-8">
      {/* Header with Brand Visuals */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-xl">
        <div className="absolute top-0 right-0 p-10 opacity-10">
            <Award size={200} />
        </div>
        <div className="relative p-8 md:p-12">
            <div className="flex items-center gap-4 mb-4">
                <div className="bg-yellow-400 text-blue-900 p-2 rounded-lg font-bold text-xs uppercase tracking-wider">
                    S&P Rewards
                </div>
                <div className="flex text-yellow-400">
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                    <Star fill="currentColor" size={16} />
                </div>
            </div>
            <h1 className="text-4xl font-bold mb-2">{tier}</h1>
            <p className="text-blue-100 max-w-lg">
                Earn points on every purchase. {isDistributor ? 'Bulk orders earn 2x.' : 'Generic substitutions earn 3x.'}
            </p>

            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 max-w-md">
                <div className="flex justify-between items-end mb-2">
                    <div>
                        <span className="text-3xl font-bold">{points.toLocaleString()}</span>
                        <span className="text-sm ml-1 text-blue-200">pts</span>
                    </div>
                    <span className="text-xs text-blue-200">{nextTier.toLocaleString()} needed for next tier</span>
                </div>
                <div className="w-full bg-black/20 rounded-full h-2">
                    <div 
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-1000" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rewards Catalog */}
        <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Redeem Rewards</h2>
                <button className="text-pharma-600 font-medium text-sm hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rewards.map(r => (
                    <div key={r.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all group">
                        <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Gift size={24} />
                        </div>
                        <h3 className="font-bold text-gray-900">{r.title}</h3>
                        <p className="text-sm text-gray-500 mt-1 h-10">{r.desc}</p>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="font-bold text-yellow-600 flex items-center gap-1">
                                <Star size={14} fill="currentColor" /> {r.cost} pts
                            </span>
                            <button 
                                disabled={points < r.cost}
                                className={`px-4 py-2 rounded-lg text-sm font-bold ${
                                    points >= r.cost 
                                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
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
                {[
                    { title: 'Order #9090', date: 'Oct 24', pts: '+120', type: 'earn' },
                    { title: 'Redeemed Voucher', date: 'Oct 20', pts: '-500', type: 'burn' },
                    { title: 'Order #8821', date: 'Oct 18', pts: '+85', type: 'earn' },
                    { title: 'Tier Bonus', date: 'Oct 01', pts: '+50', type: 'earn' },
                ].map((item, i) => (
                    <div key={i} className="relative flex items-center justify-between pl-8">
                         <div className={`absolute left-0 h-5 w-5 rounded-full border-2 border-white ${item.type === 'earn' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                         <div>
                            <p className="font-medium text-gray-900 text-sm">{item.title}</p>
                            <p className="text-xs text-gray-500">{item.date}</p>
                         </div>
                         <span className={`font-bold text-sm ${item.type === 'earn' ? 'text-green-600' : 'text-red-600'}`}>
                            {item.pts}
                         </span>
                    </div>
                ))}
            </div>
            <button className="w-full mt-6 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1">
                Full History <ArrowRight size={14} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyView;
