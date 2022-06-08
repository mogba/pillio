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

async function getAlarmsByElderly(elderlyId) {
  try {
    const response = await api.get(`/idosos/findallbyidoso/${elderlyId}`);
    const alarms = response.data?.alarmes?.map(x => ({
      id: x.id,
      medicineName: x.nomeRemedio,
      timesToRepeat: x.qtdeVezesRepetir,
      repetitionIntervalInHours: x.repetirEmQuantasHoras,
      usedDispenserSlots: x.compartimentos.split(","),
      pillsQuantity: x.quantidadeComprimidosPorDose,
      startDate: x.dataInicio,
      startTime: x.horaInicio,
      isActive: x.ativo,
      toDelete: false,
    })) || [];

    return alarms;
  } catch (error) {
    console.log("Erro ao buscar alarmes:", error);
  }
}

export {
  createElderlyUser,
  getAlarmsByElderly,
};
