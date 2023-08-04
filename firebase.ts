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


// const app = initializeApp({
//   apiKey: 'AIzaSyAs0DKIDTOvItk5kZrCdOEWT2kgwgKFl3c',
//   authDomain: 'top-project-photo-tagging.firebaseapp.com',
//   projectId: 'top-project-photo-tagging',
//   storageBucket: 'top-project-photo-tagging.appspot.com',
//   messagingSenderId: '704820916168',
//   appId: '1:704820916168:web:4d4658929c32549ce45afd',
//   measurementId: 'G-B2S5CCM381',
// });

// if (import.meta.env.DEV) {
//   self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
// }

// const isNode =
//   typeof process !== 'undefined' &&
//   process.versions != null &&
//   process.versions.node != null;

// if (!isNode || import.meta.env.PROD)
//   initializeAppCheck(app, {
//     provider: new ReCaptchaV3Provider(
//       '6LeQzbEjAAAAAO3AYUlEtNtl9a_zQ1Is2tD-DLTs'
//     ),
//     isTokenAutoRefreshEnabled: true,
//   });

const firestore = getFirestore(app);

export {  firestore };

//export const firestore = getFirestore(app);
