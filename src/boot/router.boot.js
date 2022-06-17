import { boot } from "quasar/wrappers";
import { useSessionStore } from "src/stores";

export default boot(async ({ router, store }) => {
  const sessionStore = useSessionStore(store);

  await router.beforeEach(async (to, from, next) => {
    const isUserAuthenticated = await sessionStore.isUserAuthenticated();

    if (!to.meta.authNotRequired && !isUserAuthenticated) {
      next({ path: "/login" });
    }
    else if (to.meta.guest && isUserAuthenticated) {
      next({ path: from.path });
    }
    // else if ( // Comentar para testar configurações iniciais
    //   to.path === "/setup" &&
    //   from.path !== "/login" &&
    //   sessionStore.user.id
    // ) {
    //   next({ path: from.path });
    // }
    else {
      next();
    }
  });
});
