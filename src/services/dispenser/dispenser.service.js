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
      success: true,
      data: {
        unavailableDispenserSlots: sortBy(unavailableDispenserSlots),
        dispenserSlots: sortBy(dispenserSlots),
      },
    };
  } catch (error) {
    const message = `Erro ao buscar configurações do Dispenser: ${error}`;
    console.log(message);
    return { error: true, message };
  }
}

export {
  getDispenserSlotOptions,
};
