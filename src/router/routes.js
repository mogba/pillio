const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "", 
        component: () => import("pages/Alarms.vue")
      },
      {
        path: "add-alarm",
        component: () => import("pages/EditAlarm.vue")
      },
      {
        path: "edit-alarm",
        component: () => import("pages/EditAlarm.vue")
      },
      {
        path: "alarm-history",
        component: () => import("pages/AlarmHistory.vue")
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
