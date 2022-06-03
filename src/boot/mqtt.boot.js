const mqtt = require("mqtt");
const { v4 } = require("uuid");

export default () => {
  // Test connections with 'http://tools.emqx.io/'

  const host = "xaf606cf.us-east-1.emqx.cloud";
  const port = "8084";
  const clientId = `mqtt_${(v4())}`;
  const connectUrl = `wss://${host}:${port}`;

  const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: "admin",
    password: "a%!undQWy7ys",
    reconnectPeriod: 1000,
    path: "/mqtt",
  });

  client.on('connect', function () {
    client.subscribe('presence', function (err) {
      if (err) {
        console.log("Erro", err);
      }
      if (!err) {
        client.publish('presence', 'Hello mqtt');
      }
    });
  });

  client.on("message", (topic, payload) => {
    console.log("Mensagem recebida", topic, payload.toString());
  });
};
