import { sortBy } from "lodash";
import { api } from "src/boot/axios.boot";
import { useSessionStore } from "src/stores";

const sessionStore = useSessionStore();

async function createElderlyUser(dispenserIdCode) {
  try {
    const user = {
      firebaseUserUid: sessionStore.firebaseUser.uid,
      login: sessionStore.firebaseUser.email,
      nome: sessionStore.firebaseUser.displayName,
      codigoMaquina: dispenserIdCode,
    };

    await api.post("/idosos/create", user);

    return { success: true, message: "Configurações salvas." };
  } catch (error) {
    const message = `Erro ao salvar configurações: ${error}`;
    console.log(message);
    return { error: true, message };
  }
}

async function getAlarmsByElderly(elderlyId) {
  try {
    const response = await api.get(`idosos/findallbyidoso/${elderlyId}`);
    const elderly = (response.data || [])[0] || {};

    const alarms = elderly?.alarmes?.map(alarm => {
      const usedDispenserSlots = sortBy(alarm.compartimentos?.split(",") || []);

      const startDateStrings = alarm.dataInicio.split("T")[0].split("-");
      const startDate = `${startDateStrings[2]}/${startDateStrings[1]}/${startDateStrings[0]}`;

      const startTimeStrings = alarm.horaInicio.split(":");
      const startTime = `${startTimeStrings[0]}:${startTimeStrings[1]}`
      
      return {
        id: alarm.id,
        medicineName: alarm.nomeRemedio,
        timesToRepeat: alarm.qtdeVezesRepetir,
        repetitionIntervalInHours: alarm.repetirEmQuantasHoras,
        usedDispenserSlots,
        pillsQuantity: alarm.qtdeComprimidosPorDose,
        startDate,
        startTime,
        isActive: !!alarm.ativo,
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
