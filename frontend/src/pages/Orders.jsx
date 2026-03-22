import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, CheckCircle2, Search, Filter, ExternalLink, CalendarDays } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import Loader from '../components/common/Loader';

const StatusBadge = ({ status }) => {
  switch (status) {
    case 'processing': return <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-600 font-semibold text-sm rounded-full"><Package className="h-4 w-4" /> Processing</span>;
    case 'shipped': return <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 font-semibold text-sm rounded-full"><Truck className="h-4 w-4" /> Shipped</span>;
    case 'delivered': return <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 font-semibold text-sm rounded-full"><CheckCircle2 className="h-4 w-4" /> Delivered</span>;
    default: return null;
  }
};

const Orders = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/orders/myorders');
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => 
    order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.orderItems.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Order History</h1>
            <p className="text-gray-500 mt-2 text-lg">Check the status of your recent orders, manage returns, and discover similar products.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none w-full md:w-64"
              />
            </div>
            <button className="p-2.5 bg-white border border-gray-300 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-50">
              <Filter className="h-5 w-5" />
            </button>
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200">
            <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet or none match your search.</p>
            <Link to="/products" className="inline-flex items-center justify-center bg-gray-900 text-white font-bold px-8 py-3 rounded-xl hover:bg-black transition-colors">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex flex-wrap gap-y-4 items-center justify-between">
                  <div className="flex flex-wrap gap-8">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Order Placed</p>
                      <p className="font-medium text-gray-900 flex items-center gap-2">
                         <CalendarDays className="h-4 w-4 text-gray-400" />
                         {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total</p>
                      <p className="font-medium text-gray-900">₹{order.totalPrice}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Ship To</p>
                        <p className="font-medium text-primary-600 cursor-pointer hover:underline">{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 flex justify-end">Order # {order._id}</p>
                    <div className="flex justify-end gap-3 mt-1.5">
                       <Link to="#" className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">View Details <ExternalLink className="h-4 w-4" /></Link>
                       <span className="text-gray-300">|</span>
                       <Link to="#" className="text-sm font-semibold text-primary-600 hover:text-primary-700">Invoice</Link>
                    </div>
                  </div>
                </div>

                {/* Order Status Bar */}
                <div className="px-6 pt-5 pb-2">
                   <h3 className="text-xl font-bold text-gray-900 flex items-center gap-4">
                      <StatusBadge status={order.status} />
                      {order.status === 'delivered' && <span className="text-sm font-medium text-gray-500">Delivered on {new Date(new Date(order.createdAt).getTime() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>}
                      {order.status === 'shipped' && <span className="text-sm font-medium text-gray-500">Arriving on {new Date(new Date(order.createdAt).getTime() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>}
                   </h3>
                </div>

                {/* Items */}
                <div className="px-6 py-4 divide-y divide-gray-100">
                  {order.orderItems.map((item, idx) => (
                    <div key={idx} className="py-4 flex flex-col sm:flex-row gap-6">
                      <div className="w-24 h-24 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {item.image ? <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> : '🎨'}
                      </div>
                      <div className="flex-1">
                        <Link to={`/products/${item.product}`} className="text-lg font-bold text-gray-900 hover:text-primary-600 transition-colors line-clamp-1">{item.name}</Link>
                        <p className="text-sm text-gray-500 mt-1 mb-2">Return window closed on {new Date(new Date(order.createdAt).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                        
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 font-medium">
                            <span className="bg-gray-100 px-2.5 py-1 rounded-md">Qty: {item.qty}</span>
                            {item.color && (
                              <div className="flex items-center gap-1.5 bg-gray-100 px-2.5 py-1 rounded-md">
                                <span className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: item.color }} /> Color
                              </div>
                            )}
                            {item.size && (
                              <span className="bg-gray-100 px-2.5 py-1 rounded-md">
                                Size: <strong className="text-gray-900">{item.size}</strong>
                              </span>
                            )}
                        </div>
                      </div>

                      {/* Item Actions */}
                      <div className="sm:w-48 flex flex-col gap-2 justify-center">
                         <button className="w-full py-2.5 bg-gray-900 text-white font-bold rounded-xl text-sm hover:bg-black transition-colors">Buy it again</button>
                         <button className="w-full py-2.5 bg-white border border-gray-300 text-gray-700 font-bold rounded-xl text-sm hover:bg-gray-50 transition-colors">Write a review</button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;