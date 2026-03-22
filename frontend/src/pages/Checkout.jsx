import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { CheckCircle2, ChevronRight, CreditCard, MapPin, ShieldCheck, Truck, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

import axios from '../utils/axiosInstance';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const tax = Math.round(cartTotal * 0.18);
  const shipping = cartTotal > 1500 ? 0 : 99;
  const finalTotal = cartTotal + tax + shipping;

  // Form States
  const [contact, setContact] = useState({ email: user?.email || '', phone: user?.phone || '' });
  const [address, setAddress] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [payment, setPayment] = useState({ cardNumber: '', expiry: '', cvc: '' });

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.productName,
          qty: item.quantity,
          image: item.image || '/images/tshirt.jpg', // Fallback
          price: item.price,
          product: item.productId,
          color: item.color,
          size: item.size
        })),
        shippingAddress: address,
        paymentMethod: 'Credit Card',
        itemsPrice: cartTotal,
        taxPrice: tax,
        shippingPrice: shipping,
        totalPrice: finalTotal
      };

      await axios.post('/orders', orderData);
      toast.success('Order placed successfully!');
      clearCart();
      navigate('/orders');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <Link to="/products" className="text-primary-600 font-bold hover:underline">Go shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Simple Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link to="/" className="text-xl font-black text-gray-900 tracking-tighter">
            Print<span className="text-primary-600">Craft</span>
          </Link>
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <Lock className="h-4 w-4" />
            Secure Checkout
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
          
          {/* Main Checkout Form Column */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            
            {/* Step 1: Contact */}
            <div className={`bg-white rounded-3xl border ${step === 1 ? 'border-primary-500 shadow-lg shadow-primary-500/10' : 'border-gray-200'} overflow-hidden transition-all duration-300`}>
              <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step > 1 ? 'bg-green-100 text-green-600' : step === 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {step > 1 ? <CheckCircle2 className="h-5 w-5" /> : '1'}
                  </div>
                  <h2 className={`text-lg font-bold ${step === 1 ? 'text-gray-900' : 'text-gray-500'}`}>Contact Information</h2>
                </div>
                {step > 1 && (
                  <button onClick={() => setStep(1)} className="text-sm font-semibold text-primary-600 hover:text-primary-700">Edit</button>
                )}
              </div>
              
              <AnimatePresence>
                {step === 1 && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    <form onSubmit={handleNextStep} className="p-6 space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                          <input type="email" required value={contact.email} onChange={e => setContact({...contact, email: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <input type="tel" required value={contact.phone} onChange={e => setContact({...contact, phone: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all" />
                        </div>
                      </div>
                      <button type="submit" className="w-full sm:w-auto bg-primary-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30">
                        Continue to Shipping
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Step 2: Shipping */}
            <div className={`bg-white rounded-3xl border ${step === 2 ? 'border-primary-500 shadow-lg shadow-primary-500/10' : 'border-gray-200'} overflow-hidden transition-all duration-300`}>
              <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step > 2 ? 'bg-green-100 text-green-600' : step === 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {step > 2 ? <CheckCircle2 className="h-5 w-5" /> : '2'}
                  </div>
                  <h2 className={`text-lg font-bold ${step === 2 ? 'text-gray-900' : 'text-gray-500'}`}>Shipping Address</h2>
                </div>
                {step > 2 && (
                  <button onClick={() => setStep(2)} className="text-sm font-semibold text-primary-600 hover:text-primary-700">Edit</button>
                )}
              </div>
              
              <AnimatePresence>
                {step === 2 && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    <form onSubmit={handleNextStep} className="p-6 space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <input type="text" placeholder="First Name" required value={address.firstName} onChange={e => setAddress({...address, firstName: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
                        <input type="text" placeholder="Last Name" required value={address.lastName} onChange={e => setAddress({...address, lastName: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
                      </div>
                      <input type="text" placeholder="Street Address" required value={address.street} onChange={e => setAddress({...address, street: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
                      <div className="grid grid-cols-3 gap-5">
                        <input type="text" placeholder="City" required value={address.city} onChange={e => setAddress({...address, city: e.target.value})} className="col-span-3 sm:col-span-1 border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                        <input type="text" placeholder="State" required value={address.state} onChange={e => setAddress({...address, state: e.target.value})} className="col-span-3 sm:col-span-1 border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                        <input type="text" placeholder="ZIP" required value={address.zipCode} onChange={e => setAddress({...address, zipCode: e.target.value})} className="col-span-3 sm:col-span-1 border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                      </div>
                      <button type="submit" className="w-full sm:w-auto bg-primary-600 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30">
                        Continue to Payment
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Step 3: Payment */}
            <div className={`bg-white rounded-3xl border ${step === 3 ? 'border-primary-500 shadow-lg shadow-primary-500/10' : 'border-gray-200'} overflow-hidden transition-all duration-300`}>
              <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 3 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
                  <h2 className={`text-lg font-bold ${step === 3 ? 'text-gray-900' : 'text-gray-500'}`}>Payment</h2>
                </div>
              </div>
              
              <AnimatePresence>
                {step === 3 && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    <form onSubmit={handlePlaceOrder} className="p-6 space-y-5">
                      <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex items-center gap-3 mb-6">
                         <CreditCard className="h-6 w-6 text-gray-400" />
                         <span className="text-sm font-medium text-gray-700">Credit / Debit Card (Mock)</span>
                      </div>
                      <input type="text" maxLength={16} placeholder="Card Number" required value={payment.cardNumber} onChange={e => setPayment({...payment, cardNumber: e.target.value})} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                      <div className="grid grid-cols-2 gap-5">
                        <input type="text" placeholder="MM/YY" maxLength={5} required value={payment.expiry} onChange={e => setPayment({...payment, expiry: e.target.value})} className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                        <input type="text" placeholder="CVC" maxLength={3} required value={payment.cvc} onChange={e => setPayment({...payment, cvc: e.target.value})} className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none" />
                      </div>
                      
                      <button 
                        type="submit" 
                        disabled={isProcessing}
                        className="w-full bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-colors shadow-xl disabled:opacity-70 mt-4 flex justify-center items-center"
                      >
                        {isProcessing ? (
                          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          `Pay ₹${finalTotal}`
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-5 xl:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 lg:sticky lg:top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>
              
              {/* Items Small Scroll List */}
              <div className="max-h-64 overflow-y-auto hide-scrollbar space-y-4 mb-6 pr-2">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      {item.image ? <img src={item.image} className="w-full h-full object-cover" /> : '🎨'}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-gray-900 line-clamp-2">{item.productName}</h4>
                      <p className="text-sm text-gray-500 mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-6 border-t border-gray-100 text-sm font-medium">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (18%)</span>
                  <span>₹{tax}</span>
                </div>
                <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-100 pb-2">
                  <span className="text-base font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-black text-gray-900">₹{finalTotal}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;