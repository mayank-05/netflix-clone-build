import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAp2ZtIAF79pmYwqGRwOCN89c5XJmbSlDw",
  authDomain: "netflix-clone-build-561b8.firebaseapp.com",
  projectId: "netflix-clone-build-561b8",
  storageBucket: "netflix-clone-build-561b8.appspot.com",
  messagingSenderId: "189225039499",
  appId: "1:189225039499:web:8ebcee20fff9971896068e",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db;
