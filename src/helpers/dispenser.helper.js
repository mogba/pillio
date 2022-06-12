import { SessionStorage } from "quasar";
import { orderBy } from "lodash";

function setDispenserSlots(alarms) {
  const filledDispenserSlots = [
    ...(new Set(
      alarms
        .filter(x => x.isActive)
        .map(x => x.usedDispenserSlots)
        .flat()
    ))
  ];

  // O "new Set" é para criar array com itens únicos,
  // porém no cenário real, os itens devem ser únicos
  // por padrão quando os espaços ocupados forem pegos
  // dos alarmes que estão ativos, ou seja, um alarme
  // ativo não pode estar usando os mesmos espaços 
  // que outro alarme
  // SessionStorage.set("filledDispenserSlots", filledDispenserSlots);

  // Os espaços do dispenser que estão disponíveis e ocupados devem 
  // ser definidos de acordo com o que os alarmes de uma pessoa estão
  // usando, ou seja, deve ser definido por pessoa/dispenser
  SessionStorage.set(
    "dispenserSlots",
    [
      { label: "1", value: 1 },
      { label: "2", value: 2 },
      { label: "3", value: 3 },
      { label: "4", value: 4 },
      { label: "5", value: 5 },
      { label: "6", value: 6 },
      { label: "7", value: 7 },
      { label: "8", value: 8 },
      { label: "9", value: 9 },
      { label: "10", value: 10 },
      { label: "11", value: 11 },
      { label: "12", value: 12 },
      { label: "13", value: 13 },
      { label: "14", value: 14 },
      { label: "15", value: 15 },
      // { label: "16", value: 16 },
    ]
    .map(slot =>
      filledDispenserSlots.includes(slot.value)
        ? { ...slot, disable: true }
        : slot
    ),
  );
}

function mapDispenserSlotOptions(
  dispenserSlots,
  unavailableDispenserSlots,
  dispenserSlotsUsedByAlarm = [],
) {
  let options = dispenserSlots.map(slotValue => ({
    ...(
      unavailableDispenserSlots.includes(slotValue) &&
      !dispenserSlotsUsedByAlarm.includes(slotValue)
      ? { disable: true }
      : {}
    ),
    label: slotValue.toString(),
    value: slotValue,
  }));

  options = orderBy(options, ["disable", "value"], ["desc", "asc"]);

  return options;
}

export {
  setDispenserSlots,
  mapDispenserSlotOptions,
};