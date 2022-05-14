function repetitionIntervalMessage(alarm) {
  const appendInterval = alarm.repetitionIntervalInHours < 2
    ? '1 hora' 
    : `${alarm.repetitionIntervalInHours} horas`;

  return `Repetir a cada ${appendInterval}`;
}

function treatmentStartMessage(alarm) {
  return `Início em ${alarm.startDate} ${alarm.startTime}`;
}

function treatmentEndMessage(alarm) {
  const end = treatmentEndDate(alarm);
  const day = end.getDate().toString().padStart(2, '0');
  const month = end.getMonth().toString().padStart(2, '0');
  const endTime = `${end.getHours()}:${end.getMinutes()}`
  return `Conclusão em ${day}/${month}/${end.getFullYear()} ${endTime}`;
}

function treatmentStartDate (alarm) {
  const startArr = 
    `${
      alarm.startDate.replaceAll('/', '-')
    }-${
      alarm.startTime.replaceAll(':', '-')
    }`
    .split('-');

  const start = new Date(
    startArr[2], startArr[1], startArr[0], startArr[3], startArr[4]
  );
  return start;
}

function treatmentEndDate(alarm) {
  const start = treatmentStartDate(alarm);
  const intervalInMiliseconds = alarm.repetitionIntervalInHours * 3_600_000;
  const end = new Date(
    start.getTime() + (intervalInMiliseconds * alarm.timesToRepeat)
  );
  return end;
}

export {
  repetitionIntervalMessage,
  treatmentStartMessage,
  treatmentEndMessage,
  treatmentStartDate,
  treatmentEndDate,
};