import React from 'react';
import { X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { categories, brands } from '../data/products';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const DrawerMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
    onClose();
  };

  const handleBrandClick = (brand) => {
    navigate(`/search?brand=${encodeURIComponent(brand)}`);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
          data-testid="drawer-overlay"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-4/5 max-w-sm bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        data-testid="drawer-menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
            data-testid="drawer-close-button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <Accordion type="single" collapsible className="w-full">
            {/* Categories */}
            <AccordionItem value="categories">
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-50" data-testid="categories-accordion">
                <span className="font-semibold text-gray-900">Categories</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className="w-full flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition-colors text-left"
                      data-testid={`category-${category.id}`}
                    >
                      <span className="text-gray-700">
                        {category.icon} {category.name}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            

            {/* Brands */}
            <AccordionItem value="brands">
              <AccordionTrigger className="px-4 py-3 hover:bg-gray-50" data-testid="brands-accordion">
                <span className="font-semibold text-gray-900">Brands</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-1">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => handleBrandClick(brand)}
                      className="w-full flex items-center justify-between px-6 py-3 hover:bg-gray-50 transition-colors text-left"
                      data-testid={`brand-${brand.toLowerCase()}`}
                    >
                      <span className="text-gray-700">{brand}</span>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Admin Link */}
          <button
            onClick={() => {
              navigate('/admin');
              onClose();
            }}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-t border-gray-100 mt-4"
            data-testid="admin-link"
          >
            <span className="text-gray-700 font-medium">Admin Panel</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default DrawerMenu;