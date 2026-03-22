import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Providers
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';

// Pages
import Designer from './pages/Designer';
import Admin from './pages/Admin'; // NEW ROUTE
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import DesignStudio from './pages/DesignStudio';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import OtpVerification from './pages/OtpVerification';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';
import AdminUsers from './pages/admin/Users';
import AdminDesigns from './pages/admin/Designs';

// Styles
import './styles/globals.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/otp-verification" element={<OtpVerification />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/designer" element={<Designer />} />
                
                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/design" element={<DesignStudio />} />
                  <Route path="/design/:productId" element={<DesignStudio />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/orders/:id" element={<Orders />} />
                </Route>

                {/* Admin Routes */}
                <Route element={<AdminRoute />}>
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/admin-legacy" element={<AdminDashboard />} />
                  <Route path="/admin/products" element={<AdminProducts />} />
                  <Route path="/admin/orders" element={<AdminOrders />} />
                  <Route path="/admin/users" element={<AdminUsers />} />
                  <Route path="/admin/designs" element={<AdminDesigns />} />
                </Route>

                {/* 404 */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;