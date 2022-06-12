import { sortBy } from "lodash";
import { api } from "src/boot/axios.boot";

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
    const response = await api.get(`idosos/findallbyidoso/${elderlyId}`);
    const elderly = (response.data || [])[0] || {};

    const alarms = elderly?.alarmes?.map(x => {
      const usedDispenserSlots = sortBy(x.compartimentos?.split(",") || []);

      const startDateStrings = x.dataInicio.split("T")[0].split("-");
      const startDate = `${startDateStrings[2]}/${startDateStrings[1]}/${startDateStrings[0]}`;

      const startTimeStrings = x.horaInicio.split(":");
      const startTime = `${startTimeStrings[0]}:${startTimeStrings[1]}`
      
      return {
        id: x.id,
        medicineName: x.nomeRemedio,
        timesToRepeat: x.qtdeVezesRepetir,
        repetitionIntervalInHours: x.repetirEmQuantasHoras,
        usedDispenserSlots,
        pillsQuantity: x.qtdeComprimidosPorDose,
        startDate,
        startTime,
        isActive: !!x.ativo,
        toDelete: false,
      };
    }) || [];

    return { success: true, message: "Alarmes carregados.", data: alarms };
  } catch (error) {
    const message = `Erro ao buscar alarmes: ${error}`;
    console.log(message);
    return { error: true, message };
  }
}

export {
  createElderlyUser,
  getAlarmsByElderly,
};
