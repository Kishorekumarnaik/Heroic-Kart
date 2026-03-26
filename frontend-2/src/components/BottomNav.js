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
