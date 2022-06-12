import { sortBy } from "lodash";
import { api } from "src/boot/axios.boot";

async function createAlarm(alarm) {
  try {
    const startDateStrings = alarm.startDate.split("/"); // DD/MM/YYYY
    const startDate = new Date(`${startDateStrings[2]}/${startDateStrings[1]}-${startDateStrings[0]}`);

    const usedDispenserSlots = sortBy(alarm.usedDispenserSlots).join(",");

    await api.post(
      `pills/create`,
      {
        nomeRemedio: alarm.medicineName,
        qtdeVezesRepetir: alarm.timesToRepeat,
        dataInicio: startDate,
        horaInicio: alarm.startTime,
        repetirEmQuantasHoras: alarm.repetitionIntervalInHours,
        qtdeComprimidosPorDose: alarm.pillsQuantity,
        compartimentos: usedDispenserSlots,
        idIdoso: alarm.elderlyId,
      },
    );

    return { success: true, message: "Alarme criado." };
  } catch (error) {
    const message = `Erro ao criar alarme: ${error}`;
    console.log(message);
    return { error: true, message };
  }
}

async function updateAlarm(alarm) {
  try {
    const startDateStrings = alarm.startDate.split("/"); // DD/MM/YYYY
    const startDate = new Date(`${startDateStrings[2]}/${startDateStrings[1]}-${startDateStrings[0]}`);

    const isActive = alarm.isActive ? 1 : 0;

    const usedDispenserSlots = sortBy(alarm.usedDispenserSlots).join(",");

    await api.put(
      `pills/alter/${alarm.id}`,
      {
        nomeRemedio: alarm.medicineName,
        qtdeVezesRepetir: alarm.timesToRepeat,
        dataInicio: startDate,
        horaInicio: alarm.startTime,
        repetirEmQuantasHoras: alarm.repetitionIntervalInHours,
        qtdeComprimidosPorDose: alarm.pillsQuantity,
        ativo: isActive,
        compartimentos: usedDispenserSlots,
      },
    );

    return { success: true, message: "Alarme alterado." };
  } catch (error) {
    const message = `Erro ao alterar alarme: ${error}`;
    console.log(message);
    return { error: true, message };
  }
}

async function deleteAlarms(alarmIds) {
  try {
    await api.put(
      "/pills/delete",
      { idsAlarmes: alarmIds },
    );

    return { success: true, message: "Alarmes excluídos." };
  } catch (error) {
    const message = `Erro ao excluir alarmes: ${error}`;
    console.log(message);
    return { error: true, message };
  }
}

export {
  createAlarm,
  updateAlarm,
  deleteAlarms,
};