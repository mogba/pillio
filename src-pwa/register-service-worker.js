import { register } from "register-service-worker";
import { mqttClient } from "src/boot/mqtt.boot";

register(process.env.SERVICE_WORKER_FILE, {
  registrationOptions: { scope: "./" },

  ready(registration) {
    if (mqttClient) {
      // Fazer a inscrição nos tópicos da API
      // mqttClient.subscribe("topico-teste-notificacao");

      mqttClient.on("message", (topic, payload) => {
        console.log("MQTT mensagem tópico", topic);

        const message = JSON.parse(payload?.toString() || "{}");
        const title = message.titulo;
        const body = message.corpo;

        const options = {
          body,
          icon: "/favicon.ico",
          vibrate: [100, 50, 100],
          data: { someKey: "someValue" },
        };
      
        registration.showNotification(title, options);
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

  error(/* err */) {
    // console.error("Error during service worker registration:", err)
  }
})
