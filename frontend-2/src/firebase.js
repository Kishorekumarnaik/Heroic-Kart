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