import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { LocalStorage } from "quasar";

export const useAlarmStore = defineStore("alarmStore", () => {
  const alarmRef = ref(LocalStorage.getItem("alarm") || null);
  const elderlyRef = ref(LocalStorage.getItem("elderly") || null);
  const dispenserRef = ref(LocalStorage.getItem("dispenser") || null);

  watch(
    [alarmRef, elderlyRef, dispenserRef],
    ([alarm, elderly, dispenser]) => {
      LocalStorage.set("alarm", alarm);
      LocalStorage.set("elderly", elderly);
      LocalStorage.set("dispenser", dispenser);
    },
  );

  return {
    alarm: alarmRef,
    elderly: elderlyRef,
    dispenser: dispenserRef,
  };
});
