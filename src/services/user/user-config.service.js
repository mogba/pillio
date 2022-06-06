import { api } from "src/boot/axios.boot";
import { useSessionStore } from "src/stores";

async function getIsUserConfigured() {
  try {
    const sessionStore = useSessionStore();
    const firebaseUserUid = sessionStore.firebaseUser.uid;
    return await api.post("/config/usuario-esta-configurado", { firebaseUserUid });
  }
  catch (error) {
    console.log("Erro ao verificar configurações do usuário:", error);
  }
}

export {
  getIsUserConfigured,
};
