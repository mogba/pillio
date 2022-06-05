import { ref } from "vue";
import { defineStore } from "pinia";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useSessionStore = defineStore("sessionStore", () => {
  const userRef = ref(null);
  const userCredentialRef = ref(null);

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
    userCredential: userCredentialRef,
    
    isUserAuthenticated,
  };
});
