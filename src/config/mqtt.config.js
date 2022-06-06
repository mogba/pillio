const { v4 } = require("uuid");

const host = "xaf606cf.us-east-1.emqx.cloud";
const port = "8084";
const connectUrl = `wss://${host}:${port}`;

const mqttConfig = {
  connectUrl,
  options: {
    clientId: `mqtt_${(v4())}`,
    clean: true,
    connectTimeout: 4000,
    username: "admin",
    password: "a%!undQWy7ys",
    reconnectPeriod: 1000,
    path: "/mqtt",
  },
};

export default mqttConfig;