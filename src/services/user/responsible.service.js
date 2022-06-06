import api from "src/boot/api.boot";

function createResponsibleUser(user, elderlies) {
  const user = {
    firebaseUid: "uid do firebase",
    email: "",
    name: "",
    elderlies: [{ name: "", phoneNumber: "" }]
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
