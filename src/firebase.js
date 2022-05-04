import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtghzn_pZx1U5q9YpK5uebzeYCCYAYew0",
  authDomain: "blog-24545.firebaseapp.com",
  projectId: "blog-24545",
  storageBucket: "blog-24545.appspot.com",
  messagingSenderId: "954297140505",
  appId: "1:954297140505:web:9e2c332a633f4689557188",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// export const provider = signInAnonymously(auth);


export default app;