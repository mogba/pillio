import { orderBy, sortBy } from "lodash";
import { api } from "src/boot/axios.boot";
import { TRIGGER_MEDICINE_STATUS } from "src/helpers/alarm.helper";

async function getAlarmTriggersByElderly(elderlyId) {
  try {
    const response = await api.get(`disparos/findAlarmeDisparosByIdoso/${elderlyId}`);

    let alarms = (response.data || []).map(alarm => {
      const usedDispenserSlots = sortBy(alarm.compartimentos?.split(",") || []);

      const startDateStrings = alarm.dataInicio.split("T")[0].split("-");
      const startDate = `${startDateStrings[2]}/${startDateStrings[1]}/${startDateStrings[0]}`;

      const startTimeStrings = alarm.horaInicio.split(":");
      const startTime = `${startTimeStrings[0]}:${startTimeStrings[1]}`

      let triggers = (alarm.disparos || []).map(trigger => {
        const triggerDateStrings = trigger.dataDisparo.split("T")[0].split("-");
        const triggerDate = `${triggerDateStrings[2]}/${triggerDateStrings[1]}/${triggerDateStrings[0]}`;
        
        const triggerTimeStrings = trigger.horaDisparo.split(":");
        const triggerTime = `${triggerTimeStrings[0]}:${triggerTimeStrings[1]}`
        
        const dateTime = new Date(`${triggerDateStrings.join("/")} ${trigger.horaDisparo}`);
        
        const status = (
          !!trigger.tomouRemedio
          ? TRIGGER_MEDICINE_STATUS.done
          : dateTime < new Date()
          ? TRIGGER_MEDICINE_STATUS.pending
          : TRIGGER_MEDICINE_STATUS.ongoing
          );

          return {
          id: trigger.id,
          alarmId: trigger.idAlarme,
          triggerDate,
          triggerTime,
          dateTime,
          dispenserSlot: trigger.compartimento,
          status,
        };
      });
      
      triggers = orderBy(triggers, ["dateTime"], ["desc"]);
      
      const dateTimeAlarm = new Date(`${startDateStrings.join("/")} ${alarm.horaInicio}`);
      
      return {
        id: alarm.id,
        medicineName: alarm.nomeRemedio,
        timesToRepeat: alarm.qtdeVezesRepetir,
        repetitionIntervalInHours: alarm.repetirEmQuantasHoras,
        usedDispenserSlots,
        pillsQuantity: alarm.qtdeComprimidosPorDose,
        startDate,
        startTime,
        dateTime: dateTimeAlarm,
        isActive: !!alarm.ativo,
        isDeleted: !!alarm.excluido,
        triggers,
      };
    });

    alarms = orderBy(alarms, ["isDeleted", "dateTime"], ["asc", "asc"])

    return {
      success: true,
      message: "Disparos de alarmes carregados",
      data: alarms,
    };
  } catch (error) {
    const message = `Erro ao buscar disparos de alarmes: ${error}`;
    console.log(message);
    return { error: true, message };
  }
}

export {
  getAlarmTriggersByElderly,
};
