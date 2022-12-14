// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7zJ2_fo8sR5S9HsGfiHDP92xqLzGKnD0",
  authDomain: "testapp-243e5.firebaseapp.com",
  projectId: "testapp-243e5",
  storageBucket: "testapp-243e5.appspot.com",
  messagingSenderId: "1067853439317",
  appId: "1:1067853439317:web:bb43066145720a7f5a0fdc",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
