import api from "src/boot/axios.boot";
import { useSessionStore } from "src/stores";

const sessionStore = useSessionStore();

function createResponsibleUser(responsibleElderlies) {
  const user = {
    firebaseUserUid: sessionStore.firebaseUser.uid,
    login: sessionStore.firebaseUser.email,
    nome: sessionStore.firebaseUser.displayName,
    idosos: responsibleElderlies,
  };

  api.post("/resp/create", user)
    .catch(error => console.log("Erro ao criar usuário:", error));
}

function getElderliesByResponsible() {
  let elderlies;

  api.get(`/resp/findidosobyresp/${responsibleUserId}`)
    .then(result => elderlies = result)
    .catch(error => console.log("Erro ao buscar dados do usuário:", error));

  return elderlies;
}

function getAllResponsibleUsers() {
  let responsibles;

  api.get("/resp/all")
    .then(result => responsibles = result)
    .catch(error => console.log("Erro ao buscar usuários:", error));

  return responsibles;
}

export {
  createResponsibleUser,
  getElderliesByResponsible,
  getAllResponsibleUsers,
};
