import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {

  apiKey: "AIzaSyBOpYGGfAUg8eak4f3AxcQRAdtJn18ixnQ",

  authDomain: "certificate-generator-4f5b7.firebaseapp.com",

  projectId: "certificate-generator-4f5b7",

  storageBucket: "certificate-generator-4f5b7.appspot.com",

  messagingSenderId: "164296738766",

  appId: "1:164296738766:web:c421c286c32d42f6ed4d9f",

  measurementId: "G-FJXLB9Z018"

};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);