"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Create context
const AuthContext = createContext({});

// Export the context hook
export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set up auth state listener
  useEffect(() => {
    console.log("Setting up auth state listener");

    // Set a timeout to ensure loading state doesn't get stuck
    const timeoutId = setTimeout(() => {
      if (loading) {
        console.log("Auth loading timed out, forcing completion");
        setLoading(false);
      }
    }, 5000); // 5 second timeout

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        console.log("Auth state changed", user ? "User logged in" : "No user");

        if (user) {
          // Set user data
          const userData = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          };

          setUser(userData);
          Cookies.set("auth-session", "true", { expires: 7 });
        } else {
          setUser(null);
          Cookies.remove("auth-session");
        }
        setLoading(false);
      },
      (error) => {
        console.error("Auth state observer error:", error);
        setLoading(false);
      }
    );

    return () => {
      clearTimeout(timeoutId);
      unsubscribe();
    };
  }, []);

  // Auth functions
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    setUser(userData);
    Cookies.set("auth-session", "true", { expires: 7 });

    return userData;
  };

  const logout = async () => {
    Cookies.remove("auth-session");
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loginWithGoogle, loading }}>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-xl font-medium">Initializing authentication...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
