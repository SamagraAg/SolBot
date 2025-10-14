// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sampark-ai1.firebaseapp.com",
  projectId: "sampark-ai1",
  storageBucket: "sampark-ai1.firebasestorage.app",
  messagingSenderId: "1043876975123",
  appId: "1:1043876975123:web:13e72269f28cfb67ff25e6",
  measurementId: "G-PLQB23N158",
};

// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebase_app);
