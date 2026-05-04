// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyCht53eeKWCeHRfDzcYp8gXRxOqiZiz_uI",
  authDomain: "web-store-1bb36.firebaseapp.com",
  projectId: "web-store-1bb36",
  storageBucket: "web-store-1bb36.firebasestorage.app",
  messagingSenderId: "793581272787",
  appId: "1:793581272787:web:e802f05182946983f49e26",
  measurementId: "G-HHGTQ2WFCN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
