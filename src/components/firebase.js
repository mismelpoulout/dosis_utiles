import firebase from 'firebase/app';
import 'firebase/firestore';


const firebaseConfig = {
    // Configuración de tu proyecto Firebase
    apiKey: "AIzaSyDa2XiZSeVPuN9oLbQY7GqOvewFTQyKLlA",
    authDomain: "dosis-utiles.firebaseapp.com",
    projectId: "dosis-utiles",
    storageBucket: "dosis-utiles.appspot.com",
    messagingSenderId: "899418830446",
    appId: "1:899418830446:web:f122ceb58030f351c0d87f",
    measurementId: "G-0SPYP47EFS"
  };
  
  firebase.initializeApp(firebaseConfig);

  export default firebase;