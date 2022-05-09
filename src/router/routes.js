const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "", 
        component: () => import("pages/Alarms.vue"),
      },
      {
        path: "add-alarm",
        component: () => import("pages/EditAlarm.vue"),
      },
      {
        name: "edit-alarm",
        path: "edit-alarm",
        component: () => import("pages/EditAlarm.vue"),
        props: router => ({ alarm: { ...router.params } }),
      },
      {
        path: "alarm-history",
        component: () => import("pages/AlarmHistory.vue"),
      },
    ],
  },
      
      
      
  // REMOVER DEPOIS
  {
    path: "/ic",
    component: () => import("pages/InitialConfiguration.vue"),
  },

  {
    path: "/login",
    component: () => import("pages/Login.vue"),
    meta: {
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
