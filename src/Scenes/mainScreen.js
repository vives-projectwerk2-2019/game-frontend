//Timer
var text;
var finalCountDown;
var timedEvent;
var timerLength = 15000; // (in ms)
var timeRemaining;
var rect;
var graphics;
let allTanks = [];
class mainScreen extends Phaser.Scene {
  constructor() {
    super({ key: "mainScreen" });
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
    // this.load.spritesheet("explosion", "assets/animations/explosion.png", {
    //   frameWidth: 64,
    //   frameHeight: 64,
    //   endFrame: 9
    // });
    this.load.spritesheet("flames", "assets/animations/flames.png", {
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
    allTanks.push(username);
  }
  getCurrentTank(username) {
    this.username = username;
    for (let index = 0; index < allTanks.length; index++) {
      const element = allTanks[index];
      if (username == element.username) {
        return element;
      }
    }
  }
  destroyTank(username) {
    this.username = username;
    let tank = this.getCurrentTank(username);
    this.add
      .sprite(
        tank.currentTile.position.x,
        tank.currentTile.position.y,
        "explosion"
      )
      .play("explode");

    tank.sprite.setTexture("destroyedTank");
  }

  playAnimation(firedweapon) {
    this.firedweapon = firedweapon;
    if (this.firedweapon == "Flammenwerpfer") {
      // for (;;) {
      this.add
        .sprite(
          tank.currentTile.position.x,
          tank.currentTile.position.y,
          "flames"
        )
        .play("flames");
      // }
    } else if (this.firedweapon == "laser") {
      // DO THINGS
      // ...
    }
  }

  create() {
    this.background = this.add.image(1200 / 2, 800 / 2, "background");
    let scene = this;
    this.map.loaded.then(() => {
      scene.map.generateMap();

      scene.mqtt = new Mqtt(scene);
      //scoreboard

      this.player = new PlayerOverviewPanel(this, 1200, 50, null);
      this.player.addPlayer("jurne", "tankblue");
      this.player.addPlayer("fred", "tankgreen");
      this.player.addPlayer("jop", "tankred");
      this.player.addPlayer("test0", "tankblack");
      this.player.addPlayer("test1", "tankcyan");
      this.player.addPlayer("test2", "tankgrey");
      this.player.addPlayer("test3", "tankpurple");
      this.player.addPlayer("test4", "tankyellow");
      this.setupKeyBinds();

      for (let i = 0; i < 8; i++) {
        let y = i * 50 + 30;
        this.player.addData("200", "300", 50, y);
      }

      for (let i = 0; i < 8; i++) {
        let y = i * 50 + 30;
        this.player.addData("20", "30", 50, y);
      }

      //Timer
      // console.log(this);
      finalCountDown = this.add
        .text(600, 450, "", { fontSize: 300, font: "Arial", fill: "#D10000" })
        .setOrigin(0.5, 0.5);
      timedEvent = this.time.delayedCall(timerLength, scene.onEvent, [], this);

      finalCountDown.setStroke("#000000", 8);

      //Progress bar for timer
      this.newProgressBar = new ProgressBar(this, 20, 20, 500, 20, 0x008000);
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

    //Flames
    var flames = {
      key: "flames",
      frames: this.anims.generateFrameNumbers("flames", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }),
      frameRate: 5,
      repeat: 0
    };
    this.anims.create(flames);
  }

  update(delta) {
    //Timer update
    timeRemaining =
      timerLength -
      timedEvent
        .getElapsed()
        .toString()
        .substr(0, 5);
    this.newProgressBar.setProgress(0.015 * timeRemaining);
    if (timeRemaining < 0.66 * timerLength) {
      this.newProgressBar.setColor(0xff8c00);
      if (timeRemaining < 0.33 * timerLength) {
        this.newProgressBar.setColor(0xff0000);
        finalCountDown.setText(
          timerLength / 1000 -
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

    for (let i = 0; i < allTanks.length; i++) {
      const element = allTanks[i];
      if (element.username == dataInput.name) {
        element.setPosition(
          dataInput.tank.position.x,
          dataInput.tank.position.y,
          dataInput.tank.rotation
        );
      }
    }
  }
  setupKeyBinds() {
    this.key_Z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

    this.input.keyboard.on(
      "keyup_Z",
      function(event) {
        console.log();
        this.playAnimation(firedweapon);
      },
      this
    );
  }
}
