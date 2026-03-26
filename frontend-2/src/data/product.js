shop-mobile-first

39.01

Buy Credits


User Avatar








code
Code

preview
Preview

Deploy
Loading...
Hey Krish., Quick input needed :
Perfect! Here's how to download all your files:

📥 HOW TO DOWNLOAD YOUR ECOMMERCE WEBSITE FILES
✅ RECOMMENDED METHOD: Save to GitHub
Step 1: Connect GitHub

Click your profile icon at the top
Click "Connect GitHub"
Authorize Emergent
Step 2: Push to GitHub

Look for the "Save to GitHub" button in the chat
Select your repository or create a new one
Click "PUSH TO GITHUB"
All 88 files will be saved!
Step 3: Clone to Your Computer

git clone <your-repository-url>
cd your-repository
Now you have all files locally! ✅

📋 WHAT YOU'LL GET:
Your Complete Project Structure:

your-ecommerce-site/
├── frontend/
│   ├── src/
│   │   ├── pages/ (8 pages)
│   │   ├── components/ (5 custom + 54 UI)
│   │   ├── context/ (2 files)
│   │   ├── data/ (products.js)
│   │   ├── firebase.js
│   │   ├── App.js
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   ├── .env
│   └── tailwind.config.js
├── backend/
└── docs/
    ├── README_ECOMMERCE.md
    ├── COMPLETE_SETUP.md
    ├── FIREBASE_FIX.md
    └── COMPLETE_FILE_LIST.md
🚀 AFTER DOWNLOAD - RUN LOCALLY:
# Install dependencies
cd frontend
yarn install

# Add your Firebase credentials to .env
# (Already configured in Emergent)

# Start development server
yarn start
Your site will run on http://localhost:3000 🎉

📝 NOTE:
GitHub Push requires a paid plan
All your integrations (Firebase, Razorpay, EmailJS) are already configured
Just need to add the domain to Firebase Console (see FIREBASE_FIX.md)
Ready to download your complete ecommerce website! 🚀

Mar 26, 05:00 PM

Rollback

Generate all the files in order wise again I will copy all those

And say full site structure - how to place files

Mar 26, 05:08 PM

Hey Krish., Quick input needed :
Agent will continue working after your reply
I'll provide all the files in order with the complete directory structure. You can copy each file exactly as shown.

📁 COMPLETE SITE STRUCTURE
your-project/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── BottomNav.js
│   │   │   ├── DrawerMenu.js
│   │   │   ├── Layout.js
│   │   │   └── ProductCard.js
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── CartContext.js
│   │   ├── data/
│   │   │   └── products.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── ProductDetail.js
│   │   │   ├── Cart.js
│   │   │   ├── Checkout.js
│   │   │   ├── Search.js
│   │   │   ├── Category.js
│   │   │   ├── Profile.js
│   │   │   └── Admin.js
│   │   ├── firebase.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── .env
│   └── package.json
└── README.md
📝 FILES IN ORDER - COPY EACH ONE
1️⃣ public/index.html
Location: frontend/public/index.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#ff0066" />
    <meta name="description" content="Heroic Kart - Premium Mobile Shopping Experience" />
    <title>Heroic Kart - Shop Now</title>
    
    <!-- Razorpay Script -->
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
2️⃣ src/index.js
Location: frontend/src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
3️⃣ src/index.css
Location: frontend/src/index.css

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Custom animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
4️⃣ src/App.css
Location: frontend/src/App.css

/* Add any custom styles here if needed */
5️⃣ src/App.js
Location: frontend/src/App.js

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Toaster } from './components/ui/sonner';
import { initializeProducts } from './data/products';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Search from './pages/Search';
import Category from './pages/Category';
import Profile from './pages/Profile';
import Admin from './pages/Admin';

