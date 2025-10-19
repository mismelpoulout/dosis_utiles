// src/components/firebase.js
import { getApps, getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDa2XiZSeVPuN9oLbQY7GqOvewFTQyKLlA",
  authDomain: "dosis-utiles.firebaseapp.com",
  projectId: "dosis-utiles",
  storageBucket: "dosis-utiles.appspot.com",
  messagingSenderId: "899418830446",
  appId: "1:899418830446:web:f122ceb58030f351c0d87f",
  measurementId: "G-0SPYP47EFS",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

// Persistencia local (sesión se mantiene entre recargas del navegador)
setPersistence(auth, browserLocalPersistence);

// —— Auth helpers que necesita tu Navbar ——

// Observador de estado de autenticación
export const onAuth = (callback) => onAuthStateChanged(auth, callback);

// Google Sign-in (habilítalo en Firebase Console → Authentication)
const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithPopup(auth, provider);

// Cierre de sesión
export const signOutUser = () => signOut(auth);

// Login anónimo opcional (por si fallara el popup o no quieres Google)
export const ensureAnon = async () => {
  if (!auth.currentUser) {
    await signInAnonymously(auth);
  }
  return auth.currentUser;
};

export default app;