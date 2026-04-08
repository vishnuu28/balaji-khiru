import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

if (!firebaseConfig?.apiKey || String(firebaseConfig.apiKey).includes("YOUR_")) {
  throw new Error("Firebase config is missing. Update firebase-config.js.");
}

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
