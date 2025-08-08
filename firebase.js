// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBvN-t49lpTJLdaWCsrP2Y_0wF-XCe-99g",
  authDomain: "ai-playground-882d2.firebaseapp.com",
  projectId: "ai-playground-882d2",
  storageBucket: "ai-playground-882d2.firebasestorage.app",
  messagingSenderId: "689438783199",
  appId: "1:689438783199:web:75b8206f706ee6e1acdb6a",
  measurementId: "G-B87ZL8VD50"
};

onst app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export { signInWithPopup, signOut };