import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBaBTVtsItPiumkZYbzisK5lrd12Cub_hc",
  authDomain: "my-web-innc.firebaseapp.com",
  projectId: "my-web-innc",
  storageBucket: "my-web-innc.firebasestorage.app",
  messagingSenderId: "868387628661",
  appId: "1:868387628661:web:5610132fb01f93860c3a3c",
  measurementId: "G-6EFV771VMM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };