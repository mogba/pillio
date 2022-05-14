export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    if (!to.meta.authNotRequired &&
        sessionStorage.isLoggedIn !== "true") {
      next({ path: "/login" });
    }
    else {
      next();
    }
  });
};