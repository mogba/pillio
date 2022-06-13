const { v4 } = require("uuid");

const host = "cb12f099.eu-central-1.emqx.cloud";
const port = "8084";
const connectUrl = `wss://${host}:${port}`;

const mqttConfig = {
  connectUrl,
  options: {
    clientId: `mqtt_${(v4())}`,
    clean: true,
    connectTimeout: 4000,
    username: "admin",
    password: "h8xkjEDU$oC%",
    reconnectPeriod: 1000,
    path: "/mqtt",
  },
};

export default mqttConfig;