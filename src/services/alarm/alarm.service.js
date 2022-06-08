import { api } from "src/boot/axios.boot";

async function deleteAlarms(alarmIds) {
  try {
    await api.put(
      "/agendas/excluir",
      { idsAlarmes: alarmIds },
    );
  } catch (error) {
    console.log("Erro ao excluir alarmes:", error);
  }
}

// async function enableDisableAlarm(alarmId, newActiveStatus) {
//   try {
//     await api.put(
//       "/agendas/habilitar-desabilitar",
//       { idAlarme: alarmId, novoEstadoAtivo: newActiveStatus },
//     );
//   } catch (error) {
//     console.log(`Erro ao ${newActiveStatus ? "ativar" : "desativar"} alarme:`, error);
//   }
// }

export {
  deleteAlarms,
  // enableDisableAlarm,
};