/*jshint esversion: 6 */
arrayPlayers = [];
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

      for (let i = 0; i < receivedMessage.players.length; i++) {
        let username = receivedMessage.players[i].name;
        if (!arrayPlayers.includes(username)) {
          mqtt.scene.createTankSprite(receivedMessage.players[i]);
        } else {
          console.log(receivedMessage.players[i]);
          mqtt.scene.setTankPosition(receivedMessage.players[i]);
        }
      }

      // Object.keys(receivedMessage.players).forEach(player => {
      //   if (!arrayPlayers[player]) {
      //     arrayPlayers[player] = mqtt.scene.createTankSprite(player);
      //   }
      // });
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
