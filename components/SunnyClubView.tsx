
import React, { useState } from 'react';
import { Wish, ScratchCard, MagicItem, UserRole } from '../types';
import { Star, Gift, FileText, Lock, CheckCircle, Clock, Sparkles, CreditCard, ShoppingBag, PenTool } from 'lucide-react';

interface SunnyClubViewProps {
  userRole: UserRole;
  coins: number;
  wishes: Wish[];
  scratchCards: ScratchCard[];
  freeGoodsBalance: number;
  onSignBond: (wishId: string) => void;
  onScratch: (cardId: string) => void;
  onRedeem: (cost: number, itemName: string) => void;
}

const SunnyClubView: React.FC<SunnyClubViewProps> = ({ 
  userRole, coins, wishes, scratchCards, freeGoodsBalance, onSignBond, onScratch, onRedeem 
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'wishes' | 'magic_store' | 'scratch_cards'>('dashboard');
  const [showBondModal, setShowBondModal] = useState<string | null>(null); // Wish ID
  const [otp, setOtp] = useState('');

  // Magic Store Items
  const magicItems: MagicItem[] = [
    { id: 1, name: 'Apple iPhone 15', coinCost: 150000, category: 'Electronics', image: 'https://placehold.co/100?text=Phone' },
    { id: 2, name: '10g Gold Coin', coinCost: 300000, category: 'Gold', image: 'https://placehold.co/100?text=Gold' },
    { id: 3, name: 'Store Signage Board', coinCost: 60000, category: 'FMCG', image: 'https://placehold.co/100?text=Sign' },
    { id: 4, name: 'FMCG Hamper (Large)', coinCost: 20000, category: 'FMCG', image: 'https://placehold.co/100?text=Hamper' },
  ];

  const handleBondSign = () => {
    if (otp.length === 4 && showBondModal) {
      onSignBond(showBondModal);
      setShowBondModal(null);
      setOtp('');
    } else {
      alert("Please enter a valid 4-digit OTP");
    }
  };

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in">
      {/* Wallet Card */}
      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <Star size={120} fill="currentColor" />
        </div>
        <h3 className="text-lg font-bold mb-1">Reward Coins</h3>
        <div className="text-4xl font-extrabold mb-4">{coins.toLocaleString()}</div>
        <p className="text-xs opacity-90 mb-4">Earn 1 Coin per ₹1 Spent (PTR)</p>
        <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
           <div className="flex justify-between text-xs mb-1">
             <span>Next Milestone</span>
             <span>50,000</span>
           </div>
           <div className="w-full bg-white/30 h-2 rounded-full">
             <div className="bg-white h-2 rounded-full" style={{ width: `${Math.min((coins/50000)*100, 100)}%` }}></div>
           </div>
        </div>
      </div>

      {/* Free Goods Ledger */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <ShoppingBag size={120} />
        </div>
        <h3 className="text-lg font-bold mb-1">Free Goods Ledger</h3>
        <div className="text-4xl font-extrabold mb-4">₹{freeGoodsBalance.toLocaleString()}</div>
        <p className="text-xs opacity-90 mb-4">Accumulated GST-free goods value</p>
        <button className="bg-white text-blue-800 px-4 py-2 rounded-lg text-sm font-bold shadow-sm">
            View Ledger
        </button>
      </div>

      {/* Scratch Cards */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden cursor-pointer" onClick={() => setActiveTab('scratch_cards')}>
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <Sparkles size={120} />
        </div>
        <h3 className="text-lg font-bold mb-1">Scratch Cards</h3>
        <div className="text-4xl font-extrabold mb-4">
          {scratchCards.filter(c => c.status === 'Unopened').length}
        </div>
        <p className="text-xs opacity-90 mb-4">Unopened cards waiting for you</p>
        <div className="flex -space-x-2">
           {[1,2,3].map(i => (
             <div key={i} className="h-8 w-8 rounded-full bg-white/30 border border-white/50"></div>
           ))}
        </div>
      </div>
    </div>
  );

  const renderWishes = () => (
    <div className="space-y-6 animate-in slide-in-from-right-4">
      <div className="flex justify-between items-center">
         <h2 className="text-2xl font-bold text-gray-800">Hero's Wish Program</h2>
         <button className="bg-pharma-900 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <PlusIcon /> New Wish
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {wishes.map(wish => (
           <div key={wish.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-32 bg-gray-100 flex items-center justify-center relative">
                 <img src={wish.image} alt={wish.title} className="h-full object-contain mix-blend-multiply" />
                 {wish.status === 'Achieved' && (
                    <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full font-bold shadow-lg transform -rotate-12">ACHIEVED!</span>
                    </div>
                 )}
              </div>
              <div className="p-5">
                 <h3 className="font-bold text-lg text-gray-900">{wish.title}</h3>
                 <p className="text-sm text-gray-500 mb-4">Target: {wish.targetAmount.toLocaleString()} Coins</p>
                 
                 <div className="mb-4">
                    <div className="flex justify-between text-xs font-bold text-gray-600 mb-1">
                       <span>Progress</span>
                       <span>{Math.round((wish.currentAmount / wish.targetAmount) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                       <div className="bg-pharma-600 h-3 rounded-full transition-all duration-1000" style={{ width: `${(wish.currentAmount / wish.targetAmount) * 100}%` }}></div>
                    </div>
                 </div>

                 <div className="flex justify-between items-center">
                    {wish.bondSigned ? (
                       <span className="flex items-center gap-1 text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded">
                          <FileText size={14} /> Bond Signed
                       </span>
                    ) : (
                       <button 
                         onClick={() => setShowBondModal(wish.id)}
                         className="flex items-center gap-2 text-sm text-blue-600 font-bold hover:underline"
                       >
                          <PenTool size={14} /> Sign Digital Bond
                       </button>
                    )}
                    <span className="text-xs text-gray-400">Est. Date: Dec 2024</span>
                 </div>
              </div>
           </div>
        ))}
      </div>

      {/* Bond Modal */}
      {showBondModal && (
         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl relative">
               <div className="border-4 border-double border-gray-300 p-4 rounded bg-amber-50">
                  <h3 className="text-center font-serif text-2xl font-bold text-gray-900 mb-2">Digital Wish Bond</h3>
                  <p className="text-center text-xs text-gray-500 mb-6 uppercase tracking-widest">S&P Sunny Club Official Document</p>
                  
                  <p className="text-sm text-gray-800 leading-relaxed mb-4 font-serif">
                     I, <strong>{userRole === 'retailer' ? 'Raj StoreOwner' : 'Distributor'}</strong>, hereby commit to achieving the sales target required to unlock my wish: <strong>{wishes.find(w => w.id === showBondModal)?.title}</strong>.
                  </p>
                  <p className="text-sm text-gray-800 leading-relaxed mb-6 font-serif">
                     This bond is electronically secured by S&P Pharma.
                  </p>

                  <div className="bg-white border border-gray-200 p-4 rounded mb-4">
                     <label className="block text-xs font-bold text-gray-500 mb-1">Enter OTP sent to +91 98*** **210</label>
                     <input 
                       type="text" 
                       value={otp}
                       onChange={(e) => setOtp(e.target.value)}
                       maxLength={4}
                       className="w-full text-center text-2xl tracking-[0.5em] font-mono border-b-2 border-gray-300 focus:border-pharma-900 focus:outline-none py-2"
                       placeholder="0000"
                     />
                  </div>

                  <div className="flex gap-4">
                     <button onClick={handleBondSign} className="flex-1 bg-pharma-900 text-white font-bold py-3 rounded hover:bg-pharma-800 transition-colors font-serif">
                        Digitally Sign & Seal
                     </button>
                     <button onClick={() => setShowBondModal(null)} className="px-4 py-3 text-gray-500 hover:text-gray-800 font-bold">
                        Cancel
                     </button>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );

  const renderMagicStore = () => (
     <div className="space-y-6 animate-in slide-in-from-right-4">
        <div className="bg-indigo-900 text-white p-6 rounded-xl flex justify-between items-center">
           <div>
              <h2 className="text-2xl font-bold mb-1">The Magic Store</h2>
              <p className="text-indigo-200 text-sm">Exclusive rewards for our top partners.</p>
           </div>
           <div className="text-right">
              <div className="text-xs opacity-70">Your Balance</div>
              <div className="text-2xl font-bold">{coins.toLocaleString()} <span className="text-sm">Coins</span></div>
           </div>
        </div>

        {coins < 50000 && (
           <div className="bg-gray-100 border-l-4 border-gray-500 p-4 rounded text-gray-700 flex items-start gap-3">
              <Lock className="shrink-0 mt-1" />
              <div>
                 <p className="font-bold">Store Locked</p>
                 <p className="text-sm">You need a minimum of 50,000 coins to unlock your first redemption. Keep earning!</p>
              </div>
           </div>
        )}

        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${coins < 50000 ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
           {magicItems.map(item => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all group">
                 <div className="aspect-square bg-gray-50 flex items-center justify-center p-4 relative">
                    <div className="absolute top-2 right-2 bg-white/80 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-600">
                       {item.category}
                    </div>
                    <img src={item.image} alt={item.name} className="object-contain group-hover:scale-110 transition-transform duration-300" />
                 </div>
                 <div className="p-4">
                    <h3 className="font-bold text-gray-800 text-sm h-10 line-clamp-2">{item.name}</h3>
                    <div className="mt-2 flex items-center justify-between">
                       <span className="text-yellow-600 font-bold text-sm flex items-center gap-1">
                          <Star size={12} fill="currentColor" /> {item.coinCost.toLocaleString()}
                       </span>
                       <button 
                          onClick={() => onRedeem(item.coinCost, item.name)}
                          disabled={coins < item.coinCost}
                          className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400"
                       >
                          Redeem
                       </button>
                    </div>
                 </div>
              </div>
           ))}
        </div>
     </div>
  );

  const renderScratchCards = () => (
     <div className="space-y-6 animate-in slide-in-from-right-4">
        <h2 className="text-2xl font-bold text-gray-800">Your Scratch Wallet</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
           {scratchCards.map(card => (
              <div key={card.id} className="aspect-[3/4] relative">
                 {card.status === 'Unopened' ? (
                    <div 
                      onClick={() => onScratch(card.id)}
                      className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl cursor-pointer hover:scale-105 transition-transform shadow-md flex flex-col items-center justify-center text-gray-600 z-10"
                    >
                       <Sparkles size={40} className="mb-2 text-white animate-pulse" />
                       <span className="font-bold text-white shadow-black drop-shadow-md">Tap to Scratch</span>
                    </div>
                 ) : (
                    <div className="absolute inset-0 bg-white border-2 border-yellow-400 border-dashed rounded-xl flex flex-col items-center justify-center p-4 text-center animate-in zoom-in duration-300">
                       <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">You Won</span>
                       <Gift size={32} className="text-yellow-500 mb-2" />
                       <h4 className="font-bold text-pharma-900">{card.reward}</h4>
                       <span className="text-xs text-gray-400 mt-2">{card.dateEarned}</span>
                    </div>
                 )}
              </div>
           ))}
        </div>
     </div>
  );

  return (
    <div className="space-y-6">
       {/* Sunny Club Header */}
       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 flex overflow-x-auto gap-2">
          <TabButton active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<CreditCard size={18} />} label="Wallet Dashboard" />
          <TabButton active={activeTab === 'wishes'} onClick={() => setActiveTab('wishes')} icon={<Star size={18} />} label="Hero's Wish" />
          <TabButton active={activeTab === 'magic_store'} onClick={() => setActiveTab('magic_store')} icon={<ShoppingBag size={18} />} label="Magic Store" />
          <TabButton active={activeTab === 'scratch_cards'} onClick={() => setActiveTab('scratch_cards')} icon={<Sparkles size={18} />} label="Scratch Cards" />
       </div>

       <div className="min-h-[500px]">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'wishes' && renderWishes()}
          {activeTab === 'magic_store' && renderMagicStore()}
          {activeTab === 'scratch_cards' && renderScratchCards()}
       </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, label }: any) => (
   <button 
     onClick={onClick}
     className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
        active ? 'bg-pharma-900 text-white' : 'text-gray-600 hover:bg-gray-100'
     }`}
   >
      {icon} {label}
   </button>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
)

export default SunnyClubView;
