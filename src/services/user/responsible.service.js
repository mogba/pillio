import { api } from "src/boot/axios.boot";
import { useSessionStore } from "src/stores";

const sessionStore = useSessionStore();

async function createResponsibleUser(responsibleElderlies) {
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

// function getElderliesByResponsible() {
//   let elderlies;

//   const firebaseUserUid = sessionStore.firebaseUser.uid;

//   api.get(`/resp/findidosobyresp/${firebaseUserUid}`)
//     .then(result => elderlies = result)
//     .catch(error => console.log("Erro ao buscar dados do usuário:", error));

//   return elderlies;
// }

// function getAllResponsibleUsers() {
//   let responsibles;

//   api.get("/resp/all")
//     .then(result => responsibles = result)
//     .catch(error => console.log("Erro ao buscar usuários:", error));

//   return responsibles;
// }

export {
  createResponsibleUser,
  // getElderliesByResponsible,
  // getAllResponsibleUsers,
};
