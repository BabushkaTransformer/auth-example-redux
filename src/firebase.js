import {getAuth} from 'firebase/auth';
import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyCMpZAaVpOodTrRyXubyO5N1fy3xBp3QOU",
  authDomain: "auth-41b87.firebaseapp.com",
  projectId: "auth-41b87",
  storageBucket: "auth-41b87.appspot.com",
  messagingSenderId: "114128747908",
  appId: "1:114128747908:web:65dcf544d6a669fbbfb1d1",
  measurementId: "G-KRYNT25CGJ"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore();
export const auth = getAuth(app);
