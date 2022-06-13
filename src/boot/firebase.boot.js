import { boot } from "quasar/wrappers";
import { initializeApp } from "firebase/app";
import firebaseConfig from "src/config/firebase.config";

let firebaseApp;

export default boot(() => {
  // Firebase available libraries
  // https://firebase.google.com/docs/web/setup#available-libraries

  firebaseApp = initializeApp(firebaseConfig);
});

export {
  firebaseApp,
};