function App() {
  useEffect(() => {
    // Initialize products in localStorage on app start
    initializeProducts();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/search" element={<Search />} />
              <Route path="/category/:categoryId" element={<Category />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Layout>
          <Toaster position="top-center" richColors />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
6️⃣ src/firebase.js
Location: frontend/src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyCCrLwW0eavjsq-x2m-Nw_vRe3GcAkGEJU",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "heroic-kart-407b1.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "heroic-kart-407b1",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "heroic-kart-407b1.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "148331533545",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:148331533545:web:a8cfc31ce950bee0380c78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
7️⃣ src/data/products.js
Location: frontend/src/data/products.js

export const categories = [
  { id: 'electronics', name: 'Electronics', icon: '📱' },
  { id: 'fashion', name: 'Fashion', icon: '👕' },
  { id: 'beauty', name: 'Beauty', icon: '💄' },
  { id: 'home', name: 'Home & Living', icon: '🏠' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'books', name: 'Books', icon: '📚' }
];

export const brands = [
  'Apple', 'Samsung', 'Nike', 'Adidas', 'Zara', 'H&M', 'Lakme', 'Maybelline', 'IKEA', 'Puma'
];

export const initialProducts = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 2999,
    oldPrice: 4999,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'electronics',
    brand: 'Samsung',
    description: 'High-quality wireless headphones with noise cancellation and superior sound quality.',
    rating: 4.5,
    inStock: true
  },
  {
    id: '2',
    name: 'Classic White Sneakers',
    price: 1999,
    oldPrice: 3499,
    image: 'https://images.unsplash.com/photo-1625860191460-10a66c7384fb?w=500',
    category: 'fashion',
    brand: 'Nike',
    description: 'Comfortable and stylish white sneakers perfect for everyday wear.',
    rating: 4.8,
    inStock: true
  },
  {
    id: '3',
    name: 'Luxury Face Serum',
    price: 899,
    oldPrice: 1499,
    image: 'https://images.pexels.com/photos/6767760/pexels-photo-6767760.jpeg?w=500',
    category: 'beauty',
    brand: 'Maybelline',
    description: 'Nourishing face serum with vitamin C for glowing skin.',
    rating: 4.6,
    inStock: true
  },
  {
    id: '4',
    name: 'Smart Watch Series 7',
    price: 8999,
    oldPrice: 12999,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'electronics',
    brand: 'Apple',
    description: 'Advanced smartwatch with fitness tracking and health monitoring.',
    rating: 4.9,
    inStock: true
  },
  {
    id: '5',
    name: 'Denim Jacket',
    price: 1499,
    oldPrice: 2999,
    image: 'https://images.unsplash.com/photo-1601333144130-8cbb312386b6?w=500',
    category: 'fashion',
    brand: 'Zara',
    description: 'Classic denim jacket with modern fit and premium quality.',
    rating: 4.4,
    inStock: true
  },
  {
    id: '6',
    name: 'Matte Lipstick Set',
    price: 599,
    oldPrice: 999,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500',
    category: 'beauty',
    brand: 'Lakme',
    description: 'Set of 5 vibrant matte lipsticks with long-lasting formula.',
    rating: 4.3,
    inStock: true
  },
  {
    id: '7',
    name: 'Yoga Mat Premium',
    price: 799,
    oldPrice: 1299,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    category: 'sports',
    brand: 'Puma',
    description: 'Non-slip yoga mat with extra cushioning for comfort.',
    rating: 4.7,
    inStock: true
  },
  {
    id: '8',
    name: 'Decorative Table Lamp',
    price: 1299,
    oldPrice: 2199,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500',
    category: 'home',
    brand: 'IKEA',
    description: 'Modern table lamp with adjustable brightness settings.',
    rating: 4.5,
    inStock: true
  },
  {
    id: '9',
    name: 'Bestseller Novel Collection',
    price: 499,
    oldPrice: 799,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
    category: 'books',
    brand: 'Penguin',
    description: 'Collection of top bestselling novels from award-winning authors.',
    rating: 4.8,
    inStock: true
  },
  {
    id: '10',
    name: 'Running Shoes Pro',
    price: 2499,
    oldPrice: 3999,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'sports',
    brand: 'Adidas',
    description: 'Professional running shoes with advanced cushioning technology.',
    rating: 4.9,
    inStock: true
  },
  {
    id: '11',
    name: 'Wireless Earbuds',
    price: 1999,
    oldPrice: 3499,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500',
    category: 'electronics',
    brand: 'Samsung',
    description: 'True wireless earbuds with premium sound quality and long battery life.',
    rating: 4.6,
    inStock: true
  },
  {
    id: '12',
    name: 'Cotton T-Shirt Pack',
    price: 799,
    oldPrice: 1299,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    category: 'fashion',
    brand: 'H&M',
    description: 'Pack of 3 premium cotton t-shirts in assorted colors.',
    rating: 4.4,
    inStock: true
  }
];

// Initialize products in localStorage
export const initializeProducts = () => {
  const savedProducts = localStorage.getItem('products');
  if (!savedProducts) {
    localStorage.setItem('products', JSON.stringify(initialProducts));
    return initialProducts;
  }
  return JSON.parse(savedProducts);
};

export const getProducts = () => {
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : [];
};

export const addProduct = (product) => {
  const products = getProducts();
  const newProduct = {
    ...product,
    id: Date.now().toString(),
    rating: 4.5,
    inStock: true
  };
  products.push(newProduct);
  localStorage.setItem('products', JSON.stringify(products));
  return newProduct;
};