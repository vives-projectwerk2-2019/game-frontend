const client = new Paho.MQTT.Client("mqtt.labict.be", 1884, "");
var receivedMessage = {
  Player: {
    username: "",
    movement: "forward",
    dev_id: "",
    action: 0,
    joined: true
  },
  Controller: { addons: [null, null, null], dev_id: "" }
};
// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
// connect the client
client.connect({ onSuccess: onConnect });

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("game");
  message = new Paho.MQTT.Message("Hello");
  message.destinationName = "World";
  client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}

// called when a message arrives 
function onMessageArrived(message) {
  receivedMessage = JSON.parse(message.payloadString);
  let main = new Main();
  main.moveTank(receivedMessage); 
  main.tankAction(receivedMessage);
  console.log(receivedMessage);
}