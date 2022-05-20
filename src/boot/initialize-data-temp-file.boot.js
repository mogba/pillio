import { SessionStorage } from "quasar";

export default (_) => {
  // Centralizar aqui as configurações de dados iniciais necessários 
  // para o funcionamento do sistema. Isso é temporário e deve ser
  // substituído pelos dados retornados do backend.

  SessionStorage.set("user", { id: -1, isLoggedIn: true, isNotConfiguredYet: false });
  SessionStorage.set("elderlies", [
    {
      id: 1,
      name: "Maria",
    },
    {
      id: 2,
      name: "Ozzy",
    },
    {
      id: 3,
      name: "Jorge",
    },
    {
      id: 4,
      name: "Camila",
    },
  ]);
  SessionStorage.set("alarms", [
    {
      id: 1,
      elderlyId: 1,
      medicineName: "Hidroclorotiazida",
      timesToRepeat: 5,
      repetitionIntervalInHours: 1,
      startDate: "15/03/2022",
      startTime: "07:30",
      isActive: true,
      toDelete: false,
      usedDispenserSlots: [
        1, 2, 3, 4, 5,
      ],
    },
    {
      id: 2,
      elderlyId: 1,
      medicineName: "Metformina",
      timesToRepeat: 7,
      repetitionIntervalInHours: 8,
      startDate: "15/03/2022",
      startTime: "07:30",
      isActive: true,
      toDelete: false,
      usedDispenserSlots: [
        6, 7, 8, 9, 10, 11, 12,
      ],
    },
    {
      id: 3,
      elderlyId: 1,
      medicineName: "Escitalopram",
      timesToRepeat: 10,
      repetitionIntervalInHours: 8,
      startDate: "15/03/2022",
      startTime: "07:30",
      isActive: false,
      toDelete: false,
      usedDispenserSlots: [],
    },
    {
      id: 4,
      elderlyId: 1,
      medicineName: "Dipirona",
      timesToRepeat: 3,
      repetitionIntervalInHours: 8,
      startDate: "15/03/2022",
      startTime: "07:30",
      isActive: false,
      toDelete: false,
      usedDispenserSlots: [],
    },
    {
      id: 5,
      elderlyId: 2,
      medicineName: "Rivaroxabana",
      timesToRepeat: 7,
      repetitionIntervalInHours: 8,
      startDate: "15/03/2022",
      startTime: "07:30",
      isActive: true,
      toDelete: false,
      usedDispenserSlots: [
        1, 2, 3, 4,
      ],
    },
    {
      id: 6,
      elderlyId: 2,
      medicineName: "Addera D3",
      timesToRepeat: 10,
      repetitionIntervalInHours: 8,
      startDate: "15/03/2022",
      startTime: "07:30",
      isActive: true,
      toDelete: false,
      usedDispenserSlots: [
        5, 6, 7, 8,
      ],
    },
    {
      id: 7,
      elderlyId: 2,
      medicineName: "Neosaldina",
      timesToRepeat: 3,
      repetitionIntervalInHours: 8,
      startDate: "15/03/2022",
      startTime: "07:30",
      isActive: false,
      toDelete: false,
      usedDispenserSlots: [],
    },
    {
      id: 8,
      elderlyId: 3,
      medicineName: "Neosaldina",
      timesToRepeat: 3,
      repetitionIntervalInHours: 8,
      startDate: "15/03/2022",
      startTime: "07:30",
      isActive: true,
      toDelete: false,
      usedDispenserSlots: [
        1, 2, 3, 4, 5, 6, 7,
      ],
    },
    {
      id: 9,
      elderlyId: 4,
      medicineName: "Metmorfina",
      timesToRepeat: 3,
      repetitionIntervalInHours: 8,
      startDate: "15/03/2022",
      startTime: "07:30",
      isActive: false,
      toDelete: false,
      usedDispenserSlots: [],
    },
    {
      id: 10,
      elderlyId: 4,
      medicineName: "Torsilax",
      timesToRepeat: 3,
      repetitionIntervalInHours: 8,
      startDate: "15/03/2022",
      startTime: "07:30",
      isActive: false,
      toDelete: false,
      usedDispenserSlots: [],
    },
  ]);
};