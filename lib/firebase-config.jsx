// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSNg1oDmCwk0kmjty4rcaM4a-WpGv195c",
  authDomain: "selaras-f1988.firebaseapp.com",
  projectId: "selaras-f1988",
  storageBucket: "selaras-f1988.firebasestorage.app",
  messagingSenderId: "664909402812",
  appId: "1:664909402812:web:9756a99e3058f14544b6b9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };