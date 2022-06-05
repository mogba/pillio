import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useSessionStore } from "src/stores";

const auth = getAuth();

function saveUserCredential(userCredential, otherUserData) {
  const sessionStore = useSessionStore();
  sessionStore.user = { ...userCredential.user, ...otherUserData };
  sessionStore.userCredential = userCredential;
}

function removeUserCredential() {
  const sessionStore = useSessionStore();
  sessionStore.user = null;
  sessionStore.userCredential = null;
}

function registerUser(name, email, password, successCallback) {
  createUserWithEmailAndPassword(auth, email, password)
  .then(userCredential => {
    // Cadastrar o usuário no banco da API, pegar 
    // dados relevantes e salvá-los em sessionStore.
    // Após isso, os parâmetros depois de userCredential
    // devem ser revisados.
    saveUserCredential(userCredential, { name, isNotConfiguredYet: true });
    successCallback();
  })
  .catch(error => console.log("Erro ao cadastrar:", error));
}

function signInUserWithEmailAndPassword(email, password, successCallback) {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      saveUserCredential(userCredential);
      successCallback();
    })
    .catch(error => console.log("Erro ao entrar:", error));
}

function signInUserWithGoogle(successCallback) {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(userCredential => {
      saveUserCredential(userCredential);
      successCallback();
    })
    .catch(error => console.log("Erro ao entrar:", error));
}

function signOutUser(successCallback) {
  signOut(auth);  
  removeUserCredential();
  successCallback();
}

export {
  registerUser,
  signInUserWithEmailAndPassword,
  signInUserWithGoogle,
  signOutUser,
};
