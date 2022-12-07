import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDh5Fq-6MWGu8agxoYrcwz5cvuaNmTy3MM",
  authDomain: "crown-clothing-db-cd62f.firebaseapp.com",
  projectId: "crown-clothing-db-cd62f",
  storageBucket: "crown-clothing-db-cd62f.appspot.com",
  messagingSenderId: "816721668372",
  appId: "1:816721668372:web:b8674b3173dc3cd30e3a01"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
})

const signInWithGooglePopup = () => signInWithPopup(auth, provider)



export const auth = getAuth()

export const logGoogleUser = async () => {
  const {user} = await signInWithGooglePopup()
  const userDocRef = await createUserDocumentFromAuth(user)

  return response;
}

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }
  
  return userDocRef
}