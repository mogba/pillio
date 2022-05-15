import { SessionStorage } from "quasar";

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    if (!to.meta.authNotRequired &&
      !SessionStorage.getItem("user").isLoggedIn) {
      next({ path: "/login" });
    }
    else {
      next();
    }
  });
};