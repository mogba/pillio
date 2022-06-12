import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useSessionStore = defineStore("sessionStore", () => {
  const userRef = ref(LocalStorage.getItem("user") || {});
  const firebaseUserRef = ref(LocalStorage.getItem("firebaseUser") || {});
  // const userCredentialRef = ref(null);

  watch([userRef, firebaseUserRef], ([user, firebaseUser]) => {
    LocalStorage.set("user", user);
    LocalStorage.set("firebaseUser", firebaseUser);
  });

  const auth = getAuth();

  const isUserAuthenticated = async () => {
    return await (new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, user => {
        unsubscribe();
        resolve(user);
      }, reject);
    }));
  }

  return {
    user: userRef,
    firebaseUser: firebaseUserRef,
    // userCredential: userCredentialRef,
    isUserAuthenticated,
  };
});
