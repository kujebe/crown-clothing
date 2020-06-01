import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyC3nnVI6ZPL2dUL_UgGBWCoppm1grcWPF4",
  authDomain: "react-crown-clothing-ecommerce.firebaseapp.com",
  databaseURL: "https://react-crown-clothing-ecommerce.firebaseio.com",
  projectId: "react-crown-clothing-ecommerce",
  storageBucket: "react-crown-clothing-ecommerce.appspot.com",
  messagingSenderId: "677654042730",
  appId: "1:677654042730:web:d65716aca4fff87c871213",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export default firebase;
