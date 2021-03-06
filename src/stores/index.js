import { store } from "quasar/wrappers";
import { createPinia } from "pinia";

export default store(() => {
  const pinia = createPinia();
  return pinia;
});

export * from "./modules/session.store";
export * from "./modules/alarm.store";
export * from "./modules/settings.store";
