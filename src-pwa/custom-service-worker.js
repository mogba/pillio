import { precacheAndRoute } from "workbox-precaching";
import { mqttClient } from "src/boot/mqtt.boot";

import mqttConfig from "src/config/mqtt.config";

const mqtt = require("mqtt");

function displayNotification() {
  const client = mqtt.connect(mqttConfig.connectUrl, mqttConfig.options);

  client.on('connect', (teste) => {
    console.log("Service Worker Broker MQTT conectado com sucesso.");
  });

  client.on('message', async (teste) => {
    console.log("mensagem topico topico-teste-notificacao", teste);

    // if (Notification.permission === "granted") {
      const registration = await navigator.serviceWorker.getRegistration();
  
      const  options = {
        body: "Corpo do texto",
        icon: "./src/assets/quasar-logo-vertical.svg",
        vibrate: [100, 50, 100],
        data: { primaryKey: 1 },
      };
  
      registration.showNotification("Hello motherfucker world!");
    // }
  });
}

displayNotification();

// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST)


import { register } from 'register-service-worker'

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

register("/src-pwa/custom-service-worker.js", {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  registrationOptions: { scope: './' },

  ready (registration) {
    console.log('Custom service worker is active.');
  },

  registered (/* registration */) {
    // console.log('Service worker has been registered.')
  },

  cached (/* registration */) {
    // console.log('Content has been cached for offline use.')
  },

  updatefound (/* registration */) {
    // console.log('New content is downloading.')
  },

  updated (/* registration */) {
    // console.log('New content is available; please refresh.')
  },

  offline () {
    // console.log('No internet connection found. App is running in offline mode.')
  },

  error (/* err */) {
    // console.error('Error during service worker registration:', err)
  }
})
