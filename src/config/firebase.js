// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD91x_WCWj8hkFod3ZOZKeQFD04pPcyzNI",
  authDomain: "stay-eye.firebaseapp.com",
  projectId: "stay-eye",
  storageBucket: "stay-eye.appspot.com",
  messagingSenderId: "828415429655",
  appId: "1:828415429655:web:f0f716d666598d7c8a6052",
  measurementId: "G-3YL7SN9Z3K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Firestore 
export const db = getFirestore(app);

getFirestore();