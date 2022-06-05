import { useSessionStore } from "src/stores";

export default async ({ router, store }) => {
  const sessionStore = useSessionStore(store);

  await router.beforeEach(async (to, from, next) => {
    const isUserAuthenticated = await sessionStore.isUserAuthenticated();

    if (!to.meta.authNotRequired && !isUserAuthenticated) {
      next({ path: "/login" });
    }
    else if (to.meta.guest && isUserAuthenticated) {
      next({ path: "/" });
    }
    else {
      next();
    }
  });
};