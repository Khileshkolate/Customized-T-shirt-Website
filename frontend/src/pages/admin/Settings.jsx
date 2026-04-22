import React, { useState } from 'react';
import { 
  Save, Store, Bell, Shield, PaintBucket, 
  Globe, Mail, Phone, DollarSign, Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';
import toast from 'react-hot-toast';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  // Mock initial state
  const [formData, setFormData] = useState({
    storeName: 'ViragKala',
    contactEmail: 'admin@viragkala.com',
    supportPhone: '+91 98765 43210',
    currency: 'INR (₹)',
    siteDescription: 'Custom printed t-shirts and apparel.',
    maintenanceMode: false,
    orderNotifications: true,
    userSignups: true,
    primaryColor: '#6366f1',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    // Mock save delay
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Settings saved successfully!');
    }, 1000);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: <Store size={18} /> },
    { id: 'appearance', label: 'Appearance', icon: <PaintBucket size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your store preferences and configurations</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-sm disabled:opacity-70 w-full sm:w-auto justify-center"
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save size={18} />
          )}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-64 flex-shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 flex flex-col gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                  activeTab === tab.id 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 w-full relative">
          <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* --- GENERAL TAB --- */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-5">
                  <h2 className="text-xl font-bold text-gray-900">Store Details</h2>
                  <p className="text-sm text-gray-500 mt-1">Basic information about your business</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Globe size={16} className="text-gray-400" /> Store Name
                    </label>
                    <input 
                      type="text" 
                      name="storeName"
                      value={formData.storeName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <DollarSign size={16} className="text-gray-400" /> Currency
                    </label>
                    <select 
                      name="currency"
                      value={formData.currency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors"
                    >
                      <option value="INR (₹)">INR (₹)</option>
                      <option value="USD ($)">USD ($)</option>
                      <option value="EUR (€)">EUR (€)</option>
                      <option value="GBP (£)">GBP (£)</option>
                    </select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Mail size={16} className="text-gray-400" /> Contact Email
                    </label>
                    <input 
                      type="email" 
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Phone size={16} className="text-gray-400" /> Support Phone
                    </label>
                    <input 
                      type="text" 
                      name="supportPhone"
                      value={formData.supportPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700">Site Description</label>
                    <textarea 
                      name="siteDescription"
                      value={formData.siteDescription}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors resize-none"
                    />
                    <p className="text-xs text-gray-400">Used for SEO meta descriptions.</p>
                  </div>
                </div>
              </div>
            )}

            {/* --- APPEARANCE TAB --- */}
            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-5">
                  <h2 className="text-xl font-bold text-gray-900">Branding & Appearance</h2>
                  <p className="text-sm text-gray-500 mt-1">Customize how your store looks to customers</p>
                </div>
                
                <div className="space-y-6">
                  {/* Logo Upload */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-gray-700">Store Logo</label>
                    <div className="flex items-start gap-6">
                      <div className="w-24 h-24 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 transition-colors cursor-pointer group relative overflow-hidden">
                         <div className="absolute inset-0 bg-primary-600/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs font-bold text-primary-700">Change</span>
                         </div>
                         <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center group-hover:scale-95 transition-transform duration-300">
                           <span className="font-black text-white text-lg">VK</span>
                         </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-3">Upload a square logo. Recommended size: 512x512px. Max file size: 2MB.</p>
                        <button type="button" className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                          Upload New Logo
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Themes / Colors */}
                  <div className="space-y-3 pt-6 border-t border-gray-100">
                    <label className="text-sm font-semibold text-gray-700">Primary Brand Color</label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="color" 
                        name="primaryColor"
                        value={formData.primaryColor}
                        onChange={handleInputChange}
                        className="w-12 h-12 p-1 rounded-xl border border-gray-200 bg-white cursor-pointer"
                      />
                      <input 
                        type="text" 
                        name="primaryColor"
                        value={formData.primaryColor}
                        onChange={handleInputChange}
                        className="w-32 px-3 py-2 border border-gray-200 rounded-lg text-sm uppercase tracking-wider font-mono bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* --- NOTIFICATIONS TAB --- */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-5">
                  <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                  <p className="text-sm text-gray-500 mt-1">Manage email alerts and admin updates</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50/50 transition-colors">
                    <div>
                      <h4 className="font-semibold text-gray-900">New Order Alerts</h4>
                      <p className="text-sm text-gray-500 mt-1">Receive an email when a customer places a successful order.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" name="orderNotifications" checked={formData.orderNotifications} onChange={handleInputChange} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50/50 transition-colors">
                    <div>
                      <h4 className="font-semibold text-gray-900">Low Stock Alerts</h4>
                      <p className="text-sm text-gray-500 mt-1">Get notified when a product inventory falls below 5 items.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50/50 transition-colors">
                    <div>
                      <h4 className="font-semibold text-gray-900">Customer Feedbacks</h4>
                      <p className="text-sm text-gray-500 mt-1">Receive alerts for new design submissions and reviews.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* --- SECURITY TAB --- */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-5">
                  <h2 className="text-xl font-bold text-gray-900">Security & Access</h2>
                  <p className="text-sm text-gray-500 mt-1">Manage global site toggles and admin protection</p>
                </div>
                
                <div className="space-y-6">
                  {/* Maintenance Mode */}
                  <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">
                    <div className="flex items-start justify-between">
                      <div className="pr-4">
                        <h4 className="font-bold text-orange-900 flex items-center gap-2">
                          Maintenance Mode
                        </h4>
                        <p className="text-sm text-orange-800/80 mt-1.5">
                          When enabled, the public storefront will be hidden and display a "Coming Soon" page. Only authenticated Admins can view the actual site content.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                        <input type="checkbox" name="maintenanceMode" checked={formData.maintenanceMode} onChange={handleInputChange} className="sr-only peer" />
                        <div className="w-11 h-6 bg-orange-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-orange-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
                      </label>
                    </div>
                  </div>

                  {/* Disable Signups */}
                  <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50/50 transition-colors">
                    <div>
                      <h4 className="font-semibold text-gray-900">Allow New User Registrations</h4>
                      <p className="text-sm text-gray-500 mt-1">If turned off, new customers cannot create accounts. Existing customers can still log in.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" name="userSignups" checked={formData.userSignups} onChange={handleInputChange} className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>

                  {/* Password Change */}
                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-4">Admin Credentials</h4>
                    <button type="button" className="px-4 py-2 bg-white border border-gray-300 shadow-sm text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                      Change Admin Password
                    </button>
                    <p className="text-xs text-gray-400 mt-2">You will be sent an email link to securely reset your password.</p>
                  </div>
                </div>
              </div>
            )}
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
