//Timer
var text;
var finalCountDown;
var timedEvent;
var timeRemaining;
var rect;
var graphics;

class Main extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
  }

  preload() {
    //tanks
    this.load.image("tankblack", "assets/tanks/tankblack.png");
    this.load.image("tankblue", "assets/tanks/tankblue.png");
    this.load.image("tankcyan", "assets/tanks/tankcyan.png");
    this.load.image("tankgreen", "assets/tanks/tankgreen.png");
    this.load.image("tankgrey", "assets/tanks/tankgrey.png");
    this.load.image("tankpurple", "assets/tanks/tankpurple.png");
    this.load.image("tankred", "assets/tanks/tankred.png");
    this.load.image("tankyellow", "assets/tanks/tankyellow.png");
    this.load.image("background", "assets/tanks/background.jpg");
    this.load.image("destroyedTank", "assets/tanks/destroyedTank.png");
    this.map = new HexMap(this, 60, 40, 100, "MapConfiguration.json");

    //Animations
    this.load.spritesheet("explosion", "assets/animations/explosion.png", {
      frameWidth: 64,
      frameHeight: 64,
      endFrame: 9
    });
  }

  init() {
    var canvas = this.sys.game.canvas;
    // var fullscreen = this.sys.game.device.fullscreen;

    // if (!fullscreen.available)
    // {
    //     return;
    // }

    // canvas[fullscreen.request]();
  }
  createTankSprite(data) {
    let dataInput = data;
    let username = dataInput.name;
    let color = dataInput.tank.color;
    let x = dataInput.tank.position.x;
    let y = dataInput.tank.position.y;
    let addons = dataInput.tank.addons;
    let rotation = dataInput.tank.rotation;
    console.log(dataInput);

    username = new Tank(
      username,
      color,
      x,
      y,
      addons,
      rotation,
      this,
      this.map,
      45
    );
  }

  create() {
    this.background = this.add.image(1200 / 2, 800 / 2, "background");
    let scene = this;
    this.map.loaded.then(() => {
      scene.map.generateMap();

      scene.mqtt = new Mqtt(scene);
      //scoreboard

      //Timer
      console.log(this);
      text = this.add
        .text(600, 32, "", { fontSize: 24, font: "Arial", fill: "#FFFFFF" })
        .setOrigin(0.5, 0.5);
      finalCountDown = this.add
        .text(600, 350, "", { fontSize: 72, font: "Arial", fill: "#D10000" })
        .setOrigin(0.5, 0.5);
      timedEvent = this.time.delayedCall(15000, scene.onEvent, [], this);

      text.setStroke("#000000", 8);
      finalCountDown.setStroke("#000000", 8);

      //Progress bar for timer
      rect = new Phaser.Geom.Rectangle(375, 40, 500, 20);
      graphics = this.add.graphics();
      graphics.fillRectShape(rect);
      graphics.fillStyle(0x000000);
    });

    //explosion
    var explosion = {
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }),
      frameRate: 5,
      repeat: 0
    };
    this.anims.create(explosion);
  }

  update(delta) {
    //Timer update
    timeRemaining =
      15 -
      timedEvent
        .getElapsedSeconds()
        .toString()
        .substr(0, 2);
    text.setText("Round ends in " + timeRemaining);
    if (timeRemaining <= 5) {
      finalCountDown.setText(timeRemaining);
      if (timeRemaining == 0) {
        finalCountDown.setText(" ");
      }
    }

    //Progress bar for timer
    graphics.clear();
    graphics.fillStyle(0xffffff, 0.7);
    graphics.fillRect(375, 40, 30 * timeRemaining, 18);
  }
  //Empty onEvent for Length
  onEvent() {
    console.log("Timer has ended");
  }
  setTankPosition(receivedMessage) {
    var dataInput = receivedMessage;
    this.receivedMessage.name.setPosition(
      dataInput.tank.position.x,
      dataInput.tank.position.y,
      dataInput.tank.rotation
    );
  }
}
