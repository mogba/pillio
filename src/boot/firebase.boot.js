import { initializeApp } from "firebase/app";

let firebaseApp;

export default () => {
  // Firebase available libraries
  // https://firebase.google.com/docs/web/setup#available-libraries

  const firebaseConfig = {
    apiKey: "AIzaSyDcAVJvjK8v-ywrhQaYVvzHV_0AA1ERaqw",
    authDomain: "pillio.firebaseapp.com",
    projectId: "pillio",
    storageBucket: "pillio.appspot.com",
    messagingSenderId: "633401020435",
    appId: "1:633401020435:web:de523dcf6b9ea9484eefe6"
  };
  
  firebaseApp = initializeApp(firebaseConfig);
};

export { firebaseApp };
