import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", () => {
  const userRef = ref(null);
  const isAuthenticated = () => !!userRef.value;

  async function registerUser(name, email, password) {
    console.log("registrou usuário");
    // await firebase.register();
    // await this.logIn(email, password);
  }
  async function logIn(email, password) {
    // await firebase.login();
    userRef.value = { id: 1, name: "Test" };
  }
  async function logOut() {
    userRef.value = null;
  }

  return {
    user: userRef,
    
    isAuthenticated,

    registerUser,
    logIn,
    logOut,
  };
});
