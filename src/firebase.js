import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASdTqBx7FbbKWVAvCpm2ls82-wEJppVD4",
  authDomain: "blognew-bdc55.firebaseapp.com",
  databaseURL: "https://blognew-bdc55-default-rtdb.firebaseio.com",
  projectId: "blognew-bdc55",
  storageBucket: "blognew-bdc55.appspot.com",
  messagingSenderId: "126290445031",
  appId: "1:126290445031:web:89679cf23a0519e9b81842",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default app;