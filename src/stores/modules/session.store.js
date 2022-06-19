import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useSessionStore = defineStore("sessionStore", () => {
  // const userCredentialRef = ref(null);
  const initialSetupRef = ref(LocalStorage.getItem("initialSetup") || {});
  const firebaseUserRef = ref(LocalStorage.getItem("firebaseUser") || {});
  const userRef = ref(LocalStorage.getItem("user") || {});
  const notificationTopicsRef = ref(LocalStorage.getItem("notificationTopics") || []);

  watch(userRef, user => {
    LocalStorage.set("user", user);
  }, { deep: true });

  watch(
    [initialSetupRef, firebaseUserRef, notificationTopicsRef],
    ([initialSetup, firebaseUser, notificationTopics]) => {
      LocalStorage.set("initialSetup", initialSetup);
      LocalStorage.set("firebaseUser", firebaseUser);
      LocalStorage.set("notificationTopics", notificationTopics);
    },
  );

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
    initialSetup: initialSetupRef,
    firebaseUser: firebaseUserRef,
    user: userRef,
    notificationTopics: notificationTopicsRef,
    isUserAuthenticated,
  };
});
