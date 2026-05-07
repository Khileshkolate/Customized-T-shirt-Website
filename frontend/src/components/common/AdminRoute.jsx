import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X } from 'lucide-react';
import Loader from './Loader';
import AdminSidebar from '../admin/AdminSidebar';

const AdminRoute = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden text-gray-900 w-full">
      {/* Sidebar for Desktop */}
      <div className="hidden md:flex flex-shrink-0 z-10">
        <AdminSidebar />
      </div>

      {/* Sidebar for Mobile (Off-canvas) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" 
            onClick={() => setMobileMenuOpen(false)} 
          />
          {/* Sidebar Drawer */}
          <div className="relative flex-1 w-full max-w-[16rem] bg-gray-900 flex flex-col transform transition-transform shadow-xl">
            <div className="absolute top-0 -right-12 pt-4">
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg focus:outline-none"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="h-full overflow-y-auto w-full">
               <AdminSidebar />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="md:hidden flex items-center justify-between bg-gradient-to-b from-gray-900 to-gray-800 p-4 shrink-0 shadow-md relative z-20">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="font-bold text-xl text-white">VK</span>
             </div>
             <span className="text-white font-bold text-xl tracking-tight">ViragKala</span>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(true)} 
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors focus:outline-none"
          >
            <Menu className="h-7 w-7" />
          </button>
        </div>
        
        {/* Actual Page Body */}
        <main className="flex-1 overflow-auto bg-gray-50/50 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminRoute;