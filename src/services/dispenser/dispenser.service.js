import { sortBy } from "lodash";
import { api } from "src/boot/axios.boot";

export const getDispenserSlotOptions = async (elderlyId) => {
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
    const message = `Erro ao buscar configurações do Dispenser: ${error.message}`;
    console.log(message);
    return { error: true, message };
  }
};

export const createDispenser = async (elderlyId, dispenser) => {
  try {
    delete dispenser.id;

    const response = await api.post("machines/create", { idIdoso: elderlyId, dispenser });

    const createdDispenserId = response.data?.id;

    return {
      success: true,
      message: "Configurações salvas.",
      data: { createdDispenserId },
    };
  } catch (error) {
    const message = `Erro ao salvar configurações: ${error.message}`;
    console.log(message);
    return { error: true, message };
  }
};

export const updateDispenser = async (dispenser) => {
  try {
    await api.put(
      `machines/update/${dispenser.id}`,
      dispenser,
    );

    return { success: true, message: "Configurações salvas." };
  } catch (error) {
    const message = `Erro ao salvar configurações: ${error.message}`;
    console.log(message);
    return { error: true, message };
  }
};
