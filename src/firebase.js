import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPpTwEm9AGurDMA3mMNy4CdJrpxYI4kFc",
  authDomain: "one-ecom-388ea.firebaseapp.com",
  projectId: "one-ecom-388ea",
  storageBucket: "one-ecom-388ea.appspot.com",
  messagingSenderId: "504694111814",
  appId: "1:504694111814:web:ed6de49e2e642626b9d447",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;
