import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth'

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

const logGoogleUser = async () => {
  const response = await signInWithGooglePopup()
  console.log(response)
  return response;
}

export const auth = getAuth()
export { logGoogleUser }