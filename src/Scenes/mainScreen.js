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

      this.player = new PlayerOverviewPanel(this, 1200, 50, null);
      this.player.addPlayer('jurne', 'tankblue');
      this.player.addPlayer('fred', 'tankgreen');
      this.player.addPlayer('jop', 'tankred');
      this.player.addPlayer('jurne', 'tankblack');
      this.player.addPlayer('fred', 'tankcyan');
      this.player.addPlayer('jop', 'tankgrey');
      this.player.addPlayer('jurne', 'tankpurple');
      this.player.addPlayer('fred', 'tankyellow');

      
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
