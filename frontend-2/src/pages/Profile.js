import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, LogOut, Package, MapPin, Settings, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const Profile = () => {
  const navigate = useNavigate();
  const { user, loginWithGoogle, logout } = useAuth();

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success('Logged in successfully!');
    } catch (error) {
      console.error('Login error:', error);
      if (error.code === 'auth/unauthorized-domain') {
        toast.error('Domain not authorized. Please add this domain in Firebase Console → Authentication → Settings → Authorized domains');
      } else if (error.code === 'auth/popup-blocked') {
        toast.error('Popup blocked. Please allow popups for this site.');
      } else {
        toast.error(`Login failed: ${error.message || 'Please check Firebase configuration'}`);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4" data-testid="login-screen">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <UserIcon className="w-12 h-12 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome!</h2>
        <p className="text-gray-500 mb-6 text-center">Login to access your profile and orders</p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          className="bg-[#ff0066] text-white px-8 py-3 rounded-full font-semibold shadow-[0_4px_14px_rgba(255,0,102,0.39)] hover:bg-[#e6005c] transition-all flex items-center gap-2"
          data-testid="google-login-button"
        >
          <LogIn className="w-5 h-5" />
          Login with Google
        </motion.button>
      </div>
    );
  }

  const menuItems = [
    { icon: Package, label: 'My Orders', path: '/orders', testId: 'my-orders' },
    { icon: MapPin, label: 'Saved Addresses', path: '/addresses', testId: 'saved-addresses' },
    { icon: Settings, label: 'Settings', path: '/settings', testId: 'settings' }
  ];

  return (
    <div className="pb-8" data-testid="profile-page">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-[#ff0066] to-[#e6005c] px-4 py-8 text-white">
        <div className="flex items-center gap-4">
          <img
            src={user.photoURL || 'https://via.placeholder.com/80'}
            alt={user.displayName}
            className="w-20 h-20 rounded-full border-4 border-white/30"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.displayName}</h1>
            <p className="text-white/80 text-sm">{user.email}</p>
          </div>
        </div>
      </div>
      
      {/* Menu Items */}
      <div className="px-4 py-6 space-y-3">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:bg-gray-50 transition-colors active:scale-95"
            data-testid={item.testId}
          >
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center">
              <item.icon className="w-6 h-6 text-gray-700" />
            </div>
            <span className="flex-1 text-left font-semibold text-gray-900">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <div className="px-4">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="w-full bg-white text-red-500 border-2 border-red-500 py-4 rounded-full font-semibold hover:bg-red-50 transition-all flex items-center justify-center gap-2"
          data-testid="logout-button"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </motion.button>
      </div>
    </div>
  );
};

export default Profile;