/*jshint esversion: 6 */
arrayPlayers = [];
hasdied = [0];
class Mqtt {
  constructor(scene) {
    this.scene = scene;
    let mqtt = this;
    this.client = new Paho.MQTT.Client("mqtt.labict.be", 1884, "");

    // set callback handlers
    this.client.onConnectionLost = function(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
      }
    };

    this.client.onMessageArrived = function(message) {
      let receivedMessage = JSON.parse(message.payloadString);
      console.log(receivedMessage);
      if (receivedMessage.commands.reset) {
        mqtt.scene.resetAllTanks();
      }

      for (let i = 0; i < receivedMessage.players.length; i++) {
        let username = receivedMessage.players[i].name;
        let player = receivedMessage.players[i];
        if (!arrayPlayers.includes(username)) {
          arrayPlayers.push(username);
          mqtt.scene.createTankSprite(player);
        } else {
          mqtt.scene.setTankPosition(player);
        }
        if (player.tank.health <= 0 && !hasdied[i]) {
          mqtt.scene.destroyTank(username);
          hasdied[i] = 1;
        }
      }
    };
    // connect the client
    this.client.connect({
      onSuccess: function() {
        // Once a connection has been made, make a subscription and send a message.
        console.log("onConnect");
        mqtt.client.subscribe("game3/replicated");
        let message = new Paho.MQTT.Message("Hello");
        message.destinationName = "World";
        mqtt.client.send(message);
      }
    });
  }
}
