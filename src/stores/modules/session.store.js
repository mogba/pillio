import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useSessionStore = defineStore("sessionStore", () => {
  // const userCredentialRef = ref(null);
  const firebaseUserRef = ref(LocalStorage.getItem("firebaseUser") || {});
  const userRef = ref(LocalStorage.getItem("user") || {});
  const notificationTopicsRef = ref(LocalStorage.getItem("notificationTopics") || []);

  watch([userRef, firebaseUserRef, notificationTopicsRef], ([user, firebaseUser, notificationTopics]) => {
    LocalStorage.set("user", user);
    LocalStorage.set("firebaseUser", firebaseUser);
    LocalStorage.set("notificationTopics", notificationTopics);
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
    // userCredential: userCredentialRef,
    isUserAuthenticated,
    firebaseUser: firebaseUserRef,
    user: userRef,
    notificationTopics: notificationTopicsRef,
  };
});
