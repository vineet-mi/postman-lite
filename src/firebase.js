// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCi-8FhiikNQs_bHu9R4ee8Uco83W0D_5Q",
  authDomain: "postman-lite.firebaseapp.com",
  projectId: "postman-lite",
  storageBucket: "postman-lite.appspot.com",
  messagingSenderId: "622398588511",
  appId: "1:622398588511:web:dc6c8164ff55b0128c3dea",
  measurementId: "G-TL5STSXFS4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
