import { mqttClient } from "src/boot/mqtt.boot";

export const publish = (topic, message) => {
  mqttClient.publish(topic, JSON.stringify(message));
};

export const subscribe = (topic, messageCallback, subscribeErrorCallback) => {
  mqttClient.subscribe(topic, (err, granted) => {
    if (err) {
      console.log(`Erro ao conectar ao tópico MQTT '${topic}':`, err);

      if (typeof subscribeErrorCallback === "function") {
        subscribeErrorCallback(err);
      }
    }
    else {
      console.log("Conectado com sucesso ao tópico MQTT:", topic);
    }
  });

  mqttClient.on("message", (messageTopic, payload) => {
    if (messageTopic === topic) {
      const message = JSON.parse(payload?.toString() || "{}");
      console.log(`Mensagem recebida pelo tópico MQTT '${messageTopic}'`, message);
      messageCallback(message);
    }
  });
}

export const unsubscribe = topic => {
  mqttClient.unsubscribe(topic, err => {
    if (err) {
      console.log(`Erro ao desconectar do tópico MQTT '${topic}':`, err);
    }
  });
}
