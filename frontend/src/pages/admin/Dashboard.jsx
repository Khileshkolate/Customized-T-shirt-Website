import { useState, useEffect } from 'react';
import { 
  ShoppingBag, Users, TrendingUp, Package, 
  DollarSign, BarChart3, Calendar, Download,
  ArrowUp, ArrowDown
} from 'lucide-react';
import StatsCard from '../../components/admin/StatsCard';
import DataTable from '../../components/admin/DataTable';
import axios from '../../utils/axiosInstance';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalProducts: 0,
    pendingOrders: 0,
    completedOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // In real app, you would have a dedicated dashboard endpoint
      const [ordersRes, usersRes, productsRes] = await Promise.all([
        axios.get('/orders'),
        axios.get('/users'),
        axios.get('/products')
      ]);

      const orders = ordersRes.data.data || [];
      const users = usersRes.data.data || [];
      const products = productsRes.data.data || [];

      const totalRevenue = orders
        .filter(order => order.paymentStatus === 'completed')
        .reduce((sum, order) => sum + order.totalAmount, 0);

      const pendingOrders = orders.filter(order => order.orderStatus === 'pending').length;
      const completedOrders = orders.filter(order => order.orderStatus === 'delivered').length;

      setStats({
        totalOrders: orders.length,
        totalRevenue,
        totalUsers: users.length,
        totalProducts: products.length,
        pendingOrders,
        completedOrders
      });

      setRecentOrders(orders.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Revenue',
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      icon: <DollarSign className="h-6 w-6" />,
      change: '+12.5%',
      trend: 'up',
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toString(),
      icon: <ShoppingBag className="h-6 w-6" />,
      change: '+8.2%',
      trend: 'up',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers.toString(),
      icon: <Users className="h-6 w-6" />,
      change: '+15.3%',
      trend: 'up',
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Total Products',
      value: stats.totalProducts.toString(),
      icon: <Package className="h-6 w-6" />,
      change: '+5.7%',
      trend: 'up',
      color: 'from-orange-500 to-red-600'
    }
  ];

  const orderColumns = [
    { key: 'orderId', label: 'Order ID' },
    { key: 'customer', label: 'Customer' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status' },
    { key: 'date', label: 'Date' }
  ];

  const orderData = recentOrders.map(order => ({
    orderId: order.orderId,
    customer: order.user?.name || 'N/A',
    amount: `₹${order.totalAmount}`,
    status: (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
        order.orderStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
        order.orderStatus === 'processing' ? 'bg-blue-100 text-blue-800' :
        'bg-gray-100 text-gray-800'
      }`}>
        {order.orderStatus}
      </span>
    ),
    date: new Date(order.createdAt).toLocaleDateString()
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to ViragKala Admin Panel</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Calendar className="h-4 w-4" />
            This Month
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All →
            </button>
          </div>
          <DataTable columns={orderColumns} data={orderData} />
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm text-gray-600">Pending Orders</div>
                <div className="text-2xl font-bold">{stats.pendingOrders}</div>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm text-gray-600">Completed Orders</div>
                <div className="text-2xl font-bold">{stats.completedOrders}</div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-green-600" />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm text-gray-600">Avg. Order Value</div>
                <div className="text-2xl font-bold">
                  ₹{stats.totalOrders > 0 ? Math.round(stats.totalRevenue / stats.totalOrders) : 0}
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;