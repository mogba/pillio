import { api } from "src/boot/axios.boot";
import { useSessionStore } from "src/stores";

async function getIsUserConfigured(errorCallback) {
  try {
    const sessionStore = useSessionStore();
    const firebaseUserUid = sessionStore.firebaseUser.uid;

    const response = await api.post("config/usuario-esta-configurado", { firebaseUserUid });
    const userConfig = response.data;

    if (userConfig.id) {
      const role = userConfig.funcao === "responsavel" ? "responsible" : "elderly";
      const elderlies = userConfig.funcao === "responsavel"
        ? (userConfig.idosos || []).map(elderly => ({
            id: elderly.id,
            name: elderly.nome,
            email: elderly.login,
          }))
        : [];

      sessionStore.user = {
        id: userConfig.id,
        name: userConfig.nome,
        email: userConfig.login,
        role,
        elderlies,
      };

      return true;
    }

    return false;
  }
  catch (error) {
    console.log("Erro ao verificar configurações do usuário:", error);

    if (typeof errorCallback === "function") {
      errorCallback(`Erro ao verificar configurações do usuário: ${error.message}`);
    }
  }
}

export {
  getIsUserConfigured,
};
