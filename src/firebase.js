import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDmDnpGHFhyNjCF7PaDEltanNpv7PzOSTI",
  authDomain: "migicl.firebaseapp.com",
  databaseURL: "https://migicl-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "migicl",
  storageBucket: "migicl.appspot.com",
  messagingSenderId: "578870942622",
  appId: "1:578870942622:web:f4d307740eaa4923a6d48f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getDatabase(app);
