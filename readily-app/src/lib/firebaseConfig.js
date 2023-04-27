// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgfdAefkxJuJrsim4NqQ68gETJsG11y5g",
  authDomain: "readify-a88ee.firebaseapp.com",
  projectId: "readify-a88ee",
  storageBucket: "readify-a88ee.appspot.com",
  messagingSenderId: "93733197313",
  appId: "1:93733197313:web:48cb71e11de2420c115200",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };
