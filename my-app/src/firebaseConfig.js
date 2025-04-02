import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC3uft5571ohYCG0IEOhDj5SkttNYNMZ5Q",
    authDomain: "geolink-8a7d1.firebaseapp.com",
    projectId: "geolink-8a7d1",
    storageBucket: "geolink-8a7d1.firebasestorage.app",
    messagingSenderId: "256354446018",
    appId: "1:256354446018:web:2fb36aefa347cc5439295b"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut };