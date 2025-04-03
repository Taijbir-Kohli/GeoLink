import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, get, child } from "firebase/database"; // Import database modules
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore"; // Firestore

const firebaseConfig = {
  apiKey: "AIzaSyC3uft5571ohYCG0IEOhDj5SkttNYNMZ5Q",
  authDomain: "geolink-8a7d1.firebaseapp.com",
  projectId: "geolink-8a7d1",
  storageBucket: "geolink-8a7d1.firebasestorage.app",
  messagingSenderId: "256354446018",
  appId: "1:256354446018:web:2fb36aefa347cc5439295b",
  databaseURL: "https://geolink-8a7d1-default-rtdb.firebaseio.com/", // Add database URL
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app); // Initialize Firebase Realtime Database
const dbFirestore = getFirestore(app); // Initialize Firestore

// Export the Firebase Auth and Database functionality
// export { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, get, ref, child };
export { auth, db, dbFirestore, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, doc, setDoc, getDoc, updateDoc, collection, getDocs, ref, get, child };

