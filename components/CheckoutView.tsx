
import React, { useState } from 'react';
import { CartItem, UserRole } from '../types';
import { Trash2, CreditCard, Building, CheckCircle, AlertCircle, Lock, Wallet, Banknote } from 'lucide-react';

interface CheckoutViewProps {
  cart: CartItem[];
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
  userRole: UserRole;
}

const CheckoutView: React.FC<CheckoutViewProps> = ({ cart, onRemoveItem, onClearCart, userRole }) => {
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const isB2C = userRole === 'customer';

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  // Set default method based on role if not set
  if (!paymentMethod) {
      if (isB2C) setPaymentMethod('card');
      else setPaymentMethod('credit_terms');
  }

  const handlePayment = () => {
    setIsPaymentProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsPaymentProcessing(false);
      setPaymentSuccess(true);
      setTimeout(() => {
        onClearCart();
      }, 3000);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
        <div className="h-24 w-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center animate-bounce">
          <CheckCircle size={48} />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Order Placed Successfully!</h2>
          <p className="text-gray-500 mt-2">Order ID: #{Math.floor(Math.random() * 10000)}</p>
          <p className="text-gray-500">Thank you for choosing S&P Pharma.</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="bg-gray-100 p-6 rounded-full mb-4">
           <CreditCard size={48} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Your Cart is Empty</h2>
        <p className="text-gray-500 mt-2">Browse our catalog to add products.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Shopping Cart ({cart.length} Items)</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="p-4">Product</th>
                <th className="p-4">Price</th>
                <th className="p-4">Qty</th>
                <th className="p-4">Total</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cart.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">{item.name}</td>
                  <td className="p-4 text-gray-600">₹{item.price}</td>
                  <td className="p-4 font-mono font-medium">{item.quantity}</td>
                  <td className="p-4 font-bold text-gray-900">₹{item.price * item.quantity}</td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-400 hover:text-red-600 p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Checkout Summary */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>GST (18%)</span>
            <span>₹{gst.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-100 pt-4 flex justify-between text-lg font-bold text-gray-900">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Lock size={16} className="text-green-600" /> Payment Method
          </h3>
          
          <div className="space-y-2">
            
            {/* B2B Only Options */}
            {!isB2C && (
                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                paymentMethod === 'credit_terms' ? 'border-pharma-500 bg-pharma-50 ring-1 ring-pharma-500' : 'border-gray-200 hover:border-gray-300'
                }`}>
                <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === 'credit_terms'} 
                    onChange={() => setPaymentMethod('credit_terms')}
                    className="text-pharma-600"
                />
                <div className="flex-1">
                    <div className="font-medium text-gray-900 flex items-center gap-2">
                    <Building size={18} /> Net Terms (Credit)
                    </div>
                    <div className="text-xs text-gray-500">Invoice payable in 30 days</div>
                </div>
                </label>
            )}

            {/* Common / B2C Options */}
            <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
              paymentMethod === 'card' ? 'border-pharma-500 bg-pharma-50 ring-1 ring-pharma-500' : 'border-gray-200 hover:border-gray-300'
            }`}>
              <input 
                type="radio" 
                name="payment" 
                checked={paymentMethod === 'card'} 
                onChange={() => setPaymentMethod('card')}
                className="text-pharma-600"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900 flex items-center gap-2">
                  <CreditCard size={18} /> Credit / Debit Card
                </div>
                <div className="text-xs text-gray-500">Visa, Mastercard, Amex</div>
              </div>
            </label>

            <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
              paymentMethod === 'upi' ? 'border-pharma-500 bg-pharma-50 ring-1 ring-pharma-500' : 'border-gray-200 hover:border-gray-300'
            }`}>
              <input 
                type="radio" 
                name="payment" 
                checked={paymentMethod === 'upi'} 
                onChange={() => setPaymentMethod('upi')}
                className="text-pharma-600"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900 flex items-center gap-2">
                  <Wallet size={18} /> UPI
                </div>
                <div className="text-xs text-gray-500">Google Pay, PhonePe</div>
              </div>
            </label>

             {/* B2C Only Options */}
             {isB2C && (
                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                paymentMethod === 'cod' ? 'border-pharma-500 bg-pharma-50 ring-1 ring-pharma-500' : 'border-gray-200 hover:border-gray-300'
                }`}>
                <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === 'cod'} 
                    onChange={() => setPaymentMethod('cod')}
                    className="text-pharma-600"
                />
                <div className="flex-1">
                    <div className="font-medium text-gray-900 flex items-center gap-2">
                    <Banknote size={18} /> Cash on Delivery
                    </div>
                    <div className="text-xs text-gray-500">Pay when you receive</div>
                </div>
                </label>
             )}

          </div>

          <button 
            onClick={handlePayment}
            disabled={isPaymentProcessing}
            className={`w-full py-3 rounded-lg font-bold text-white shadow-md transition-all flex items-center justify-center gap-2 ${
              isPaymentProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-pharma-600 hover:bg-pharma-700'
            }`}
          >
            {isPaymentProcessing ? (
              <>Processing...</>
            ) : (
              <>Pay ₹{total.toFixed(2)}</>
            )}
          </button>
          
          <div className="flex items-center justify-center gap-1 text-xs text-gray-400 mt-2">
            <AlertCircle size={12} />
            <span>Secured by Stripe / Razorpay</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;
