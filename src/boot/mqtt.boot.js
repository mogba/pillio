import { boot } from "quasar/wrappers";
import mqttConfig from "src/config/mqtt.config";

const mqtt = require("mqtt");

let mqttClient;

export default boot(() => {
  // Test connections with 'http://tools.emqx.io/'

  const client = mqtt.connect(mqttConfig.connectUrl, mqttConfig.options);

  client.on("connect", packet => {
    console.log("Broker MQTT conectado com sucesso.");
  });

  client.on("disconnect", packet => {
    console.log("Broker MQTT desconectado", packet);
  });

  mqttClient = client;
});

export { mqttClient };
