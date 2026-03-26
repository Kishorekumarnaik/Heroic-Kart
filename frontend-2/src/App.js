import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Toaster } from './components/ui/sonner';
import { initializeProducts } from './data/products';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Search from './pages/Search';
import Category from './pages/Category';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

function App() {
  useEffect(() => {
    // Initialize products in localStorage on app start
    initializeProducts();
  }, []);

  return (
    <Router basename="/Heroic-Kart">
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/search" element={<Search />} />
              <Route path="/category/:categoryId" element={<Category />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Layout>
          <Toaster position="top-center" richColors />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
