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