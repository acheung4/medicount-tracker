// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6GPwtuGevtYF-mmtInPd9fXuHbp5_d3c",
  authDomain: "medicount-tracker.firebaseapp.com",
  projectId: "medicount-tracker",
  storageBucket: "medicount-tracker.firebasestorage.app",
  messagingSenderId: "672796905366",
  appId: "1:672796905366:web:2fc23ac6b711d4e55dd7b7"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);