import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { LocalStorage } from "quasar";

export const useAlarmStore = defineStore("alarmStore", () => {
  const alarmRef = ref(LocalStorage.getItem("alarm") || {});

  watch(alarmRef, alarm => {
    LocalStorage.set("alarm", alarm);
  });

  return {
    alarm: alarmRef,
  };
});
