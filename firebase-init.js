import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";

// Firebase configuration for Khiru Foods.
const firebaseConfig = {
  apiKey: "AIzaSyAysQpMxDdJhGJiW3byfaaep-nRao9RLC0",
  authDomain: "balaji-khiru.firebaseapp.com",
  projectId: "balaji-khiru",
  storageBucket: "balaji-khiru.firebasestorage.app",
  messagingSenderId: "111027020844",
  appId: "1:111027020844:web:5b0ecc130410f1b5671d89",
  measurementId: "G-1QN9N9GMLY"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Expose app for future integrations (Firestore/Auth/etc.).
window.khiruFirebaseApp = app;
window.khiruFirebaseAnalytics = analytics;
