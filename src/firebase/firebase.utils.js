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

/**  */
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider);
};

export const getLoggedInUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
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

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      id: doc.id,
      routeName: encodeURI(title.toLowerCase()),
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

// Function to add shop data to Firebase (to be used once only to add shop data to db)
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();

  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export default firebase;
