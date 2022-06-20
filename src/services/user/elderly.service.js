import { sortBy } from "lodash";
import { api } from "src/boot/axios.boot";

export const createElderlyUser = async (user) => {
  try {
    const response = await api.post("/idosos/create", user);
    const createdUserId = response.data?.id;
    return {
      success: true,
      message: "Configurações salvas.",
      data: { createdUserId },
    };
  } catch (error) {
    const message = `Erro ao salvar configurações: ${error.message}`;
    console.log(message);
    return { error: true, message };
  }
};

export const updateElderly = async (elderly) => {
  try {
    const elderlyId = elderly.id;
    delete elderly.id;

    await api.put(`/idosos/update/${elderlyId}`, elderly);
  
    return { success: true, message: "Configurações salvas." };
  } catch (error) {
    const message = `Erro ao salvar configurações: ${error.message}`;
    console.log(message);
    return { error: true, message };
  }
};

export const deleteElderlies = async (elderlyIds) => {
  try {
    await api.post(`/idosos/delete`, { idIdosos: elderlyIds });

    return { success: true, message: "Configurações excluídas." };
  } catch (error) {
    const message = `Erro ao excluir configurações: ${error.message}`;
    console.log(message);
    return { error: true, message };
  }
};

export const getAlarmsByElderly = async (elderlyId) => {
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
    const message = `Erro ao buscar alarmes: ${error.message}`;
    console.log(message);
    return { error: true, message };
  }
};
