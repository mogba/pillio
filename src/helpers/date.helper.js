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
  const { dateString, timeString } = formatDateToString(end);
  return `Conclusão em ${dateString} ${timeString}`;
}

function treatmentStartDate(alarm) {
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
  const end = nextDate(start, intervalInMiliseconds, alarm.timesToRepeat);
  return end;
}

function nextDate(fromDate, intervalInMiliseconds, multiplier) {
  return new Date(
    fromDate.getTime() + (intervalInMiliseconds * multiplier)
  );
}

function formatDateToString(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.getMonth().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, "0");
  const minute = date.getMinutes().toString().padStart(2, "0");

  return {
    dateString: `${day}/${month}/${date.getFullYear()}`,
    timeString: `${hour}:${minute}`,
  };
}

export {
  repetitionIntervalMessage,
  treatmentStartMessage,
  treatmentEndMessage,
  treatmentStartDate,
  treatmentEndDate,
  nextDate,
  formatDateToString,
};