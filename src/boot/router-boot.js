import { boot } from "quasar/wrappers";

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => !record.meta.authNotRequired) &&
        !sessionStorage.isLoggedIn) {
      next({ path: "/login" });
    }
    else {
      next();
    }
  });
});