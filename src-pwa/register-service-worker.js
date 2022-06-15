import { register } from "register-service-worker";
import { useSessionStore } from "src/stores";
import { mqttClient } from "src/boot/mqtt.boot";

register(process.env.SERVICE_WORKER_FILE, {
  registrationOptions: { scope: "./" },

  ready(registration) {
    console.log("Service Worker está ativo.");
    
    if (mqttClient) {
      const sessionStore = useSessionStore();
      // const user = sessionStore.user;

      // if (!user?.id) {
      //   console.log("Tópicos MQTT para notificações não foram conectados, pois os dados do usuário ainda não estão disponíveis.");
      //   return;
      // }

      // const isUserResponsible = user.role === "responsible";
      // const elderlyIds = isUserResponsible
      //   ? user.elderlies.map(elderly => elderly.id)
      //   : [user.id];

      // const topics = elderlyIds.map(id => (
      //   `api/elderly/${id}/alarm/notification/notake`
      // ));

      // topics.forEach(topic => mqttClient.subscribe(topic));
      // console.log("Tópicos MQTT para notificações conectados", topics);

      mqttClient.on("message", (topic, payload) => {
        const topics = sessionStore.notificationTopics;
        const user = sessionStore.user;
        const isUserResponsible = user.role === "responsible";

        if (topics.includes(topic)) {
          console.log("Mensagem MQTT com tópico", topic);

          const message = JSON.parse(payload?.toString() || "{}");

          const title = "Não tomou o remédio";
          const body = isUserResponsible
            ? `${message.nomeIdoso} não tomou o remédio ${message.nomeRemedio} às ${message.horaDisparo}`
            : `${message.nomeIdoso}, você não tomou o remédio ${message.nomeRemedio} às ${message.horaDisparo}`;
  
          const options = {
            body,
            icon: "/favicon.ico",
            vibrate: [100, 50, 100],
            // data: { someKey: "someValue" },
          };

          registration.showNotification(title, options);
        }
      });
    }
  },

  registered(/* registration */) {
    // console.log("Service worker has been registered.")
  },

  cached(/* registration */) {
    // console.log("Content has been cached for offline use.")
  },

  updatefound(/* registration */) {
    // console.log("New content is downloading.")
  },

  updated(/* registration */) {
    // console.log("New content is available; please refresh.")
  },

  offline() {
    // console.log("No internet connection found. App is running in offline mode.")
  },

  error(error) {
    console.error("Erro durante o registro do Service Worker:", error);
  }
})
