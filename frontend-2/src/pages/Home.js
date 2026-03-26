code
Code

preview
Preview

Deploy
Loading...
Hey Krish., Quick input needed :
Continuing with Components...

🔟 src/components/Navbar.js
Location: frontend/src/components/Navbar.js

import React from 'react';
import { Menu, User } from 'lucide-react';

const Navbar = ({ onMenuClick, onProfileClick }) => {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-100 px-4 h-16 flex items-center justify-between" data-testid="navbar">
      <button
        onClick={onMenuClick}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
        data-testid="menu-button"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>
      
      <div className="flex-1 flex justify-center">
        <img
          src="https://i.postimg.cc/BvfPNNT6/IMG-20260326-133304.png"
          alt="Logo"
          className="h-10 object-contain"
          data-testid="navbar-logo"
        />
      </div>
      
      <button
        onClick={onProfileClick}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
        data-testid="profile-button"
      >
        <User className="w-6 h-6 text-gray-700" />
      </button>
    </nav>
  );
};

export default Navbar;
1️⃣1️⃣ src/components/BottomNav.js
Location: frontend/src/components/BottomNav.js

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const navItems = [
    { path: '/', icon: Home, label: 'Home', testId: 'bottom-nav-home' },
    { path: '/search', icon: Search, label: 'Search', testId: 'bottom-nav-search' },
    { path: '/cart', icon: ShoppingCart, label: 'Cart', testId: 'bottom-nav-cart' },
    { path: '/profile', icon: User, label: 'Profile', testId: 'bottom-nav-profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-white/90 backdrop-blur-lg border-t border-gray-100 h-16 flex justify-around items-center z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]" data-testid="bottom-nav">
      {navItems.map(({ path, icon: Icon, label, testId }) => {
        const isActive = location.pathname === path;
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="flex flex-col items-center justify-center flex-1 h-full transition-all active:scale-95"
            data-testid={testId}
          >
            <div className="relative">
              <Icon
                className={`w-6 h-6 transition-colors ${
                  isActive ? 'text-[#ff0066]' : 'text-gray-500'
                }`}
              />
              {label === 'Cart' && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#ff0066] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center" data-testid="cart-count-badge">
                  {cartCount}
                </span>
              )}
            </div>
            <span
              className={`text-xs mt-1 font-medium transition-colors ${
                isActive ? 'text-[#ff0066]' : 'text-gray-500'
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
1️⃣2️⃣ src/components/DrawerMenu.js
Location: frontend/src/components/DrawerMenu.js

import React from 'react';
import { X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { categories, brands } from '../data/products';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const DrawerMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
    onClose();
  };

  const handleBrandClick = (brand) => {
    navigate(`/search?brand=${encodeURIComponent(brand)}`);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
          data-testid="drawer-overlay"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-4/5 max-w-sm bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        data-testid="drawer-menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
            data-testid="drawer-close-button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <Accordion type="single" collapsible className="w-full">
            {/* Categories */}
            <AccordionItem value="categories">
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-50" data-testid="categories-accordion">
                <span className="font-semibold text-gray-900">Categories</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className="w-full flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition-colors text-left"
                      data-testid={`category-${category.id}`}
                    >
                      <span className="text-gray-700">
                        {category.icon} {category.name}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Brands */}
            <AccordionItem value="brands">
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-50" data-testid="brands-accordion">
                <span className="font-semibold text-gray-900">Brands</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => handleBrandClick(brand)}
                      className="w-full flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition-colors text-left"
                      data-testid={`brand-${brand.toLowerCase()}`}
                    >
                      <span className="text-gray-700">{brand}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Admin Link */}
          <button
            onClick={() => {
              navigate('/admin');
              onClose();
            }}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-t border-gray-100 mt-4"
            data-testid="admin-link"
          >
            <span className="text-gray-700 font-medium">Admin Panel</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default DrawerMenu;
1️⃣3️⃣ src/components/Layout.js
Location: frontend/src/components/Layout.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import BottomNav from './BottomNav';
import DrawerMenu from './DrawerMenu';

const Layout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24 relative overflow-x-hidden w-full">
      <Navbar
        onMenuClick={() => setIsDrawerOpen(true)}
        onProfileClick={() => navigate('/profile')}
      />
      <DrawerMenu isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <main className="w-full">{children}</main>
      <BottomNav />
    </div>
  );
};

export default Layout;
1️⃣4️⃣ src/components/ProductCard.js
Location: frontend/src/components/ProductCard.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className="flex flex-col rounded-3xl bg-white shadow-sm overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-1"
      onClick={() => navigate(`/product/${product.id}`)}
      data-testid={`product-card-${product.id}`}
    >
      {/* Image */}
      <div className="h-56 bg-gray-50 p-4 flex items-center justify-center relative">
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-[#ff0066]/10 text-[#ff0066] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider" data-testid="discount-badge">
            {discount}% OFF
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-gray-700">{product.rating}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">₹{product.oldPrice}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
Continue to next message for Pages (15-22)...

Mar 26, 05:28 PM

Rollback

Continue

Mar 26, 05:41 PM

Hey Krish., Quick input needed :
Agent will continue working after your reply
Continuing with Pages...

1️⃣5️⃣ src/pages/Home.js
Location: frontend/src/pages/Home.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { getProducts, categories } from '../data/products';

const Home = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadedProducts = getProducts();
    setProducts(loadedProducts);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const bannerSlides = [
    {
      bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      title: 'Summer Sale',
      subtitle: 'Up to 70% OFF'
    },
    {
      bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      title: 'New Arrivals',
      subtitle: 'Fresh Collection'
    },
    {
      bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      title: 'Free Shipping',
      subtitle: 'On orders above ₹999'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [bannerSlides.length]);

  return (
    <div className="w-full" data-testid="home-page">
      {/* Search Bar */}
      <div className="px-4 py-4">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff0066]/20 focus:border-[#ff0066] transition-all"
              data-testid="search-input"
            />
          </div>
        </form>
      </div>

      {/* Categories Scroll */}
      <div className="px-4 mb-6">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/category/${category.id}`)}
              className="flex-shrink-0 flex flex-col items-center gap-2 min-w-[80px]"
              data-testid={`category-chip-${category.id}`}
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-gray-100">
                {category.icon}
              </div>
              <span className="text-xs font-medium text-gray-700 text-center">
                {category.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Banner Slider */}
      <div className="px-4 mb-6">
        <div className="relative h-40 rounded-3xl overflow-hidden">
          {bannerSlides.map((slide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: currentSlide === index ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-white"
              style={{ background: slide.bg }}
            >
              <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
              <p className="text-lg">{slide.subtitle}</p>
            </motion.div>
          ))}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {bannerSlides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? 'bg-white w-6' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Offer Banner */}
      <div className="px-4 mb-6">
        <div className="bg-gradient-to-r from-[#ff0066] to-[#e6005c] rounded-3xl p-6 text-white">
          <h3 className="text-xl font-bold mb-1">Special Offer!</h3>
          <p className="text-sm opacity-90 mb-3">Get extra 10% off on your first order</p>
          <button className="bg-white text-[#ff0066] px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors active:scale-95" data-testid="offer-button">
            Shop Now
          </button>
        </div>
      </div>

      {/* Latest Products */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Latest Products</h2>
          <button
            onClick={() => navigate('/search')}
            className="text-[#ff0066] text-sm font-semibold flex items-center gap-1"
            data-testid="view-all-button"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {products.slice(0, 10).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;