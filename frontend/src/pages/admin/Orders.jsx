import { useState, useEffect } from 'react';
import { 
  Search, Filter, Eye, CheckCircle, XCircle, 
  Truck, Package, Clock, Download
} from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import Modal from '../../components/common/Modal';
import axios from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [searchTerm, statusFilter, orders]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/orders');
      setOrders(response.data.data || []);
      setFilteredOrders(response.data.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.orderStatus === statusFilter);
    }

    setFilteredOrders(filtered);
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`/orders/${orderId}/status`, { status });
      toast.success(`Order status updated to ${status}`);
      fetchOrders(); // Refresh list
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order status');
    }
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const orderColumns = [
    { key: 'orderId', label: 'Order ID' },
    { key: 'customer', label: 'Customer' },
    { key: 'date', label: 'Date' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status' },
    { key: 'payment', label: 'Payment' },
    { key: 'actions', label: 'Actions' }
  ];

  const orderData = filteredOrders.map(order => ({
    orderId: (
      <div className="font-mono font-medium text-primary-600">
        {order.orderId}
      </div>
    ),
    customer: (
      <div>
        <div className="font-medium">{order.user?.name || 'N/A'}</div>
        <div className="text-sm text-gray-500">{order.user?.phone || ''}</div>
      </div>
    ),
    date: new Date(order.createdAt).toLocaleDateString(),
    amount: `₹${order.finalAmount}`,
    status: (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
        {order.orderStatus}
      </span>
    ),
    payment: (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        order.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' :
        order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {order.paymentStatus}
      </span>
    ),
    actions: (
      <div className="flex items-center gap-2">
        <button
          onClick={() => viewOrderDetails(order)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
          title="View Details"
        >
          <Eye className="h-4 w-4" />
        </button>
        {order.orderStatus === 'pending' && (
          <>
            <button
              onClick={() => updateOrderStatus(order._id, 'confirmed')}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
              title="Confirm Order"
            >
              <CheckCircle className="h-4 w-4" />
            </button>
            <button
              onClick={() => updateOrderStatus(order._id, 'cancelled')}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              title="Cancel Order"
            >
              <XCircle className="h-4 w-4" />
            </button>
          </>
        )}
        {order.orderStatus === 'confirmed' && (
          <button
            onClick={() => updateOrderStatus(order._id, 'processing')}
            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
            title="Start Processing"
          >
            <Package className="h-4 w-4" />
          </button>
        )}
        {order.orderStatus === 'processing' && (
          <button
            onClick={() => updateOrderStatus(order._id, 'shipped')}
            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
            title="Mark as Shipped"
          >
            <Truck className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600">Manage customer orders and track shipments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Download className="h-5 w-5" />
          Export Orders
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Order ID or Customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="h-5 w-5" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <DataTable 
          columns={orderColumns} 
          data={orderData} 
          itemsPerPage={10}
        />
      </div>

      {/* Order Details Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`Order Details - ${selectedOrder?.orderId}`}
        size="xl"
      >
        {selectedOrder && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Customer Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium">{selectedOrder.user?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{selectedOrder.user?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{selectedOrder.user?.phone}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Order Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-medium">
                      {new Date(selectedOrder.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.orderStatus)}`}>
                      {selectedOrder.orderStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedOrder.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedOrder.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Shipping Address</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  {selectedOrder.shippingAddress?.street}<br />
                  {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state}<br />
                  {selectedOrder.shippingAddress?.pincode}, {selectedOrder.shippingAddress?.country}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Order Items</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {selectedOrder.items?.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center mr-3">
                              <Package className="h-5 w-5 text-gray-500" />
                            </div>
                            <div>
                              <div className="font-medium">{item.product?.name || 'Product'}</div>
                              <div className="text-sm text-gray-500">
                                {item.color && `Color: ${item.color}`}
                                {item.size && ` | Size: ${item.size}`}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">{item.quantity}</td>
                        <td className="px-6 py-4">₹{item.price}</td>
                        <td className="px-6 py-4 font-medium">₹{item.quantity * item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div>
                <div className="text-sm text-gray-600">Payment Method</div>
                <div className="font-medium">{selectedOrder.paymentMethod?.toUpperCase()}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Total Amount</div>
                <div className="text-2xl font-bold text-primary-600">₹{selectedOrder.finalAmount}</div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminOrders;