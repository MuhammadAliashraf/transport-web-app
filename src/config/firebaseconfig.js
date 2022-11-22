// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyU2xctJMtW66Hyh0Wa_gApSe0fjB70KM",
  authDomain: "adminb-af308.firebaseapp.com",
  databaseURL: "https://adminb-af308-default-rtdb.firebaseio.com",
  projectId: "adminb-af308",
  storageBucket: "adminb-af308.appspot.com",
  messagingSenderId: "995823130350",
  appId: "1:995823130350:web:4c0af0e201252e2b1805ff",
  measurementId: "G-2LC4MDV6BW"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;