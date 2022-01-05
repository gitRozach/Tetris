import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// TEST DATABASE CONFIG - NEVER USE IN PRODUCTION MODE WITH THIS CONFIGURATION AND USE ENVIRONMENT VARS INSTEAD !!!

const firebaseConfig = {
  apiKey: "AIzaSyBXdGcQHdevwb2an-aEzjfYzJieOTL-LxA",
  authDomain: "tetris-4d745.firebaseapp.com",
  projectId: "tetris-4d745",
  storageBucket: "tetris-4d745.appspot.com",
  messagingSenderId: "891907907494",
  appId: "1:891907907494:web:cd88f1e04dc0c55dff7967"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const firestore = firebase.firestore();

export { storage, firestore };