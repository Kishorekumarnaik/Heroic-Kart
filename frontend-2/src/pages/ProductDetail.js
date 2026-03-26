import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { getProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const products = getProducts();
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      const similar = products
        .filter((p) => p.category === foundProduct.category && p.id !== id)
        .slice(0, 4);
      setSimilarProducts(similar);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  const images = [product.image, product.image, product.image];
  const discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Added to cart!');
  };

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <div className="pb-8" data-testid="product-detail-page">
      {/* Header */}
      <div className="sticky top-16 z-10 bg-white/90 backdrop-blur-lg border-b border-gray-100 px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95 -ml-2"
          data-testid="back-button"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Image Slider */}
      <div className="bg-white mb-4">
        <div className="relative aspect-square">
          <img
            src={images[currentImage]}
            alt={product.name}
            className="w-full h-full object-contain p-8"
            data-testid="product-image"
          />
          {discount > 0 && (
            <span className="absolute top-4 left-4 bg-[#ff0066] text-white text-sm font-bold px-4 py-2 rounded-full">
              {discount}% OFF
            </span>
          )}
          <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg active:scale-95" data-testid="favorite-button">
            <Heart className="w-5 h-5 text-gray-700" />
          </button>
        </div>
        <div className="flex gap-2 px-4 pb-4 overflow-x-auto">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                currentImage === index ? 'border-[#ff0066]' : 'border-gray-200'
              }`}
              data-testid={`image-thumb-${index}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="px-4 space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
              <Star className="w-4 h-4 fill-green-600 text-green-600" />
              <span className="text-sm font-semibold text-green-600">{product.rating}</span>
            </div>
            <span className="text-sm text-gray-500">(2.3k reviews)</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-gray-900" data-testid="product-price">₹{product.price}</span>
          {product.oldPrice && (
            <>
              <span className="text-xl text-gray-400 line-through" data-testid="product-old-price">
                ₹{product.oldPrice}
              </span>
              <span className="text-lg text-green-600 font-semibold">{discount}% off</span>
            </>
          )}
        </div>

        {/* Description */}
        <div className="border-t border-gray-100 pt-4">
          <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        {/* Details */}
        <div className="border-t border-gray-100 pt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Brand</span>
            <span className="font-semibold text-gray-900">{product.brand}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Availability</span>
            <span className="font-semibold text-green-600">In Stock</span>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="border-t border-gray-100 pt-4">
            <h3 className="font-bold text-gray-900 mb-4">Similar Products</h3>
            <div className="grid grid-cols-2 gap-4">
              {similarProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-100 p-4 flex gap-3" data-testid="product-actions">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          className="flex-1 bg-white text-[#ff0066] border-2 border-[#ff0066] py-3 rounded-full font-semibold transition-all hover:bg-[#ff0066]/5"
          data-testid="add-to-cart-button"
        >
          Add to Cart
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleBuyNow}
          className="flex-1 bg-[#ff0066] text-white py-3 rounded-full font-semibold shadow-[0_4px_14px_rgba(255,0,102,0.39)] hover:bg-[#e6005c] transition-all"
          data-testid="buy-now-button"
        >
          Buy Now
        </motion.button>
      </div>
    </div>
  );
};
export default ProductDetail;