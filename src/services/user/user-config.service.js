import { api } from "src/boot/axios.boot";
import { useSessionStore } from "src/stores";

export const getIsUserConfigured = async () => {
  try {
    const sessionStore = useSessionStore();
    const firebaseUserUid = sessionStore.firebaseUser.uid;
    const userName = sessionStore.firebaseUser.displayName;

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
        // name: userConfig.nome,
        name: userName,
        email: userConfig.login,
        role,
        elderlies,
      };

      return { success: true, data: { isUserConfigured: true } };
    }

    return { success: true, data: { isUserConfigured: false } };
  }
  catch (error) {
    const message = `Erro ao verificar configurações do usuário: ${error.message}`;
    console.log(message);
    return { error: true, message };
  }
};

export const getSettingsByElderly = async (elderlyId) => {
  try {
    const response = await api.post("config/get-configuracoes-idoso", {
      idIdoso: elderlyId,
    });

    const settings = response.data.configuracoes;

    return {
      success: true,
      data: {
        elderly: {
          id: settings.id,
          name: settings.nome,
          email: settings.login,
          password: settings.codigoAcesso,
          phoneNumber: settings.telefone,
        },
        dispenser: {
          id: settings.maquinas.id,
          dispenserIdCode: settings.maquinas.codigoMaquina,
          dispenserSlotsQuantity: settings.maquinas.qtdeCompartimentos,
          connectedWifiNetworkName: settings.maquinas.nomeRedeWifiConectada,
        },
      },
    };
  }
  catch (error) {
    const message = `Erro ao buscar configurações: ${error.message}`;
    console.log(message);
    return { error: true, message };
  }
};
