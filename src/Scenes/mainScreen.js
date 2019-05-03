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
var timerLength = 10000; // (in ms)
var timeRemaining;
var rect;
var graphics;
let allTanks = [];
var idsaver = [];
let x = 1350;
let tanksStats = [];

class mainScreen extends Phaser.Scene {
  constructor() {
    super({ key: "mainScreen" });
    this.timeMultiplier = 1; //how many times 15seconds?
    this.turnlength = 10*this.timeMultiplier;
    this.multiplier = 10/this.timeMultiplier;
    this.timerTimeLeft = this.turnlength;
    this.turn = 0;
    this.previousDelta = 0;
    this.arrayPlayers = [];
    this.hasdied = [0];
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
    this.load.image(
      "structuralStrengthening",
      "assets/addons/structuralStrengthening.png"
    );

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
    var damagedealer = "damagedealer";
    var damagetaker = "damagetaker";
    if (this.firedweapon == "Flammenwerpfer") {
      this.add
        .sprite(
          tank.currentTile.position.x,
          tank.currentTile.position.y,
          "flames"
        )
        .play("flames");
    } else if (this.firedweapon == "laser") {
      // DO THINGS
      // ...
    }
  }
  create() {
    let scene = this;
    this.map.loaded.then(() => {
      scene.map.generateMap();

      scene.mqtt = new Mqtt(scene);
      this.mqtt.onUpdate = (message) => {
        console.log("MQTT update: ", message);
        // if (receivedMessage.commands.reset) {
          //   mqtt.scene.resetAllTanks();
          // }
        const players = message.players;
        if (message.turn) {
          this.onNewRoundStarted(message.turn);
        }
        players.forEach((player) => {
          if (!this.arrayPlayers.includes(player.name)) {
            this.arrayPlayers.push(player.name);
            this.createTankSprite(player);
          } else {
            this.setTankPosition(player);
          }
          if (player.tank.health <= 0 && !this.hasdied[i]) {
            this.destroyTank(player.name);
            this.hasdied[i] = 1;
          }
        });
      }
      //scoreboard


        this.player = new PlayerOverviewPanel(this, 1200, 50, null);
        this.data = new HealthOverviewPanel(this, 1200, 55, null);
        this.mqtt.setTankStatss = (message) => {
          console.log("settanksstats");
          console.log(message);
          this.setTankStats(message);
        }
        //this.setTankStats(dataInput);

        /*this.setTankStats(dataInput);
        for(i=0; i<=dataInput.players.length; i++){
          this.player.addPlayer(tanksStats[i][0], tanksStats[i][2], idsaver, tanksStats[i][3], tanksStats[i][4], tanksStats[i][5]); // naam, tank, id
          this.data.addData(tanksStats[i][1], 'shield', x, tanksStats[i][2], idsaver);
        }
        
        
        this.player.addPlayer('jurne', 'tankblue', idsaver, 'adamantium', 'empBomb', null);
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
        //this.data.setHealth(idsaver, 'tankgreen', 20, 100);*/
        
      //Timer
      // console.log(this);
      finalCountDown = this.add
        .text(600, 450, "", {
          fontSize: "300px",
          fontFamily: "Arial",
          fill: "#D10000"
        })
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
    this.timerTimeLeft =
      this.timerTimeLeft - (delta - this.previousDelta) / 1000;
    this.previousDelta = delta;

    //Timer update
    timeRemaining =
      timerLength -
      timedEvent
        .getElapsed()
        .toString()
        .substr(0, 5);
    this.newProgressBar.setProgress(this.multiplier * this.timerTimeLeft);
      this.newProgressBar.setColor(0x008000);
      if (this.timerTimeLeft < 0.66 * this.turnlength) {
        this.newProgressBar.setColor(0xff8c00);
        if (this.timerTimeLeft < 0.33 * this.turnlength) {
          this.newProgressBar.setColor(0xff0000);
          finalCountDown.setText(
            this.timerTimeLeft.toString().substr(0, 4)
          );
          if (this.timerTimeLeft < 0.00 * this.turnlength) {
            finalCountDown.setText(" ");
            this.newProgressBar.setProgress(0);
          }
        }
      }
    
  }

  //Empty onEvent for Length
  onEvent() {
    console.log("Timer has ended");
  }

  setTankPosition(player) {
    for (let i = 0; i < allTanks.length; i++) {
      const element = allTanks[i];
      if (element.username == player.name) {
        element.setPosition(
          player.tank.position.x,
          player.tank.position.y,
          player.tank.rotation
        );
      }
    }
  }
  setTankRotation(x,y,rotation,username){
     const element = this.getCurrentTank(username);
     element.setPosition(x,y,rotation)
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
  resetAllTanks() {
    for (let i = 0; i < allTanks.length; i++) {
      const element = allTanks[i];
      element.destroy();
    }
    allTanks[null];
  }
  onNewRoundStarted(turn) {
    console.log("a new turn has started");
    this.timerTimeLeft = this.turnlength;
    this.turn = turn;
  }

  /*setTankStats(dataInput){
    for(let i=0; i < dataInput.players.length; i++){
      let element = dataInput.players[i];
      let username = element.name;
      let health = element.health;
      //let shield = element.shield;  moet nog komen
      let color = element.color;
      let addon = element.addonName;
      let addon1 = addon[0];
      let addon2 = addon[1];
      let addon3 = addon[2];      
      tanksStats.push([username, health, color, addon1, addon2, addon3]);
    }
  }*/

  setTankStats(dataInput){
    for(let i=0; i < dataInput.players.length; i++){
        let element = dataInput.players[i];
        let username = element.name;
        let health = element.tank.health;
        //let shield = element.shield;  moet nog komen
        let color = element.tank.color;
        let addon = element.tank.addons.addonName;
        let addon1 = addon[1];
        let addon2 = addon[2];
        let addon3 = addon[3];
        
        tanksStats[i] = ([username, health, color, addon1, addon2, addon3]);
    }
    for(let i=0; i< dataInput.players.length; i++){
      let controle = 0;
      let extracontrole = 0;
      for (let y=0; y<8; y++){
          if(idsaver[y] == tanksStats[i][2]){
              //console.log("update data");
              //this.data.setHealth(idsaver, tanksStats[i][2], tanksStats[i][1], 100);
              extracontrole = 1;
          }
          else {
              //console.log("add new tank");
              controle = 1;
          }
      }
      if (controle == 1){
          if(extracontrole == 0){
              idsaver[i] = tanksStats[i][2];
              console.log(idsaver[i]);
              this.player.addPlayer(tanksStats[i][0], tanksStats[i][2], idsaver, tanksStats[i][3], tanksStats[i][4], tanksStats[i][5]);
              this.data.addData(tanksStats[i][1], '300', x, tanksStats[i][2], idsaver);
              this.data.setHealth(idsaver, tanksStats[i][2], tanksStats[i][1], 20);
              //console.log("update data 1")
          } else {
              //console.log("update data 2");
              this.data.setHealth(idsaver, tanksStats[i][2], tanksStats[i][1], 20);
          }
      }
    }

  }
}

export default mainScreen;
