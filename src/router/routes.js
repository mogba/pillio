import { h, Suspense } from "vue";
import LoadingSpinner from "src/components/LoadingSpinner.vue";

async function suspenseHack({ default: component }) {
  const wrapper = props =>
    h(Suspense, component.props, {
      default: () => h(component, props),
      fallback: () => h(LoadingSpinner),
    });

  wrapper.displayName = "SuspenseHack";
  return wrapper;
}

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
        component: () => import("pages/Alarms.vue").then(c => suspenseHack(c)),
        props: router => handleProp(router, "elderly"),
      },
      {
        name: "add-alarm",
        path: "add-alarm",
        component: () => import("pages/AddAlarm.vue").then(c => suspenseHack(c)),
        props: router => handleProp(router, "elderly"),
      },
      {
        name: "edit-alarm",
        path: "edit-alarm",
        component: () => import("pages/EditAlarm.vue").then(c => suspenseHack(c)),
        props: router => handleProp(router, "alarm"),
      },
      {
        name: "alarm-history",
        path: "alarm-history",
        component: () => import("pages/AlarmHistory.vue").then(c => suspenseHack(c)),
        props: router => handleProp(router, "elderly"),
      },
      {
        path: "settings",
        component: () => import("pages/Settings.vue").then(c => suspenseHack(c)),
      },
      {
        name: "add-elderly",
        path: "add-elderly",
        component: () => import("pages/EditElderly.vue").then(c => suspenseHack(c)),
        props: router => handleProp(router, "elderly"),
      },
      {
        name: "edit-elderly",
        path: "edit-elderly",
        component: () => import("pages/EditElderly.vue").then(c => suspenseHack(c)),
        props: router => handleProp(router, "elderly"),
      },
    ],
  },
  {
    path: "/setup",
    component: () => import("pages/InitialSetup.vue").then(c => suspenseHack(c)),
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
