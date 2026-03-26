import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4" data-testid="empty-cart">
        <ShoppingBag className="w-24 h-24 text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6 text-center">Looks like you haven't added anything to your cart yet</p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="bg-[#ff0066] text-white px-8 py-3 rounded-full font-semibold shadow-[0_4px_14px_rgba(255,0,102,0.39)] hover:bg-[#e6005c] transition-all"
          data-testid="start-shopping-button"
        >
          Start Shopping
        </motion.button>
      </div>
    );
  }

  return (
    <div className="pb-8" data-testid="cart-page">
      <div className="px-4 py-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
        <p className="text-gray-500 text-sm mt-1">{cart.length} items</p>
      </div>

      <div className="px-4 py-4 space-y-4">
        {cart.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100"
            data-testid={`cart-item-${item.id}`}
          >
            <div className="flex gap-4">
              {/* Image */}
              <div className="w-24 h-24 bg-gray-50 rounded-2xl flex-shrink-0 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain p-2"
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                  {item.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
                  {item.oldPrice && (
                    <span className="text-sm text-gray-400 line-through">₹{item.oldPrice}</span>
                  )}
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 bg-gray-50 rounded-full px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors active:scale-95"
                      data-testid={`decrease-quantity-${item.id}`}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold text-gray-900 min-w-[20px] text-center" data-testid={`quantity-${item.id}`}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors active:scale-95"
                      data-testid={`increase-quantity-${item.id}`}
                    >
                    <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors active:scale-95"
                    data-testid={`remove-item-${item.id}`}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Price Summary */}
      <div className="px-4 mt-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-3">
          <h3 className="font-bold text-gray-900 mb-4">Price Details</h3>
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>₹{getCartTotal()}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">FREE</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>₹{Math.round(getCartTotal() * 0.18)}</span>
          </div>
          <div className="border-t border-gray-100 pt-3 flex justify-between">
            <span className="font-bold text-gray-900 text-lg">Total</span>
            <span className="font-bold text-gray-900 text-lg" data-testid="cart-total">
              ₹{Math.round(getCartTotal() + getCartTotal() * 0.18)}
            </span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="px-4 mt-6">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/checkout')}
          className="w-full bg-[#ff0066] text-white py-4 rounded-full font-semibold shadow-[0_4px_14px_rgba(255,0,102,0.39)] hover:bg-[#e6005c] transition-all"
          data-testid="checkout-button"
        >
          Proceed to Checkout
        </motion.button>
      </div>
    </div>
  );
};

export default Cart;