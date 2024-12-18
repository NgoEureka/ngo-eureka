import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY!,
  authDomain: "cric-eureka.firebaseapp.com",
  projectId: "cric-eureka",
  storageBucket: "cric-eureka.firebasestorage.app",
  messagingSenderId: "786029137312",
  appId: "1:786029137312:android:bca2c0c72709c5a37068c5",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
