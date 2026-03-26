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