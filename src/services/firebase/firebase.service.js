import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useSessionStore } from "src/stores";

const auth = getAuth();

function saveFirebaseUserState(userCredential, otherUserData) {
  const sessionStore = useSessionStore();
  sessionStore.firebaseUser = userCredential.user;
  sessionStore.userCredential = userCredential;
}

function removeUserCredential() {
  const sessionStore = useSessionStore();
  sessionStore.firebaseUser = null;
  sessionStore.userCredential = null;
}

function registerUser(displayName, email, password, successCallback) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      updateProfile(userCredential.user, { displayName })
        .catch(error => console.log("Erro ao salvar o nome do usuário:", error));
      
      saveFirebaseUserState(userCredential);
      successCallback();
    })
    .catch(error => console.log("Erro ao cadastrar usuário:", error));
}

function signInUserWithEmailAndPassword(email, password, successCallback) {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      saveFirebaseUserState(userCredential);
      successCallback();
    })
    .catch(error => console.log("Erro ao iniciar sessão:", error));
}

function signInUserWithGoogle(successCallback) {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(userCredential => {
      saveFirebaseUserState(userCredential);
      successCallback();
    })
    .catch(error => console.log("Erro ao iniciar sessão:", error));
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
