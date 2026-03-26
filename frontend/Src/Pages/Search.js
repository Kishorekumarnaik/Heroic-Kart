import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../data/products';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || searchParams.get('brand') || '');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const products = getProducts();
    const query = searchParams.get('q');
    const brand = searchParams.get('brand');
    
    let filtered = products;
    
    if (query) {
      filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    } else if (brand) {
      filtered = products.filter((product) => product.brand === brand);
    }
    
    setFilteredProducts(filtered);
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
    }
  };

  return (
    <div className="pb-8" data-testid="search-page">
      {/* Search Bar */}
      <div className="px-4 py-4 border-b border-gray-100 sticky top-16 bg-white z-10">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff0066]/20 focus:border-[#ff0066] transition-all"
              data-testid="search-input-field"
            />
          </div>
        </form>
      </div>

      {/* Results */}
      <div className="px-4 py-4">
        <p className="text-gray-500 mb-4">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'} found
        </p>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <SearchIcon className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-center">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;