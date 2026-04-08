import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

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
const db = getFirestore(app);
let analytics = null;

// Analytics may be unavailable in some browsers/contexts.
try {
  if (await isSupported()) {
    analytics = getAnalytics(app);
  }
} catch (error) {
  console.warn("Firebase Analytics not initialized:", error);
}

export async function saveContact(data) {
  return addDoc(collection(db, "contacts"), {
    ...data,
    createdAt: serverTimestamp()
  });
}

export async function saveOrder(data) {
  return addDoc(collection(db, "orders"), {
    ...data,
    createdAt: serverTimestamp()
  });
}

export { app, analytics, db };
