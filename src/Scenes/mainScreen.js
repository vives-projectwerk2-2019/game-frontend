//Timer
var text;
var finalCountDown;
var timedEvent;
var timeRemaining;
var rect;
var graphics;
let tankObjects = [];
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
    // console.log(dataInput);

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
    tankObjects.push(username);
  }

  create() {
    this.background = this.add.image(1200 / 2, 800 / 2, "background");
    let scene = this;
    this.map.loaded.then(() => {
      scene.map.generateMap();

      scene.mqtt = new Mqtt(scene);
      //scoreboard

      graphics = this.add.graphics();

      graphics.lineStyle(4, 0x000000, 1);

      graphics.strokeRect(1210, 60, 300, 89);
      graphics.strokeRect(1210, 149, 300, 89);
      graphics.strokeRect(1210, 238, 300, 89);
      graphics.strokeRect(1210, 327, 300, 89);
      graphics.strokeRect(1210, 416, 300, 89);
      graphics.strokeRect(1210, 505, 300, 89);
      graphics.strokeRect(1210, 594, 300, 89);
      graphics.strokeRect(1210, 683, 300, 89);
      graphics.strokeRect(1210, 772, 300, 89);

      this.add.image(1250, 193, "tankblue").setScale(0.07);
      this.add.image(1250, 282, "tankblack").setScale(0.07);
      this.add.image(1250, 371, "tankcyan").setScale(0.07);
      this.add.image(1250, 460, "tankgreen").setScale(0.07);
      this.add.image(1250, 549, "tankgrey").setScale(0.07);
      this.add.image(1250, 638, "tankpurple").setScale(0.07);
      this.add.image(1250, 727, "tankred").setScale(0.07);
      this.add.image(1250, 816, "tankyellow").setScale(0.07);

      scene.add.text(1250, 80, "Scoreboard", {
        fontFamily: "Arial",
        fontSize: 38,
        color: "#000000"
      });

      scene.add.text(1350, 160, "blue tank", {
        fontFamily: "Arial",
        fontWeight: "bold",
        fontSize: 16,
        color: "#000000"
      });
      scene.add.text(1350, 249, "black tank", {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#000000"
      });
      scene.add.text(1350, 338, "cyan tank", {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#000000"
      });
      scene.add.text(1350, 427, "green tank", {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#000000"
      });
      scene.add.text(1350, 516, "grey tank", {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#000000"
      });
      scene.add.text(1350, 605, "purple tank", {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#000000"
      });
      scene.add.text(1350, 694, "red tank", {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#000000"
      });
      scene.add.text(1350, 783, "yellow tank", {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#000000"
      });

      scene.add.text(1300, 185, "health:", {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#000000"
      });
      scene.add.text(1300, 274, "health:", {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#000000"
      });
      scene.add.text(1300, 363, "health:", {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#000000"
      });
      scene.add.text(1300, 452, "health:", {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#000000"
      });
      scene.add.text(1300, 541, "health:", {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#000000"
      });
      scene.add.text(1300, 630, "health:", {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#000000"
      });
      scene.add.text(1300, 719, "health:", {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#000000"
      });
      scene.add.text(1300, 808, "health:", {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#000000"
      });

      scene.add.text(1300, 210, "shield:", {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#000000"
      });
      scene.add.text(1300, 299, "shield:", {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#000000"
      });
      scene.add.text(1300, 388, "shield:", {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#000000"
      });
      scene.add.text(1300, 477, "shield:", {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#000000"
      });
      scene.add.text(1300, 566, "shield:", {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#000000"
      });
      scene.add.text(1300, 655, "shield:", {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#000000"
      });
      scene.add.text(1300, 744, "shield:", {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#000000"
      });
      scene.add.text(1300, 833, "shield:", {
        fontFamily: "Arial",
        fontSize: 16,
        color: "#000000"
      });

      //Timer
      // console.log(this);
      text = this.add
        .text(100, 37, "", { fontSize: 24, font: "Arial", fill: "#FFFFFF" })
        .setOrigin(0.5, 0.5);
      finalCountDown = this.add
        .text(600, 450, "", { fontSize: 300, font: "Arial", fill: "#D10000" })
        .setOrigin(0.5, 0.5);
      timedEvent = this.time.delayedCall(15000, scene.onEvent, [], this);

      text.setStroke("#000000", 8);
      finalCountDown.setStroke("#000000", 8);

      //Progress bar for timer
      rect = new Phaser.Geom.Rectangle(200, 37, 500, 20);
      graphics = this.add.graphics();
      graphics.fillRectShape(rect);
      graphics.fillStyle(0x000000);
      rectOutside = new Phaser.Geom.Rectangle(200, 37, 500, 20);
      graphics = this.add.graphics();
      graphics.fillRectShape(rectOutside);
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
      15000 -
      timedEvent
        .getElapsed()
        .toString()
        .substr(0, 5);
    text.setText("Time left: ");
    graphics.clear();
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(175, 29, (window.innerWidth / 18) * 15, 18);
    graphics.fillStyle(0x008000, 1);
    graphics.fillRect(175, 29, (window.innerWidth / 18000) * timeRemaining, 18);
    if (timeRemaining < 10000) {
      graphics.fillStyle(0xff8c00, 1);
      graphics.fillRect(
        175,
        29,
        (window.innerWidth / 18000) * timeRemaining,
        18
      );
      if (timeRemaining < 5000) {
        graphics.fillStyle(0xff0000, 1);
        graphics.fillRect(
          175,
          29,
          (window.innerWidth / 18000) * timeRemaining,
          18
        );
        finalCountDown.setText(
          15 -
            timedEvent
              .getElapsedSeconds()
              .toString()
              .substr(0, 2)
        );
        if (timeRemaining == 0) {
          finalCountDown.setText(" ");
        }
      }
    }
  }
  //Empty onEvent for Length
  onEvent() {
    console.log("Timer has ended");
  }
  setTankPosition(receivedMessage) {
    var dataInput = receivedMessage;
    //console.log(dataInput.name);

    for (let i = 0; i < tankObjects.length; i++) {
      const element = tankObjects[i];
      if (element.username == dataInput.name) {
        element.setPosition(
          dataInput.tank.position.x,
          dataInput.tank.position.y,
          dataInput.tank.rotation
        );
      }
    }
  }
}
