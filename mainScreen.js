count = [0, 0, 0, 0, 0, 0, 0, 0];
spawnTilesOccupiedX = [0, 0, 0, 0, 0, 0, 0, 0];
spawnTilesOccupiedY = [0, 0, 0, 0, 0, 0, 0, 0];
var spawnTiles = [];
tankValues = 0;
var colors = [
  "tankblack",
  "tankblue",
  "tankcyan",
  "tankgreen",
  "tankgrey",
  "tankpurple",
  "tankred",
  "tankyellow"
];
var allTanks = [null];

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
  CreateTank(receivedMessage) {
    this.dataInput = receivedMessage;

    if (!this.dataInput.Player.joined) {
      let tankName = this.dataInput.Player.username + tankValues;
      this.tankName = new Tank(
        this.selectTankColor(),
        this,
        this.map,
        this.spawnTileX(),
        this.spawnTileY(),
        45,
        tankName
      );
      tankValues++;
      allTanks.push(this.tankName);
      console.log(allTanks);
    }
  }

  selectTankColor() {
    for (let i = 0; i < 8; i++) {
      const element = count[i];
      if (element == 0) {
        count[i]++;
        return colors[i];
      }
    }
  }

  setSpawnTiles() {
    for (let x = 0; x < this.map.jsonMap.length; x++) {
      const element = this.map.jsonMap[x];
      for (let y = 0; y < element.length; y++) {
        const tileValue = element[y];
        if (tileValue == 4) {
          spawnTiles.push([x, y]);
        }
      }
    }
  }
  spawnTileX() {
    //console.log(spawnTiles);
    for (let i = 0; i < spawnTiles.length; i++) {
      const element = spawnTiles[i];
      if (!spawnTilesOccupiedX[i]) {
        spawnTilesOccupiedX[i]++;
        //console.log(element);
        return element[0];
      }
    }
  }
  spawnTileY() {
    for (let i = 0; i < spawnTiles.length; i++) {
      const element = spawnTiles[i];
      if (!spawnTilesOccupiedY[i]) {
        spawnTilesOccupiedY[i]++;
        //console.log(element);
        return element[1];
      }
    }
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
    this.load.spritesheet("eastbullet", "assets/animations/eastbullet.png", {
      frameWidth: 32,
      frameHeight: 32,
      endFrame: 4
    });
    this.load.spritesheet("westbullet", "assets/animations/westbullet.png", {
      frameWidth: 32,
      frameHeight: 32,
      endFrame: 4
    });
    // this.load.spritesheet(
    //   "northeastbullet",
    //   "assets/animations/northeastbullet.png",
    //   { frameWidth: 32, frameHeight: 32, endFrame: 4 }
    // );
    this.load.spritesheet(
      "northwestbullet",
      "assets/animations/northwestbullet.png",
      { frameWidth: 32, frameHeight: 32, endFrame: 4 }
    );
    this.load.spritesheet(
      "southeastbullet",
      "assets/animations/southeastbullet.png",
      { frameWidth: 32, frameHeight: 32, endFrame: 4 }
    );
    this.load.spritesheet(
      "southwestbullet",
      "assets/animations/southwestbullet.png",
      { frameWidth: 32, frameHeight: 32, endFrame: 4 }
    );
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

  create() {
    this.setupKeyBinds();
    this.background = this.add.image(1200 / 2, 800 / 2, "background");
    let scene = this;
    this.map.loaded.then(() => {
      scene.map.generateMap();
      //this.setupFullScreen(this.background);
      this.setSpawnTiles();
      scene.tankblack = new Tank(
        scene.selectTankColor(),
        scene,
        scene.map,
        this.spawnTileX(),
        this.spawnTileY(),
        45,
        "black"
      );
      //scene.tankblack.setAddons();
      scene.tankblue = new Tank(
        scene.selectTankColor(),
        scene,
        scene.map,
        this.spawnTileX(),
        this.spawnTileY(),
        45,
        "blue"
      );

      allTanks = [scene.tankblack, scene.tankblue];
      console.log(scene);
      scene.mqtt = new Mqtt(scene);
      //scoreboard

      //Timer
      console.log(this);
      text = this.add.text(100, 37, "", { fontSize: 24, font: "Arial", fill: "#FFFFFF" }).setOrigin(0.5, 0.5);
      finalCountDown = this.add.text(600, 350, "", { fontSize: 72, font: "Arial", fill: "#D10000" }).setOrigin(0.5, 0.5);
      timedEvent = this.time.delayedCall(15000, scene.onEvent, [], this);

      text.setStroke('#000000', 8)
      finalCountDown.setStroke('#000000', 8)

      //Progress bar for timer
      rect = new Phaser.Geom.Rectangle(200, 37, 500, 20);
      graphics = this.add.graphics();
      graphics.fillRectShape(rect);
      graphics.fillStyle(0x000000)
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
    if (this.key_1.isDown) {
      this.scene.start("Editor");
    }
    //Timer update
    timeRemaining = 15 - timedEvent.getElapsedSeconds().toString().substr(0, 2);
    text.setText("Time left: ");
    if (timeRemaining <= 5) {
      finalCountDown.setText(timeRemaining)
      if (timeRemaining == 0) {
        finalCountDown.setText(" ")
      }
    }

    //Progress bar for timer
    graphics.clear()
    graphics.fillStyle(0xFFFFFF, 0.7)
    graphics.fillRect(175, 29, (window.innerWidth / 25) * timeRemaining, 18);
  }
  //Empty onEvent for Length
  onEvent() {
    console.log("Timer has ended");
  }

  setupFullScreen(object) {
    var fullscreenFunc = null; //function for fullscreen

    document.querySelector("#play").addEventListener("click", function () {
      if (fullscreenFunc !== null) fullscreenFunc();
    });

    object.setInteractive();

    object.on(
      "pointerover",
      function () {
        var canvas = this.sys.game.canvas;
        var fullscreen = this.sys.game.device.fullscreen;
        fullscreenFunc = function () {
          canvas[fullscreen.request]();
        };
      },
      this
    );
  }

  setupKeyBinds() {
    let receivedMessage = {
      Player: {
        username: "yeet",
        movement: "forward",
        dev_id: "",
        action: 0,
        joined: true
      },
      Controller: {
        addons: ["laser", "nanobots", "structuralStrengthening"],
        dev_id: ""
      }
    };
    this.dataInput = receivedMessage;
    this.key_Z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.key_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);

    //test damage tanks
    this.input.keyboard.on(
      "keyup_E",
      function (event) {
        this.dealDamage(this.tankblack, "gatling gun", allTanks);
      },
      this
    );
    this.input.keyboard.on(
      "keyup_R",
      function (event) {
        let tankName = this.dataInput.Player.username + tankValues;
        this.tankName = new Tank(
          this.selectTankColor(),
          this,
          this.map,
          this.spawnTileX(),
          this.spawnTileY(),
          45,
          tankName
        );
        tankValues++;

        allTanks.push(this.tankName);
        //console.log(allTanks);
      },
      this
    );
    this.input.keyboard.on(
      "keyup_T",
      function (event) {
        this.tankblack.setAddons(this.dataInput);
      },
      this
    );
    this.input.keyboard.on(
      "keyup_Y",
      function (event) {
        i = 1;
        this.addon(i);
      },
      this
    );
    this.input.keyboard.on(
      "keyup_U",
      function (event) {
        i = 2;
        this.addon(i);
      },
      this
    );
    this.input.keyboard.on(
      "keyup_I",
      function (event) {
        i = 3;
        this.addon(i);
      },
      this
    );
    //controls tankblue
    this.input.keyboard.on(
      "keyup_Z",
      function (event) {
        this.tankblack.forward();
      },
      this
    );
    this.input.keyboard.on(
      "keyup_S",
      function (event) {
        this.tankblack.backward();
      },
      this
    );
    this.input.keyboard.on(
      "keyup_Q",
      function (event) {
        this.tankblack.turnLeft();
      },
      this
    );
    this.input.keyboard.on(
      "keyup_D",
      function (event) {
        this.tankblack.turnRight();
      },
      this
    );
    // controls tankblue
    this.input.keyboard.on(
      "keyup_O",
      function (event) {
        if (this.tankblue.isAlive) {
          this.tankblue.forward();
        }
      },
      this
    );
    this.input.keyboard.on(
      "keyup_L",
      function (event) {
        if (this.tankblue.isAlive) {
          this.tankblue.backward();
        }
      },
      this
    );
    this.input.keyboard.on(
      "keyup_K",
      function (event) {
        if (this.tankblue.isAlive) {
          this.tankblue.turnLeft();
        }
      },
      this
    );
    this.input.keyboard.on(
      "keyup_M",
      function (event) {
        if (this.tankblue.isAlive) {
          this.tankblue.turnRight();
        }
      },
      this
    );
  }

  addon(i) {
    this.i = i;
    this.addonList = this.tankblack.addons;
    var firedWeapon = "";
    firedWeapon = this.tankblack.useAddon(this.addonList[i], i);
    //console.log(firedWeapon);
    if (firedWeapon != null) {
      this.dealDamage(this.tankblack, firedWeapon, allTanks);
    }
    this.tankblack.addonUses[i]++;
  }
  moveTank(receivedMessage) {
    var dataInput = receivedMessage;

    //console.log(this);
    switch (dataInput.Player.movement) {
      case "left":
        //console.log("move left");
        this.tankblack.turnLeft();
        break;
      case "right":
        //console.log("move right");
        this.tankblack.turnRight();
        break;
      case "forward":
        //console.log("move forward");
        this.tankblack.forward();
        break;
      case "backward":
        //console.log("move backward");
        this.tankblack.backward();
        break;
      default:
        //console.log("idle");
        break;
    }
  }
  tankAction(receivedMessage) {
    var dataInput = receivedMessage;

    switch (dataInput.Player.action) {
      case "A":
        this.dealDamage(this.tankblack, "gatling gun", allTanks);
        break;
      case "B":
        i = 1;
        this.addonList = this.dataInput.Controller.addons;
        this.tankblack.useAddon(this.addonList[i], i);
        this.tankblack.addonUses[i]++;
        break;
      case "X":
        i = 2;
        this.addonList = this.dataInput.Controller.addons;
        this.tankblack.useAddon(this.addonList[i], i);
        this.tankblack.addonUses[i]++;
        break;
      case "Y":
        i = 3;
        this.addonList = this.dataInput.Controller.addons;
        this.tankblack.useAddon(this.addonList[i], i);
        this.tankblack.addonUses[i]++;
        break;
      default:
        //console.log("no key pressed");
        break;
    }
  }
  dealDamage(damageDealer, firedWeapon, allTanks) {
    this.firedWeapon = firedWeapon;
    this.allTanks = allTanks;

    for (let index = 0; index < allTanks.length; index++) {
      var damageTaker = allTanks[index];
      switch (damageDealer.currentRotation) {
        case 1:
          if (
            damageDealer.currentTile.cubePosition.y ==
            damageTaker.currentTile.cubePosition.y &&
            damageDealer.currentTile.cubePosition.x <
            damageTaker.currentTile.cubePosition.x &&
            damageDealer.currentTile.cubePosition.x +
            damageDealer.weapons.weaponRange[0] + 1 >
            damageTaker.currentTile.cubePosition.x

          ) {
            this.takeDamage(damageDealer, firedWeapon, damageTaker);
          }
          break;
        case 2:
          if (
            damageDealer.currentTile.cubePosition.z ==
            damageTaker.currentTile.cubePosition.z &&
            damageDealer.currentTile.cubePosition.x <
            damageTaker.currentTile.cubePosition.x &&
            damageDealer.currentTile.cubePosition.x +
            damageDealer.weapons.weaponRange[0] + 1 >
            damageTaker.currentTile.cubePosition.x
          ) {
            this.takeDamage(damageDealer, firedWeapon, damageTaker);
          }
          break;
        case 3:
          if (
            damageDealer.currentTile.cubePosition.x ==
            damageTaker.currentTile.cubePosition.x &&
            damageDealer.currentTile.cubePosition.y >
            damageTaker.currentTile.cubePosition.y &&
            damageDealer.currentTile.cubePosition.y +
            damageDealer.weapons.weaponRange[0] + 1 <
            damageTaker.currentTile.cubePosition.y
          ) {
            this.takeDamage(damageDealer, firedWeapon, damageTaker);
          }
          break;
        case 4:
          if (
            damageDealer.currentTile.cubePosition.y ==
            damageTaker.currentTile.cubePosition.y &&
            damageDealer.currentTile.cubePosition.x >
            damageTaker.currentTile.cubePosition.x &&
            damageDealer.currentTile.cubePosition.x +
            damageDealer.weapons.weaponRange[0] + 1 <
            damageTaker.currentTile.cubePosition.x
          ) {
            this.takeDamage(damageDealer, firedWeapon, damageTaker);
          }
          break;
        case 5:
          if (
            damageDealer.currentTile.cubePosition.z ==
            damageTaker.currentTile.cubePosition.z &&
            damageDealer.currentTile.cubePosition.x >
            damageTaker.currentTile.cubePosition.x &&
            damageDealer.currentTile.cubePosition.x +
            damageDealer.weapons.weaponRange[0] + 1 <
            damageTaker.currentTile.cubePosition.x
          ) {
            this.takeDamage(damageDealer, firedWeapon, damageTaker);
          }
          break;
        case 6:
          if (
            damageDealer.currentTile.cubePosition.x ==
            damageTaker.currentTile.cubePosition.x &&
            damageDealer.currentTile.cubePosition.y <
            damageTaker.currentTile.cubePosition.y &&
            damageDealer.currentTile.cubePosition.y +
            damageDealer.weapons.weaponRange[0] + 1 >
            damageTaker.currentTile.cubePosition.y
          ) {
            this.takeDamage(damageDealer, firedWeapon, damageTaker);
          }
          break;

        default:
          console.log(
            "unknown rotation value: " + damageDealer.currentRotation
          );
          break;
      }
    }
  }
  takeDamage(damageDealer, firedWeapon, damageTaker) {
    var weapon = firedWeapon;
    this.damageTaker = damageTaker;

    for (let i = 0; i < damageDealer.weapons.weaponName.length; i++) {
      console.log(damageDealer.addonUses[0]);
      if (
        weapon == damageDealer.weapons.weaponName[i] &&
        damageDealer.addonUses[i] < 1
      ) {
        console.log("yeeet");

        damageTaker.health =
          damageTaker.health - damageDealer.weapons.weaponDamage[i];
        if (damageDealer.weapons.weaponName[i] != "gatling gun") {
          damageDealer.addonUses[i]++;
        }
      }
      if (damageTaker.health <= 0) {
        console.log(damageTaker.username + " tank died");

        if (damageTaker.isAlive) {
          this.add
            .sprite(
              damageTaker.currentTile.position.x,
              damageTaker.currentTile.position.y,
              "explosion"
            )
            .play("explode");
        }
        damageTaker.sprite.setTexture("destroyedTank");
        damageTaker.isAlive = false;
        damageTaker = null;
      }
    }
  }
}
