import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    // Direct admin login without API call
    const adminUser = {
      id: 'admin123456',
      name: 'Admin User',
      email: 'admin@printcraft.com',
      phone: '9999999999',
      role: 'admin',
      isVerified: true,
      addresses: []
    };
    
    // Store in localStorage
    localStorage.setItem('token', 'admin-jwt-token-12345');
    localStorage.setItem('user', JSON.stringify(adminUser));
    
    // Show success message
    toast.success('🎉 Admin login successful! Redirecting to dashboard...');
    
    // Redirect to admin dashboard
    setTimeout(() => {
      window.location.href = '/admin';
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check for admin credentials
    if (email === 'admin@printcraft.com' && password === 'admin123') {
      setLoading(true);
      handleAdminLogin();
      return;
    }
    
    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        if (result.data?.role === 'admin') {
           navigate('/admin');
        } else {
           navigate('/');
        }
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50 flex items-center justify-center py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl mb-6">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Welcome Back</h1>
          <p className="text-gray-600">Sign in to access your account</p>
          
          
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white py-4 rounded-xl font-semibold hover:bg-primary-700 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-700">
                  Create account
                </Link>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                For testing, use admin credentials above
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;