import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { LocalStorage } from "quasar";

export const useSettingsStore = defineStore("settingsStore", () => {
  const elderlyRef = ref(LocalStorage.getItem("elderly") || {});
  const dispenserRef = ref(LocalStorage.getItem("dispenser") || {});
  const dispenserSetupRef = ref(LocalStorage.getItem("dispenserSetup") || {});

  watch(
    [elderlyRef, dispenserRef, dispenserSetupRef],
    ([elderly, dispenser, dispenserSetup]) => {
      LocalStorage.set("elderly", elderly);
      LocalStorage.set("dispenser", dispenser);
      LocalStorage.set("dispenserSetup", dispenserSetup);
    },
    { deep: true },
  );

  return {
    elderly: elderlyRef,
    dispenser: dispenserRef,
    dispenserSetup: dispenserSetupRef,
  };
});
