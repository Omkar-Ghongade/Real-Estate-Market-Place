// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-9d954.firebaseapp.com",
  projectId: "real-estate-9d954",
  storageBucket: "real-estate-9d954.appspot.com",
  messagingSenderId: "923497807356",
  appId: "1:923497807356:web:909a49c59c43f43e9f4679"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);