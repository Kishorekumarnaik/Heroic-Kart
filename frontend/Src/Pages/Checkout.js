import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOrderEmail = async (orderData) => {
    try {
      const itemsList = orderData.items.map((item, index) => 
        `${index + 1}. ${item.name} - Qty: ${item.quantity} - ₹${item.price * item.quantity}`
      ).join('\n');

      const emailParams = {
        order_id: `ORD-${Date.now()}`,
        name: orderData.name,
        email: orderData.email,
        phone: orderData.phone,
        address: orderData.address,
        city: orderData.city,
        state: orderData.state,
        pincode: orderData.pincode,
        country: 'India',
        items: itemsList,
        total: orderData.total,
        payment: orderData.paymentMethod
      };

      await emailjs.send(
        'service_emxx50k',
        'template_3h8gr1r',
        emailParams,
        'S6DfVf9hM1FLGb_0V'
      );
      
      console.log('Order confirmation email sent successfully');
    } catch (error) {
      console.error('Failed to send order email:', error);
    }
  };

  const handleRazorpayPayment = async () => {
    const totalAmount = Math.round(getCartTotal() + getCartTotal() * 0.18);
    
    const options = {
      key: 'rzp_live_SVpGtfXRHFaUpX',
      amount: totalAmount * 100,
      currency: 'INR',
      name: 'Heroic Kart',
      description: 'Order Payment',
      handler: async function (response) {
        const orderData = {
          ...formData,
          items: cart,
          total: totalAmount,
          paymentId: response.razorpay_payment_id,
          paymentMethod: 'Online Payment (Razorpay)',
          orderDate: new Date().toLocaleString()
        };
        
        await sendOrderEmail(orderData);
        clearCart();
        toast.success('Order placed successfully! Check your email for confirmation.');
        navigate('/profile');
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone
      },
      theme: {
        color: '#ff0066'
      }
    };

    if (window.Razorpay) {
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } else {
      toast.error('Payment gateway not loaded. Please refresh the page.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (paymentMethod === 'razorpay') {
        await handleRazorpayPayment();
      } else {
        const orderData = {
          ...formData,
          items: cart,
          total: Math.round(getCartTotal() + getCartTotal() * 0.18),
          paymentMethod: 'Cash on Delivery',
          orderDate: new Date().toLocaleString()
        };
        
        await sendOrderEmail(orderData);
        clearCart();
        toast.success('Order placed successfully! Check your email for confirmation.');
        navigate('/profile');
      }
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const totalAmount = Math.round(getCartTotal() + getCartTotal() * 0.18);

  return (
    <div className="pb-8" data-testid="checkout-page">
      <div className="px-4 py-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-6 space-y-6">
        {/* Delivery Address */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4">Delivery Address</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff0066]/20 focus:border-[#ff0066]"
              data-testid="name-input"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff0066]/20 focus:border-[#ff0066]"
              data-testid="phone-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff0066]/20 focus:border-[#ff0066]"
              data-testid="email-input"
            />
            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff0066]/20 focus:border-[#ff0066]"
              data-testid="address-input"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff0066]/20 focus:border-[#ff0066]"
                data-testid="city-input"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                required
                className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff0066]/20 focus:border-[#ff0066]"
                data-testid="state-input"
              />
            </div>
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff0066]/20 focus:border-[#ff0066]"
              data-testid="pincode-input"
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4">Payment Method</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#ff0066] transition-colors" data-testid="razorpay-option">
              <input
                type="radio"
                name="payment"
                value="razorpay"
                checked={paymentMethod === 'razorpay'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-5 h-5 text-[#ff0066] focus:ring-[#ff0066]"
              />
              <div className="flex-1">
                <span className="font-semibold text-gray-900">Online Payment</span>
                <p className="text-sm text-gray-500">Pay using Razorpay (Cards, UPI, Wallets)</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-[#ff0066] transition-colors" data-testid="cod-option">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-5 h-5 text-[#ff0066] focus:ring-[#ff0066]"
              />
              <div className="flex-1">
                <span className="font-semibold text-gray-900">Cash on Delivery</span>
                <p className="text-sm text-gray-500">Pay when you receive the order</p>
              </div>
            </label>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-3">
          <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
          <div className="flex justify-between text-gray-600">
            <span>Items ({cart.length})</span>
            <span>₹{getCartTotal()}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span className="text-green-600 font-medium">FREE</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax (18%)</span>
            <span>₹{Math.round(getCartTotal() * 0.18)}</span>
          </div>
          <div className="border-t border-gray-100 pt-3 flex justify-between">
            <span className="font-bold text-gray-900 text-lg">Total</span>
            <span className="font-bold text-gray-900 text-lg" data-testid="total-amount">
              ₹{totalAmount}
            </span>
          </div>
        </div>

        {/* Place Order Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={loading}
          className="w-full bg-[#ff0066] text-white py-4 rounded-full font-semibold shadow-[0_4px_14px_rgba(255,0,102,0.39)] hover:bg-[#e6005c] transition-all disabled:opacity-50"
          data-testid="place-order-button"
        >
          {loading ? 'Processing...' : 'Place Order'}
        </motion.button>
      </form>
    </div>
  );
};

export default Checkout;