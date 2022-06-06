import axios from "axios";

function createElderlyUser(user) {
  const user = {
    firebaseUid: "uid do firebase",
    email: "",
    name: "",
  };

  axios.post("/idosos/create", user)
    .catch(error => console.log("Erro ao criar usuário:", error));
}

function getAllByElderly() {
  let elderlies;

  axios.get(`/idosos/findidosobyresp/${responsibleUserId}`)
    .then(result => elderlies = result)
    .catch(error => console.log("Erro ao criar usuário:", error));

  return elderlies;
}

export {
  createElderlyUser,
  getAllByElderly,
};
