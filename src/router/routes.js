function handleProp(router, propName) {
  return {
    [propName]: { ...router.params }
  };
}

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        name: "alarms",
        path: "",
        component: () => import("pages/Alarms.vue"),
        props: router => handleProp(router, "elderly"),
      },
      {
        name: "add-alarm",
        path: "add-alarm",
        component: () => import("pages/AddAlarm.vue"),
        props: router => handleProp(router, "elderly"),
      },
      {
        name: "edit-alarm",
        path: "edit-alarm",
        component: () => import("pages/EditAlarm.vue"),
        props: router => handleProp(router, "alarm"),
      },
      {
        name: "alarm-history",
        path: "alarm-history",
        component: () => import("pages/AlarmHistory.vue"),
        props: router => handleProp(router, "elderly"),
      },
      {
        path: "/settings",
        component: () => import("src/pages/InitialSetup.vue"),
      },
    ],
  },
  {
    path: "/setup",
    component: () => import("src/pages/InitialSetup.vue"),
  },
  {
    path: "/login",
    component: () => import("pages/Login.vue"),
    meta: {
      guest: true,
      authNotRequired: true,
    }
  },

  // Always leave this as last one
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
