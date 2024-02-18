import { initializeApp } from 'firebase/app'; 

import {
    getAuth, 
    signInWithRedirect,
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
  } from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCuJGeQb9OShBSkSY4UP8H_XFn0gi-rQNs",
  authDomain: "crwn-clothing-db-fe813.firebaseapp.com",
  projectId: "crwn-clothing-db-fe813",
  storageBucket: "crwn-clothing-db-fe813.appspot.com",
  messagingSenderId: "85643460130",
  appId: "1:85643460130:web:5b0158bc24d33ac9d5d47b"
};


const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",

});


export const auth = getAuth();
export const signInWithGooglePopUp = () => 
  signInWithPopup(auth, googleProvider); 
export const signInWithGoogleRedirect = () => 
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);


  const userSnapshot = await getDoc(userDocRef);


  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
  
  
    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    }
    catch (error){
      console.log('error creating the user', error.message);
    }
  
  }
  return userDocRef; 

};


export const createAuthUserWithEmailAndPassword = async (email, passowrd) => {
  if(!email || !passowrd) return;
  return await createUserWithEmailAndPassword(auth, email, passowrd) 
}



export const signInAuthUserWithEmailAndPassword = async (email, passowrd) => {
  if(!email || !passowrd) return;
  return await signInWithEmailAndPassword(auth, email, passowrd) 
}

export const signOutUser = async () => await signOut(auth); 

export const onAuthStateChangedListener = (callback) => 
  onAuthStateChanged(auth, callback)
