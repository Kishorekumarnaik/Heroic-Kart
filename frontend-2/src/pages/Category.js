import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts, categories } from '../data/products';

const Category = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const category = categories.find((c) => c.id === categoryId);

  useEffect(() => {
    const allProducts = getProducts();
    const filtered = allProducts.filter((p) => p.category === categoryId);
    setProducts(filtered);
  }, [categoryId]);

  return (
    <div className="pb-8" data-testid="category-page">
      <div className="px-4 py-6 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">
          {category?.icon} {category?.name}
        </h1>
        <p className="text-gray-500 mt-1">{products.length} products</p>
      </div>

      <div className="px-4 py-4">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-500">No products in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;