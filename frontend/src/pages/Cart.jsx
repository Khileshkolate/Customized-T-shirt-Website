import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const tax = Math.round(cartTotal * 0.18); // Example 18% tax
  const shipping = cartTotal > 1500 ? 0 : 99;
  const finalTotal = cartTotal + tax + shipping;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-8">
          Shopping Cart
          <span className="text-gray-400 text-2xl font-medium ml-3">({cartItems.length} items)</span>
        </h1>

        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-sm p-12 text-center"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">Looks like you haven't added anything yet. Discover our latest customizable products!</p>
            <Link 
              to="/products"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-full font-bold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30"
            >
              Start Shopping
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
            
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-6">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    className="bg-white rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row gap-6 border border-gray-100"
                  >
                    {/* Item Image */}
                    <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-2xl overflow-hidden shadow-inner flex-shrink-0 flex items-center justify-center relative">
                      {item.image ? (
                        <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-4xl">🎨</span>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2 truncate pr-4">
                            {item.productName}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 font-medium">
                            {item.color && (
                              <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                <span className="w-3 h-3 rounded-full border border-gray-200" style={{ backgroundColor: item.color }} />
                                Color
                              </div>
                            )}
                            {item.size && (
                              <span className="bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                Size: <strong className="text-gray-900">{item.size}</strong>
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-black text-gray-900">₹{item.price}</p>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-50">
                         <div className="flex items-center w-28 bg-gray-100 rounded-full border border-gray-200">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary-600 transition-colors rounded-l-full font-medium">-</button>
                            <div className="flex-1 flex items-center justify-center text-gray-900 font-bold select-none text-sm">{item.quantity}</div>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary-600 transition-colors rounded-r-full font-medium">+</button>
                         </div>
                         
                         <button
                           onClick={() => removeFromCart(item.id)}
                           className="flex items-center gap-1.5 text-sm font-semibold text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                         >
                           <Trash2 className="h-4 w-4" />
                           Remove
                         </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-4 mt-8 lg:mt-0"
            >
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6 text-sm font-medium border-b border-gray-100 pb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="text-gray-900">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Estimated Tax (18%)</span>
                    <span className="text-gray-900">₹{tax}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    {shipping === 0 ? (
                      <span className="text-green-600 font-bold">Free</span>
                    ) : (
                      <span className="text-gray-900">₹{shipping}</span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-black text-gray-900">₹{finalTotal}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-primary-600 text-white rounded-2xl py-4 font-bold hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20 flex items-center justify-center gap-2 hover:-translate-y-1"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-5 w-5" />
                </button>

                <div className="mt-6 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500 justify-center">
                    <ShieldCheck className="h-4 w-4 text-green-500" />
                    Secure Checkout
                  </div>
                  {shipping > 0 && (
                    <div className="flex items-center gap-2 text-xs text-primary-600 bg-primary-50 px-3 py-2 rounded-lg text-center justify-center">
                      <Tag className="h-4 w-4" />
                      Add ₹{(1500 - cartTotal).toFixed(0)} more for Free Shipping
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;