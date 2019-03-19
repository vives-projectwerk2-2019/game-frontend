/*jshint esversion: 6 */
class Mqtt {
  constructor(scene) {
    this.scene = scene;
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

    // set callback handlers
    this.client.onConnectionLost = (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
      }
    };
    console.log(this);
    this.client.onMessageArrived = (message) => {
      let receivedMessage = JSON.parse(message.payloadString);
      this.scene.moveTank(receivedMessage);
      this.scene.tankAction(receivedMessage);
      console.log(receivedMessage);
    };
    // connect the client
    this.client.connect({
      onSuccess: () => {
        // Once a connection has been made, make a subscription and send a message.
        console.log("onConnect");
        this.client.subscribe("game");
        let message = new Paho.MQTT.Message("Hello");
        message.destinationName = "World";
        this.client.send(message);
      }
    });
  }
}
