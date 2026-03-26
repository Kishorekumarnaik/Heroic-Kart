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