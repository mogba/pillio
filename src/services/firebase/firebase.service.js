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
  // sessionStore.userCredential = userCredential;
}

function removeUserCredential() {
  const sessionStore = useSessionStore();
  // sessionStore.userCredential = null;
  sessionStore.firebaseUser = null;
  sessionStore.user = null;
  sessionStore.notificationTopics = null;
}

export function registerUser(displayName, email, password, successCallback, errorCallback) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      updateProfile(userCredential.user, { displayName })
        .catch(error => console.log("Erro ao salvar o nome do usuário:", error));
      
      saveFirebaseUserState(userCredential);
      successCallback();
    })
    .catch(error => {
      console.log("Erro ao cadastrar usuário:", error);

      switch (error.code) {
        case "auth/invalid-email":
          errorCallback("Informe um e-mail válido.");
          break;

        case "auth/email-already-in-use":
          errorCallback("O e-mail informado já está em uso.");
          break;
      
        default:
          errorCallback("Erro ao cadastrar usuário.");
          break;
      }
    });
}

export async function registerSecondaryUser(displayName, email, successCallback) {
  try {
    const password = generatePassword();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    updateProfile(userCredential.user, { displayName });

    return {
      firebaseUserUid: userCredential.user.uid,
      name: displayName,
      email,
      password,
    };
  } catch (error) {
    console.log("Erro ao cadastrar usuário:", error);
  }
}

function generatePassword(length = 6) {
  const options = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (var p = ""; p.length < length; p += options.charAt(Math.random() * 62 | 0));
  return p;
}

export function signInUserWithEmailAndPassword(email, password, successCallback, errorCallback) {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      saveFirebaseUserState(userCredential);
      successCallback();
    })
    .catch(error => {
      console.log("Erro ao iniciar sessão:", error);

      switch (error.code) {
        case "auth/invalid-email":
          errorCallback("Informe um e-mail válido.");
          break;

        case "auth/wrong-password":
        case "auth/user-not-found":
          errorCallback("Não foi possível encontrar um usuário. Verifique as credenciais informadas.");
          break;

        default:
          errorCallback("Erro ao iniciar sessão.");
          break;
      }
    });
}

export function signInUserWithGoogle(successCallback) {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(userCredential => {
      saveFirebaseUserState(userCredential);
      successCallback();
    })
    .catch(error => console.log("Erro ao iniciar sessão:", error));
}

export function signOutUser(successCallback) {
  signOut(auth);  
  removeUserCredential();

  if (typeof successCallback === "function") {
    successCallback();
  }
}
