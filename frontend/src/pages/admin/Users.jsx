import { useState, useEffect } from 'react';
import { 
  Search, Filter, Mail, Phone, Calendar, UserCheck, 
  UserX, Edit2, Trash2, Shield, Download
} from 'lucide-react';
import DataTable from '../../components/admin/DataTable';
import axios from '../../utils/axiosInstance';
import toast from 'react-hot-toast';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchTerm, roleFilter, users]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users');
      setUsers(response.data.data || []);
      setFilteredUsers(response.data.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
      );
    }

    // Role filter
    if (roleFilter !== 'all') {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    setFilteredUsers(filtered);
  };

  const toggleUserStatus = async (userId, currentStatus) => {
    try {
      await axios.put(`/users/${userId}/status`, { 
        isActive: !currentStatus 
      });
      toast.success(`User ${currentStatus ? 'deactivated' : 'activated'}`);
      fetchUsers(); // Refresh list
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user status');
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      await axios.delete(`/users/${userId}`);
      toast.success('User deleted successfully');
      fetchUsers(); // Refresh list
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const promoteToAdmin = async (userId) => {
    if (!window.confirm('Are you sure you want to promote this user to Admin?')) {
      return;
    }

    try {
      await axios.put(`/users/${userId}/role`, { role: 'admin' });
      toast.success('User promoted to Admin successfully');
      fetchUsers(); // Refresh list
    } catch (error) {
      console.error('Error promoting user:', error);
      toast.error('Failed to promote user');
    }
  };

  const userColumns = [
    { key: 'user', label: 'User' },
    { key: 'contact', label: 'Contact' },
    { key: 'joined', label: 'Joined' },
    { key: 'orders', label: 'Orders' },
    { key: 'status', label: 'Status' },
    { key: 'role', label: 'Role' },
    { key: 'actions', label: 'Actions' }
  ];

  const userData = filteredUsers.map(user => ({
    user: (
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
          {user.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-gray-500">ID: {user._id.substring(0, 8)}</div>
        </div>
      </div>
    ),
    contact: (
      <div>
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-gray-400" />
          <span className="text-sm">{user.email}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Phone className="h-4 w-4 text-gray-400" />
          <span className="text-sm">+91 {user.phone}</span>
        </div>
      </div>
    ),
    joined: (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-gray-400" />
        <span className="text-sm">
          {new Date(user.createdAt).toLocaleDateString()}
        </span>
      </div>
    ),
    orders: (
      <div className="text-center">
        <div className="font-bold text-gray-900">0</div>
        <div className="text-xs text-gray-500">orders</div>
      </div>
    ),
    status: (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        user.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
      }`}>
        {user.isVerified ? 'Verified' : 'Pending'}
      </span>
    ),
    role: (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
      }`}>
        {user.role}
      </span>
    ),
    actions: (
      <div className="flex items-center gap-2">
        <button
          onClick={() => toggleUserStatus(user._id, user.isActive)}
          className={`p-2 rounded-lg ${
            user.isActive 
              ? 'text-red-600 hover:bg-red-50' 
              : 'text-green-600 hover:bg-green-50'
          }`}
          title={user.isActive ? 'Deactivate' : 'Activate'}
        >
          {user.isActive ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
        </button>
        
        {user.role !== 'admin' && (
          <button
            onClick={() => promoteToAdmin(user._id)}
            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
            title="Make Admin"
          >
            <Shield className="h-4 w-4" />
          </button>
        )}
        
        <button
          onClick={() => deleteUser(user._id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
          title="Delete User"
        >
          <Trash2 className="h-4 w-4" />
        </button>
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
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600">Manage customer accounts and permissions</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="h-5 w-5" />
            Export Users
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="customer">Customers</option>
              <option value="admin">Admins</option>
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="h-5 w-5" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">{users.length}</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === 'customer').length}
              </div>
              <div className="text-sm text-gray-600">Customers</div>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === 'admin').length}
              </div>
              <div className="text-sm text-gray-600">Admins</div>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.isVerified).length}
              </div>
              <div className="text-sm text-gray-600">Verified Users</div>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <DataTable 
          columns={userColumns} 
          data={userData} 
          itemsPerPage={10}
        />
      </div>
    </div>
  );
};

export default AdminUsers;














