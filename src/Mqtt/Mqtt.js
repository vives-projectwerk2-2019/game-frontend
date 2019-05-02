import { Client, Message } from "paho-mqtt";

const mqtt_settings = {
  host: process.env.MQTT_BROKER_HOST || "game.bug.labict.be",
  port: Number(process.env.MQTT_BROKER_PORT) || 443,
  path: process.env.MQTT_BROKER_PATH || "/broker",
  useSSL: process.env.MQTT_BROKER_USE_SSL == "true" || true
};

/*jshint esversion: 6 */
class Mqtt {
  constructor(scene) {
    this.scene = scene;
    let mqtt = this;
    console.log(mqtt_settings);
    const clientId = "browser-" + Math.random().toString(36).substring(2, 15);
    this.client = new Client(
      mqtt_settings.host,
      mqtt_settings.port,
      mqtt_settings.path,
      clientId
    );

    mqtt.arrayPlayers = [];
    mqtt.hasdied = [0];

    // set callback handlers
    this.client.onConnectionLost = function(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
      }
    };

    this.client.onMessageArrived = function(message) {
      let receivedMessage = JSON.parse(message.payloadString);
      console.log(receivedMessage);
      // if (receivedMessage.commands.reset) {
      //   mqtt.scene.resetAllTanks();
      // }
      if (receivedMessage.turn) {
        scene.onNewRoundStarted(receivedMessage.turn);
      }
      for (let i = 0; i < receivedMessage.players.length; i++) {
        let username = receivedMessage.players[i].name;
        let player = receivedMessage.players[i];
        if (!mqtt.arrayPlayers.includes(username)) {
          mqtt.arrayPlayers.push(username);
          mqtt.scene.createTankSprite(player);
        } else {
          mqtt.scene.setTankPosition(receivedMessage);
        }
        if (player.tank.health <= 0 && !mqtt.hasdied[i]) {
          mqtt.scene.destroyTank(username);
          mqtt.hasdied[i] = 1;
        }
      }
    };
    // connect the client
    this.client.connect({
      useSSL: mqtt_settings.useSSL,
      onSuccess: function() {
        // Once a connection has been made, make a subscription and send a message.
        console.log("onConnect");
        mqtt.client.subscribe("game/replicated");
        let message = new Message("Hello");
        message.destinationName = "World";
        mqtt.client.send(message);
      }
    });
  }
}

export default Mqtt;
