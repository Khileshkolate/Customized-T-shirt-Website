import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Palette,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: '/admin/products', label: 'Products', icon: <Package className="h-5 w-5" /> },
    { path: '/admin/orders', label: 'Orders', icon: <ShoppingBag className="h-5 w-5" /> },
    { path: '/admin/users', label: 'Users', icon: <Users className="h-5 w-5" /> },
    { path: '/admin/designs', label: 'Designs', icon: <Palette className="h-5 w-5" /> },
    { path: '/admin/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <aside className={`bg-gray-900 text-white h-screen sticky top-0 transition-all duration-300 ${
      collapsed ? 'w-20' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="font-bold">P</span>
                </div>
                <span className="text-xl font-bold">PrintCraft</span>
              </div>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 hover:bg-gray-800 rounded-lg"
            >
              {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </button>
          </div>
          {!collapsed && (
            <p className="text-gray-400 text-sm mt-2">Admin Panel</p>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item.icon}
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          {!collapsed && (
            <div className="mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                  <span className="font-bold text-white">A</span>
                </div>
                <div>
                  <div className="font-medium">Admin User</div>
                  <div className="text-sm text-gray-400">admin@printcraft.com</div>
                </div>
              </div>
            </div>
          )}
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;