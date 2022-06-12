import { sortBy } from "lodash";
import { api } from "src/boot/axios.boot";

async function getDispenserSlotOptions(elderlyId) {
  try {
    const response = await api.get(`machines/getCompartimentos/${elderlyId}`);

    const unavailableDispenserSlots = (
      response.data?.compartimentosEmUso || []
    ).map(slot => Number(slot));

    const dispenserSlots = Array.from(Array(
      response.data?.qtdeCompartimentos || 15
    )).map((_, i) => i + 1);

    return {
      unavailableDispenserSlots: sortBy(unavailableDispenserSlots),
      dispenserSlots: sortBy(dispenserSlots),
    };
  } catch (error) {
    console.log("Erro ao buscar configurações do Dispenser:", error);
  }
}

export {
  getDispenserSlotOptions,
};
