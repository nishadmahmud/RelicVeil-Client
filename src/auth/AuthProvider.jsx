import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const storeToken = async (user) => {
    try {
      const token = await user.getIdToken();
      localStorage.setItem('token', token);
      setToken(token);
      return token;
    } catch (error) {
      console.error('Error storing token:', error);
      return null;
    }
  };

  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await storeToken(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await storeToken(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await storeToken(result.user);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (name, photo) => {
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
    setUser((prev) => ({ ...prev, displayName: name, photoURL: photo }));
  };

  const sendPasswordReset = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email).finally(() => setLoading(false));
  };


  const getToken = async () => {
    try {
      if (!user) return null;
      
      const currentToken = localStorage.getItem('token');
      if (currentToken) {

        const payload = JSON.parse(atob(currentToken.split('.')[1]));
        const exp = payload.exp * 1000;
        
        if (exp > Date.now()) {
          return currentToken;
        }
      }
      
     
      return await storeToken(user);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await storeToken(currentUser);
      } else {
        localStorage.removeItem('token');
        setToken(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    token,
    createUser,
    signIn,
    googleSignIn,
    logOut,
    updateUserProfile,
    sendPasswordReset,
    getToken,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
