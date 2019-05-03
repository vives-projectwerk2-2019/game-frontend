import { Client, Message } from "paho-mqtt";

const mqtt_settings = {
  host: "game.bug.labict.be",
  port: 443,
  path: "/broker",
  useSSL: true,
  game_topic: "game75"
};

/*jshint esversion: 6 */
class Mqtt {
  constructor() {
    console.log(mqtt_settings);
    const clientId = "browser-" + Math.random().toString(36).substring(2, 15);
    this.client = new Client(
      mqtt_settings.host,
      mqtt_settings.port,
      mqtt_settings.path,
      clientId
    );

    // set callback handlers
    this.client.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
      }
    };

    this.client.onMessageArrived = (message) => {
      console.log("test");
      //console.log(receivedMessage);
      this.onUpdate(JSON.parse(message.payloadString));
      this.setTankStatss(JSON.parse(message.payloadString))
    };
    // connect the client
    this.client.connect({
      useSSL: mqtt_settings.useSSL,
      onSuccess: () => {
        // Once a connection has been made, make a subscription and send a message.
        console.log(`Connected with MQTT broker (${mqtt_settings.host}:${mqtt_settings.port}${mqtt_settings.path})`);
        console.log(`Subscribing to ${mqtt_settings.game_topic}/replicated`)
        this.client.subscribe(`${mqtt_settings.game_topic}/replicated`);
        let message = new Message("Hello");
        message.destinationName = "World";
        this.client.send(message);
      }
    });
  }
}

export default Mqtt;
