// import { Link, useLocation } from 'react-router-dom';
// import { 
//   LayoutDashboard, 
//   Package, 
//   ShoppingBag, 
//   Users, 
//   Palette,
//   Settings,
//   LogOut,
//   ChevronLeft,
//   ChevronRight
// } from 'lucide-react';
// import { useState } from 'react';
// import { useAuth } from '../../contexts/AuthContext';

// const AdminSidebar = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const location = useLocation();
//   const { logout } = useAuth();

//   const navItems = [
//     { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
//     { path: '/admin/products', label: 'Products', icon: <Package className="h-5 w-5" /> },
//     { path: '/admin/orders', label: 'Orders', icon: <ShoppingBag className="h-5 w-5" /> },
//     { path: '/admin/users', label: 'Users', icon: <Users className="h-5 w-5" /> },
//     { path: '/admin/designs', label: 'Designs', icon: <Palette className="h-5 w-5" /> },
//     { path: '/admin/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
//   ];

//   const handleLogout = () => {
//     logout();
//     window.location.href = '/';
//   };

//   return (
//     <aside className={`bg-gray-900 text-white h-screen sticky top-0 transition-all duration-300 ${
//       collapsed ? 'w-20' : 'w-64'
//     }`}>
//       <div className="flex flex-col h-full">
//         {/* Header */}
//         <div className="p-6 border-b border-gray-800">
//           <div className="flex items-center justify-between">
//             {!collapsed && (
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
//                   <span className="font-bold">P</span>
//                 </div>
//                 <span className="text-xl font-bold">PrintCraft</span>
//               </div>
//             )}
//             <button
//               onClick={() => setCollapsed(!collapsed)}
//               className="p-2 hover:bg-gray-800 rounded-lg"
//             >
//               {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
//             </button>
//           </div>
//           {!collapsed && (
//             <p className="text-gray-400 text-sm mt-2">Admin Panel</p>
//           )}
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 p-4 space-y-1">
//           {navItems.map((item) => {
//             const isActive = location.pathname === item.path;
//             return (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
//                   isActive
//                     ? 'bg-primary-600 text-white'
//                     : 'text-gray-300 hover:bg-gray-800 hover:text-white'
//                 }`}
//               >
//                 {item.icon}
//                 {!collapsed && <span>{item.label}</span>}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Footer */}
//         <div className="p-4 border-t border-gray-800">
//           {!collapsed && (
//             <div className="mb-4">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
//                   <span className="font-bold text-white">A</span>
//                 </div>
//                 <div>
//                   <div className="font-medium">Admin User</div>
//                   <div className="text-sm text-gray-400">admin@printcraft.com</div>
//                 </div>
//               </div>
//             </div>
//           )}
          
//           <button
//             onClick={handleLogout}
//             className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
//           >
//             <LogOut className="h-5 w-5" />
//             {!collapsed && <span>Logout</span>}
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default AdminSidebar;

















// src/components/admin/AdminSidebar.jsx
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
  ChevronRight,
  Bell,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { logout, user } = useAuth();

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
    <aside className={`bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen sticky top-0 transition-all duration-300 flex flex-col ${
      collapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="font-bold text-xl">VK</span>
              </div>
              <div>
                <span className="text-xl font-bold">ViragKala</span>
                <div className="text-xs text-gray-400 mt-0.5">Admin Panel</div>
              </div>
            </div>
          )}
          {collapsed && (
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg mx-auto">
              <span className="font-bold text-lg">VK</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-gray-800 rounded-lg ml-auto"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Quick Stats (Visible when expanded) */}
      {!collapsed && (
        <div className="p-4 border-b border-gray-700">
          <div className="bg-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Total Revenue</span>
              <span className="text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded-full">+12%</span>
            </div>
            <div className="text-xl font-bold">₹1,24,856</div>
            <div className="text-xs text-gray-400 mt-1">This month</div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
                          location.pathname.startsWith(`${item.path}/`);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <div className={`${isActive ? 'text-white' : 'text-gray-400'}`}>
                {item.icon}
              </div>
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        {/* Notifications */}
        {!collapsed && (
          <div className="flex items-center gap-3 mb-4">
            <button className="relative p-2 hover:bg-gray-800 rounded-lg">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-lg">
              <MessageSquare className="h-5 w-5" />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-lg ml-auto">
              <HelpCircle className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg">
            <span className="font-bold text-white">
              {(user?.name || 'Admin').charAt(0).toUpperCase()}
            </span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{user?.name || 'Admin User'}</div>
              <div className="text-xs text-gray-400 truncate">{user?.email || 'admin@viragkala.com'}</div>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 w-full px-4 py-3 mt-4 text-red-400 hover:bg-gray-800 rounded-xl transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;