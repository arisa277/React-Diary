import firebase from "firebase/app";
import "firebase/firestore";

// Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDuxnV-_uP2Evl174xb6lrcHd5PwJ6AxaI",
  authDomain: "react-diary-ea33b.firebaseapp.com",
  projectId: "react-diary-ea33b",
  storageBucket: "react-diary-ea33b.appspot.com",
  messagingSenderId: "1045217275207",
  appId: "1:1045217275207:web:48f977c79bf4dfd728b062",
  measurementId: "G-QT6TSZEJ5D",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export default firebase;
