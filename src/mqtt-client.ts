import { connect } from "mqtt";
import { IClientOptions } from "mqtt/types/lib/client-options";

Object.assign(global, { WebSocket: require("ws") });

export const config: IClientOptions = {
  protocol: "wss",
  clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
  reconnectPeriod: 1000,
  keepalive: 10,
};

const client = connect("wss://broker.emqx.io:8084/mqtt", config);

client.subscribe(process.env.MQTT_TOPIC as string);

client.on("connect", () => {
  console.log("Connected");
});

client.on("offline", () => {
  console.log("offline");
});

client.on("message", (topic, message) => {
  console.log(JSON.parse(message?.toString()));
});

export default client;
