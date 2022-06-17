import { register } from "register-service-worker";
import { useSessionStore } from "src/stores";
import { mqttClient } from "src/boot/mqtt.boot";

let _mqttClient;

register(process.env.SERVICE_WORKER_FILE, {
  registrationOptions: { scope: "./" },

  ready(registration) {
    console.log("Service Worker está ativo.");

    if (!_mqttClient) {
      _mqttClient = mqttClient;
    }
    
    if (_mqttClient) {
      const sessionStore = useSessionStore();

      _mqttClient.on("message", (topic, payload) => {
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
