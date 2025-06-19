// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiuWsv3WQ7wFFGPXqFaaEqU5Dn5nk1k8A",
  authDomain: "findmypet-f80eb.firebaseapp.com",
  projectId: "findmypet-f80eb",
  storageBucket: "findmypet-f80eb.firebasestorage.app",
  messagingSenderId: "992046392914",
  appId: "1:992046392914:web:e566c017fd085c4e92618b",
  measurementId: "G-9BMRB7XSZ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app); 
const storage = getStorage(app);

export { auth, db, storage };