import { boot } from "quasar/wrappers";
import mqttConfig from "src/config/mqtt.config";

const mqtt = require("mqtt");

let mqttClient;

export default boot(() => {
  // Test connections with 'http://tools.emqx.io/'

  const client = mqtt.connect(mqttConfig.connectUrl, mqttConfig.options);

  client.on('connect', (teste) => {
    console.log("Broker MQTT conectado com sucesso.");
  });

  mqttClient = client;
});

export { mqttClient };
