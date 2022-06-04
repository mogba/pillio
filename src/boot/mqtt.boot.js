const mqtt = require("mqtt");
const { v4 } = require("uuid");

let mqttClient;

export default () => {
  // Test connections with 'http://tools.emqx.io/'

  const host = "xaf606cf.us-east-1.emqx.cloud";
  const port = "8084";
  const connectUrl = `wss://${host}:${port}`;

  const options = {
    clientId: `mqtt_${(v4())}`,
    clean: true,
    connectTimeout: 4000,
    username: "admin",
    password: "a%!undQWy7ys",
    reconnectPeriod: 1000,
    path: "/mqtt",
  };

  const client = mqtt.connect(connectUrl, options);

  client.on('connect', (teste) => {
    console.log("Broker MQTT conectado com sucesso.");
  });

  mqttClient = client;
};

export { mqttClient };
