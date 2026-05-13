import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, KeyRound, Mail, ShieldCheck, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import axios from '../utils/axiosInstance';

const Settings = () => {
  const { user } = useAuth();
  const [sendingReset, setSendingReset] = useState(false);

  const handlePasswordReset = async () => {
    if (!user?.email) {
      toast.error('No email found for this account');
      return;
    }

    setSendingReset(true);
    try {
      const response = await axios.post('/auth/forgot-password', {
        email: user.email,
        clientOrigin: window.location.origin
      });
      toast.success(response.data.message || 'Password reset link sent');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset link');
    } finally {
      setSendingReset(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-gray-600">Manage your account, security, and preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 text-white flex items-center justify-center text-xl font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="min-w-0">
                <h2 className="font-bold text-gray-900 truncate">{user?.name}</h2>
                <p className="text-sm text-gray-600 truncate">{user?.email}</p>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
                <User className="h-5 w-5" />
                Profile
              </Link>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-50 text-primary-700 font-semibold">
                <ShieldCheck className="h-5 w-5" />
                Security
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center">
                      <KeyRound className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Password</h2>
                      <p className="text-sm text-gray-600">Send a secure reset link to your email.</p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handlePasswordReset}
                  disabled={sendingReset}
                  className="shrink-0 inline-flex items-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 disabled:opacity-50"
                >
                  <Mail className="h-4 w-4" />
                  {sendingReset ? 'Sending...' : 'Email Reset Link'}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                  <p className="text-sm text-gray-600">Order and account emails are sent to {user?.email}.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
