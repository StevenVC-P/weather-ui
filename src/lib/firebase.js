// Firebase configuration
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration with environment variables and fallbacks
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase only if it hasn't been initialized already
let firebaseApp;
try {
  if (!getApps().length) {
    console.log("Initializing Firebase app");
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    console.log("Using existing Firebase app");
    firebaseApp = getApps()[0];
  }
} catch (error) {
  console.error("Error initializing Firebase:", error);
  // Create a dummy app for development if Firebase fails
  firebaseApp = {};
}

// Initialize Firebase Authentication
let auth;
try {
  auth = getAuth(firebaseApp);
  console.log("Firebase Auth initialized");
} catch (error) {
  console.error("Error initializing Firebase Auth:", error);
  // Create a dummy auth for development if Firebase Auth fails
  auth = {
    onAuthStateChanged: (callback) => {
      callback(null);
      return () => {};
    },
    signInWithEmailAndPassword: () => Promise.reject(new Error("Auth not available")),
    createUserWithEmailAndPassword: () => Promise.reject(new Error("Auth not available")),
    signOut: () => Promise.resolve(),
  };
}

// Initialize Firestore
let db;
try {
  db = getFirestore(firebaseApp);
  console.log("Firestore initialized");
} catch (error) {
  console.error("Error initializing Firestore:", error);
  // Create a dummy db for development if Firestore fails
  db = {};
}

// Initialize Analytics only on the client side
let analytics = null;
if (typeof window !== "undefined") {
  try {
    isSupported().then((yes) => {
      if (yes) {
        analytics = getAnalytics(firebaseApp);
        console.log("Firebase Analytics initialized");
      }
    });
  } catch (error) {
    console.error("Error initializing Firebase Analytics:", error);
  }
}

export { auth, db, analytics };
export default firebaseApp;
