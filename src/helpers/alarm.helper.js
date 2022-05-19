import {
  treatmentStartDate,
  nextDate,
  formatDateToString,
} from "src/helpers/date.helper";

const TRIGGER_MEDICINE_STATUS = Object.freeze({
  done: "done",
  ongoing: "ongoing",
  pending: "pending",
});

function getExpectedAlarmTriggers(alarm) {
  const fromDate = treatmentStartDate(alarm);
  const intervalInMiliseconds = alarm.repetitionIntervalInHours * 3_600_000;
  
  let alarmTriggers = Array.from(Array(alarm.timesToRepeat)).map(
    (_, repetitionIndex) => {
      const date = nextDate(fromDate, intervalInMiliseconds, repetitionIndex);
      const status = 
        ((repetitionIndex + 1) === alarm.timesToRepeat &&
        alarm.timesToRepeat > 1)
        ? TRIGGER_MEDICINE_STATUS.ongoing
        : TRIGGER_MEDICINE_STATUS.done;
      
      return {
        date,
        ...formatDateToString(date),
        status,
      };
    }
  );

  alarmTriggers = alarmTriggers.reverse();

  if (alarmTriggers[1]) {
    alarmTriggers[1].status = TRIGGER_MEDICINE_STATUS.pending;
  }

  return alarmTriggers;
}

function mapAlarmsWithTriggersForElderly(alarmsRef, elderlyId) {
  alarmsRef.value = alarmsRef.value.reduce((acc, alarm) => (
    alarm.elderlyId === elderlyId
    ? [
      ...acc,
      {
        ...alarm,
        triggers: getExpectedAlarmTriggers(alarm),
      },
    ]
    : acc
  ), []);
}

export {
  TRIGGER_MEDICINE_STATUS,
  getExpectedAlarmTriggers,
  mapAlarmsWithTriggersForElderly,
};