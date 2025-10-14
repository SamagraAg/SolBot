// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "solbot-5530a.firebaseapp.com",
  projectId: "solbot-5530a",
  storageBucket: "solbot-5530a.firebasestorage.app",
  messagingSenderId: "918063293547",
  appId: "1:918063293547:web:3c54cb48da7701f5eefd2e",
  measurementId: "G-GZ28ECW78W",
};

// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebase_app);
