import Phaser from "phaser";
import HexMap from "../HexMap/HexMap";
import Mqtt from "../Mqtt/Mqtt";
import PlayerOverviewPanel from "../../js/game_objects/PlayerOverviewPanel";
import HealthOverviewPanel from "../../js/game_objects/HealthOverviewPanel";
import ProgressBar from "../ProgressBar/ProgressBar";
import Tank from "../Tank/Tank";

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
    this.turnlength = 5;
    this.timerTimeLeft = this.turnlength;
    this.turn = 0;
    this.previousDelta = 0;
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

    //addons
    this.load.image("adamantium", "assets/addons/adamantium.png");
    this.load.image("amphibious", "assets/addons/amphibious.png");
    this.load.image("empBomb", "assets/addons/empBomb.png");
    this.load.image("flammenwerpfer", "assets/addons/flammenwerpfer.png");
    this.load.image("gravyShield", "assets/addons/gravyShield.png");
    this.load.image("harrier", "assets/addons/harrier.png");
    this.load.image("laser", "assets/addons/laser.png");
    this.load.image("mines", "assets/addons/mines.png");
    this.load.image("nanobots", "assets/addons/nanobots.png");
    this.load.image("plasmagun", "assets/addons/plasmagun.png");
    this.load.image("ram", "assets/addons/ram.png");
    this.load.image("rocketEngine", "assets/addons/rocketEngine.png");
    this.load.image("structuralStrengthening", "assets/addons/structuralStrengthening.png");

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

  playAnimation(name) {
    // this.name = "Flammenwerpfer";
    this.name = name;
    if (this.name == "Flammenwerpfer") {
      this.add.sprite(400, 400, "flames").play("flames");
    }
    if (this.name == "laser") {
      // DO THINGS
      // ...
    }
  }
  // game = new Phaser.Game({
   // type: Phaser.AUTO,
    //width: 1000,
    //height: 1000,
    //scene: {
      //  create,
    //},
//});
  create() {
        // Create a circle
    // From: https://www.w3schools.com/tags/canvas_arc.asp
   // const circle = document.createElement('canvas');
    //const ctx = circle.getContext('2d');
    //ctx.beginPath();
    //ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    //ctx.stroke();

    // Draw the circle using Phaser 3
    //this.textures.addCanvas('circle', circle);
    //const circleImage = this.add.image(150, 200, 'circle');
    // this.background = this.add.image(1200 / 2, 800 / 2, "background");
    let scene = this;
    this.map.loaded.then(() => {
        scene.map.generateMap();

        scene.mqtt = new Mqtt(scene);
        //scoreboard

        var idsaver = {};

        let x = 1350;

        this.player = new PlayerOverviewPanel(this, 1200, 50, null);
        this.data = new HealthOverviewPanel(this, 1200, 55, null);
        this.player.addPlayer('jurne', 'tankblue', idsaver, 'adamantium', 'amphibious', 'empBomb');
        this.data.addData('200', '300', x, 'tankblue', idsaver);

        this.player.addPlayer('fred', 'tankgreen', idsaver, 'flammenwerpfer', 'gravyShield', 'harrier');
        this.data.addData('200', '300', x, 'tankgreen', idsaver);

        this.player.addPlayer('jop', 'tankred', idsaver, 'laser', 'mines', 'nanobots');
        this.data.addData('200', '300', x, 'tankred', idsaver);

        this.player.addPlayer('test0', 'tankblack' , idsaver, 'plasmagun', 'ram', 'rocketEngine');
        this.data.addData('200', '300', x, 'tankblack', idsaver);
        
        this.player.addPlayer('test1', 'tankcyan', idsaver, 'structuralStrengthening', 'harrier', 'mines');
        this.data.addData('200', '300', x, 'tankcyan', idsaver);

        this.player.addPlayer('test2', 'tankgrey', idsaver, 'laser', 'harrier', 'mines');
        this.data.addData('200', '30', x, 'tankgrey', idsaver);

        this.player.addPlayer('test3', 'tankpurple', idsaver, 'laser', 'harrier', 'mines');
        this.data.addData('200', '300', x, 'tankpurple', idsaver);

        this.player.addPlayer('test4', 'tankyellow', idsaver, 'laser', 'harrier', 'mines');
        this.data.addData('200', '300', x, 'tankyellow', idsaver);
        
        this.data.setHealth(idsaver, 'tankgreen', 20, 100);
        this.data.setHealth(idsaver, 'tankgreen', 30, 100);
        this.data.setHealth(idsaver, 'tankblue', 10, 100);
        //this.data.setHealth(idsaver, 'tankgreen', 20, 100);

        //Timer
        // console.log(this);
        finalCountDown = this.add
            .text(600, 450, "", { fontSize: 300, font: "Arial", fill: "#D10000" })
            .setOrigin(0.5, 0.5);
        timedEvent = this.time.delayedCall(timerLength, scene.onEvent, [], this);

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
    this.timerTimeLeft = this.timerTimeLeft - ((delta - this.previousDelta) / 1000);
    this.previousDelta = delta;


    
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
        this.playAnimation(name);
      },
      this
    );
  }
  resetAllTanks() {
    for (let i = 0; i < allTanks.length; i++) {
      const element = allTanks[i];
      element.destroy();
    }
    allTanks[null];
  }
  onNewRoundStarted(turn){
    console.log("a new turn has started");
    this.timerTimeLeft = this.turnlength;
    this.turn = turn;
  }
}

export default mainScreen;