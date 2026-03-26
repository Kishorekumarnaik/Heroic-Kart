import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { addProduct, categories, brands } from '../data/products';
import { toast } from 'sonner';
import { Package } from 'lucide-react';

const Admin = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    oldPrice: '',
    image: '',
    category: '',
    brand: '',
    description: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      const product = {
        ...formData,
        price: parseInt(formData.price),
        oldPrice: formData.oldPrice ? parseInt(formData.oldPrice) : null
      };
      
      addProduct(product);
      toast.success('Product added successfully!');
      
      setFormData({
        name: '',
        price: '',
        oldPrice: '',
        image: '',
        category: '',
        brand: '',
        description: ''
      });
    } catch (error) {
      toast.error('Failed to add product');
    }
  };

  return (
    <div className="pb-8 min-h-screen bg-[#f8f9fa]" data-testid="admin-page">
      {/* Header */}
      <div className="bg-gradient-to-r from-black to-gray-800 px-4 py-8 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-white/70 text-sm">Manage your products</p>
          </div>
        </div>
      </div>

      {/* Notice */}
      <div className="px-4 py-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
          <p className="text-yellow-800 text-sm">
            <strong>Note:</strong> This admin panel is for demonstration purposes. In production, implement proper authentication and authorization.
          </p>
        </div>
      </div>

      {/* Add Product Form */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-6 text-xl">Add New Product</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter product name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff0066]/20 focus:border-[#ff0066]"
                data-testid="product-name-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  placeholder="₹999"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff0066]/20 focus:border-[#ff0066]"
                  data-testid="product-price-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Old Price
                </label>
                <input
                  type="number"
                  name="oldPrice"
                  value={formData.oldPrice}
                  onChange={handleInputChange}
                  placeholder="₹1499"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff0066]/20 focus:border-[#ff0066]"
                  data-testid="product-old-price-input"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL *
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
                placeholder="https://example.com/image.jpg"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff0066]/20 focus:border-[#ff0066]"
                data-testid="product-image-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff0066]/20 focus:border-[#ff0066]"
                data-testid="product-category-select"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand *
              </label>
              <select
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff0066]/20 focus:border-[#ff0066]"
                data-testid="product-brand-select"
              >
                <option value="">Select brand</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff0066]/20 focus:border-[#ff0066]"
                data-testid="product-description-input"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-[#ff0066] text-white py-4 rounded-full font-semibold shadow-[0_4px_14px_rgba(255,0,102,0.39)] hover:bg-[#e6005c] transition-all"
              data-testid="add-product-button"
            >
              Add Product
            </motion.button>
          </form>
        </div>
      </div>

      {/* Instructions */}
      <div className="px-4 py-4">
        <div className="bg-gray-50 rounded-2xl p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Instructions:</h3>
          <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
            <li>All fields marked with * are required</li>
            <li>Products are saved to localStorage</li>
            <li>Use valid image URLs for product images</li>
            <li>Price should be in INR (Rupees)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;