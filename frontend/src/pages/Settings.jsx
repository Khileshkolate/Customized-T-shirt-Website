import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mail,
  MapPin,
  Save,
  ShieldCheck,
  Smartphone,
  User
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import axios from '../utils/axiosInstance';

const Toggle = ({ checked, onChange, label, description }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className="w-full flex items-center justify-between gap-4 rounded-lg border border-gray-200 px-4 py-3 text-left hover:bg-gray-50"
  >
    <span>
      <span className="block font-semibold text-gray-900">{label}</span>
      <span className="block text-sm text-gray-600">{description}</span>
    </span>
    <span className={`relative h-7 w-12 rounded-full transition-colors ${checked ? 'bg-primary-600' : 'bg-gray-300'}`}>
      <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </span>
  </button>
);

const Settings = () => {
  const { user, updateProfile } = useAuth();
  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    orderUpdates: true,
    marketingEmails: false
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);

  useEffect(() => {
    const address = user?.addresses?.[0] || {};
    setProfileForm({
      name: user?.name || '',
      phone: user?.phone || '',
      street: address.street || '',
      city: address.city || '',
      state: address.state || '',
      zipCode: address.zipCode || ''
    });
    setPreferences({
      emailNotifications: user?.preferences?.emailNotifications ?? true,
      orderUpdates: user?.preferences?.orderUpdates ?? true,
      marketingEmails: user?.preferences?.marketingEmails ?? false
    });
  }, [user]);

  const handleProfileChange = (field, value) => {
    setProfileForm((current) => ({
      ...current,
      [field]: field === 'phone' || field === 'zipCode' ? value.replace(/\D/g, '').slice(0, field === 'phone' ? 10 : 6) : value
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();

    if (!profileForm.name.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    if (profileForm.phone && profileForm.phone.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    setSavingProfile(true);
    try {
      const result = await updateProfile({
        name: profileForm.name.trim(),
        phone: profileForm.phone,
        addressDetails: {
          street: profileForm.street.trim(),
          city: profileForm.city.trim(),
          state: profileForm.state.trim(),
          zipCode: profileForm.zipCode
        },
        preferences
      });

      if (!result.success) {
        toast.error(result.error || 'Failed to save settings');
      }
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordForm.newPassword.length < 8) {
      toast.error('New password must be at least 8 characters long');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setSavingPassword(true);
    try {
      const response = await axios.put('/auth/password', passwordForm);
      toast.success(response.data.message || 'Password changed successfully');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setSavingPassword(false);
    }
  };

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
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="mt-2 text-gray-600">Manage your account, password, address, and email preferences.</p>
          </div>
          <Link to="/profile" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 font-semibold text-gray-700 hover:bg-gray-50">
            <User className="h-4 w-4" />
            View Profile
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 text-white flex items-center justify-center text-xl font-bold">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="min-w-0">
                  <h2 className="font-bold text-gray-900 truncate">{user?.name}</h2>
                  <p className="text-sm text-gray-600 truncate">{user?.email}</p>
                  <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {user?.isVerified ? 'Verified' : 'Unverified'}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Account Email</h2>
                  <p className="text-sm text-gray-600 break-all">{user?.email}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-500">Email changes are locked so account verification stays reliable.</p>
            </div>
          </div>

          <div className="xl:col-span-2 space-y-6">
            <form onSubmit={handleSaveProfile} className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-11 w-11 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Profile Details</h2>
                  <p className="text-sm text-gray-600">These details appear on your account and orders.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      value={profileForm.name}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      value={profileForm.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                      maxLength="10"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      value={profileForm.street}
                      onChange={(e) => handleProfileChange('street', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    value={profileForm.city}
                    onChange={(e) => handleProfileChange('city', e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                      value={profileForm.state}
                      onChange={(e) => handleProfileChange('state', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">PIN</label>
                    <input
                      value={profileForm.zipCode}
                      onChange={(e) => handleProfileChange('zipCode', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                      maxLength="6"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Toggle
                  checked={preferences.emailNotifications}
                  onChange={(value) => setPreferences((current) => ({ ...current, emailNotifications: value }))}
                  label="Email notifications"
                  description="Receive important account emails and alerts."
                />
                <Toggle
                  checked={preferences.orderUpdates}
                  onChange={(value) => setPreferences((current) => ({ ...current, orderUpdates: value }))}
                  label="Order updates"
                  description="Receive order confirmation, shipping, and delivery updates."
                />
                <Toggle
                  checked={preferences.marketingEmails}
                  onChange={(value) => setPreferences((current) => ({ ...current, marketingEmails: value }))}
                  label="Offers and product news"
                  description="Receive occasional offers, launches, and design ideas."
                />
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-5 py-3 font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {savingProfile ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </form>

            <form onSubmit={handlePasswordChange} className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-lg bg-primary-50 text-primary-700 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Password & Security</h2>
                    <p className="text-sm text-gray-600">Change your password or send a reset link.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  disabled={sendingReset}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary-200 bg-primary-50 px-4 py-3 font-semibold text-primary-700 hover:bg-primary-100 disabled:opacity-50"
                >
                  <Mail className="h-4 w-4" />
                  {sendingReset ? 'Sending...' : 'Email Reset Link'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  ['currentPassword', 'Current Password'],
                  ['newPassword', 'New Password'],
                  ['confirmPassword', 'Confirm Password']
                ].map(([field, label]) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type={showPasswords ? 'text' : 'password'}
                        value={passwordForm[field]}
                        onChange={(e) => setPasswordForm((current) => ({ ...current, [field]: e.target.value }))}
                        className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-10 focus:border-transparent focus:ring-2 focus:ring-primary-500"
                        minLength={field === 'currentPassword' ? undefined : 8}
                        required
                      />
                      {field === 'confirmPassword' && (
                        <button
                          type="button"
                          onClick={() => setShowPasswords((value) => !value)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          aria-label={showPasswords ? 'Hide passwords' : 'Show passwords'}
                        >
                          {showPasswords ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={savingPassword}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-5 py-3 font-semibold text-white hover:bg-primary-700 disabled:opacity-50"
                >
                  <KeyRound className="h-4 w-4" />
                  {savingPassword ? 'Updating...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
