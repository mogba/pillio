import api from "src/boot/axios.boot";

function createElderlyUser(dispenserIdCode) {
  const user = {
    firebaseUserUid: sessionStore.firebaseUser.uid,
    login: sessionStore.firebaseUser.email,
    nome: sessionStore.firebaseUser.displayName,
    codigoMaquina: dispenserIdCode,
  };

  api.post("/idosos/create", user)
    .catch(error => console.log("Erro ao criar usuário:", error));
}

function getAllByElderly() {
  let elderlies;

  api.get(`/idosos/findidosobyresp/${responsibleUserId}`)
    .then(result => elderlies = result)
    .catch(error => console.log("Erro ao criar usuário:", error));

  return elderlies;
}

export {
  createElderlyUser,
  getAllByElderly,
};
