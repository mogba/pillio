import { orderBy } from "lodash";
import { api } from "src/boot/axios.boot";
import { useSessionStore } from "src/stores";

const sessionStore = useSessionStore();

export const createResponsibleUser = async (responsibleElderlies) => {
  try {
    const user = {
      firebaseUserUid: sessionStore.firebaseUser.uid,
      login: sessionStore.firebaseUser.email,
      nome: sessionStore.firebaseUser.displayName,
      idosos: responsibleElderlies,
    };
  
    await api.post("/resp/create", user);

    return { success: true, message: "Configurações salvas." };
  } catch (error) {
    const message = `Erro ao salvar configurações: ${error}`;
    console.log(message);
    return { error: true, message };
  }
}

export const getElderliesByResponsible = async () => {
  try {
    const response = await api.get(
      `/resp/findidosobyresp/${sessionStore.user.id}`,
    );

    let elderlies = response.data?.map(elderly => ({
      id: elderly.id,
      name: elderly.nome,
      email: elderly.login,
      hasDispenser: !!elderly.maquinas?.codigoMaquina,
    }));

    elderlies = orderBy(elderlies, ["hasDispenser", "name"], ["desc", "asc"]);
  
    return { success: true, data: elderlies };
  } catch (error) {
    const message = `Erro ao buscar configurações: ${error.message}`;
    console.log(message);
    return { error: true, message };
  }
}
