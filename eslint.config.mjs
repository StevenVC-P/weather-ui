// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Import analytics conditionally
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-n3kBl1nYYFdYhaRA0uQqJUqHyKj16lY",
  authDomain: "homestead-weather.firebaseapp.com",
  projectId: "homestead-weather",
  //   storageBucket: "homestead-weather.firebasestorage.app",
  storageBucket: "homestead-weather.appspot.com",

  messagingSenderId: "127735884048",
  appId: "1:127735884048:web:e15f391c81385e3b875d95",
  measurementId: "G-MSS6T0BW9X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only on the client side
let analytics = null;
if (typeof window !== "undefined") {
  // We're on the client side
  isSupported().then((yes) => yes && (analytics = getAnalytics(app)));
}

// Initialize Firestore
export const db = getFirestore(app);
export { analytics };

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals")];

export default eslintConfig;
