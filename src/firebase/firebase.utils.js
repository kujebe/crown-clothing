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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; // return if userdata is not provided
  // const userRef = await firestore.doc(`users/${userAuth.uid}`);
  const userRef = firestore.doc(`users/${userAuth.uid}`); // Get a query reference to the user
  const snapShop = await userRef.get(); // get a document reference to the user

  if (!snapShop.exists) {
    //if documentref does not exist for the user, create user
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userRef; // Return documentreference for the user
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