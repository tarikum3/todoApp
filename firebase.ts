import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

const firebaseConfig = {
  apiKey: "AIzaSyCBtr4ng4V6m-XtYLkVtHmJeNbN7UFFJmY",
  authDomain: "todoapp-a75bd.firebaseapp.com",
  projectId: "todoapp-a75bd",
  storageBucket: "todoapp-a75bd.appspot.com",
  messagingSenderId: "157181210395",
  appId: "1:157181210395:web:cb532d3d03812311892dbe",
  measurementId: "G-SMQL3FJ5WM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



const firestore = getFirestore(app);

export {  firestore };

//export const firestore = getFirestore(app);
