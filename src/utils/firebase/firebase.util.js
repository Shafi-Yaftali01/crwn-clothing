import { initializeApp } from 'firebase/app'; 

import {
    getAuth, 
    signInWithRedirect,
    signInWithPopup, 
    GoogleAuthProvider
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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",

});


export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider); 

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);


  const userSnapshot = await getDoc(userDocRef);


  if (!userSnapshot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
  
  
    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    }
    catch (error){
      console.log('error creating the user', error.message);
    }
  
  }
  return userDocRef; 

};


