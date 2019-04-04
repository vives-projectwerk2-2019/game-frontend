/*jshint esversion: 6 */
class Mqtt {
  constructor(scene) {
    this.scene = scene;
    let mqtt = this;
    this.client = new Paho.MQTT.Client("mqtt.labict.be", 1884, "");

    this.receivedMessage = {
      Player: {
        username: "",
        movement: "forward",
        dev_id: "",
        action: 0,
        joined: true
      },
      Controller: { addons: ["gatling gun", null, null], dev_id: "" }
    };

    this.dataFromServer = {
      players: [
        {
          name: "rae",
          tank: {
            color: null,
            addons: [null, null, null],
            rotation: 1,
            position: { x: 581.5767664977294, y: 460 }
          }
        },
        {
          name: "reee",
          tank: {
            color: null,
            addons: [null, null, null],
            rotation: 1,
            position: { x: 443.0127018922193, y: 100 }
          }
        }
      ]
    };

    // set callback handlers
    this.client.onConnectionLost = function(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
      }
    };
    //console.log(this);
    this.client.onMessageArrived = function(message) {
      let receivedMessage = JSON.parse(message.payloadString);
      //mqtt.scene.moveTank(receivedMessage);
      //mqtt.scene.tankAction(receivedMessage);
      console.log(receivedMessage);
      mqtt.scene.setTankPosition(receivedMessage);
    };
    // connect the client
    this.client.connect({
      onSuccess: function() {
        // Once a connection has been made, make a subscription and send a message.
        console.log("onConnect");
        mqtt.client.subscribe("game2/replicated");
        let message = new Paho.MQTT.Message("Hello");
        message.destinationName = "World";
        mqtt.client.send(message);
      }
    });
  }
}
