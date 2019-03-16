count = [0, 0, 0, 0, 0, 0, 0, 0];
test = [0];
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
class Main extends Phaser.Scene {
  constructor() {
    super({ key: "main" });
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
    this.map = new HexMap(this, 60, 40, 35, "MapConfiguration.json");

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

  dealDamage(damageDealer, firedWeapon, damageTaker) {
    var weapon = firedWeapon;
    if (true) {
      // tank is in weapon range
      for (let i = 0; i < damageDealer.weapons.weaponName.length; i++) {
        if (
          weapon === damageDealer.weapons.weaponName[i] &&
          damageDealer.addonUses[i] < 1
        ) {
          damageTaker.health =
            damageTaker.health - damageDealer.weapons.weaponDamage[i];
          damageDealer.addonUses[i]++;
        }
      }
    }
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
    this.map.loaded.then(function() {
      scene.map.generateMap();
      //this.setupFullScreen(this.background);

      scene.tankblack = new Tank(
        scene.selectTankColor(),
        scene,
        scene.map,
        4,
        4,
        45
      );
      //scene.tankblack.setAddons();
      scene.tankblue = new Tank(
        scene.selectTankColor(),
        scene,
        scene.map,
        2,
        2,
        45
      );
      scene.tankyeet = new Tank(
        scene.selectTankColor(),
        scene,
        scene.map,
        3,
        3,
        45
      );
      //scoreboard
      scene.nameText = scene.add.text(10, 10, "Name: test", {
        font: "16px Arial",
        fill: "#000000"
      });
      scene.scoreText = scene.add.text(10, 48, "Score: 0", {
        font: "16px Arial",
        fill: "#000000"
      });
      scene.hitpointsText = scene.add.text(10, 86, "Hitpoints: " + scene.tankblue.health, {
        font: "16px Arial",
        fill: "#000000"
      });
    });


    //explosion
    var explosion = {
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion", {
        frames: [0, 1, 2, 3, 4]
      }),
      frameRate: 5,
      repeat: -1
    };
    this.anims.create(explosion);
  
  }

  update(delta) {
    if (this.key_1.isDown) {
      this.scene.start("Editor");
    }
  }

  setupFullScreen(object) {
    var fullscreenFunc = null; //function for fullscreen

    document.querySelector("#play").addEventListener("click", function() {
      if (fullscreenFunc !== null) fullscreenFunc();
    });

    object.setInteractive();

    object.on(
      "pointerover",
      function() {
        var canvas = this.sys.game.canvas;
        var fullscreen = this.sys.game.device.fullscreen;
        fullscreenFunc = function() {
          canvas[fullscreen.request]();
        };
      },
      this
    );
  }

  setupKeyBinds() {
    this.key_Z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.key_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);

    
    
    
    //activation key explosion
    this.input.keyboard.on(
      "keyup_P",
      function(event) {
        this.add.sprite(300, 300, "explosion").play("explode");
      },
      this
    );
    //test damage tanks
    this.input.keyboard.on(
      "keyup_E",
      function(event) {
        this.dealDamage(this.tankblack, "gatling gun", this.tankblue);
        this.hitpointsText = this.add.text(
          10,
          146,
          "Hitpoints: " + this.tankblue.health,
          {
            font: "16px Arial",
            fill: "#000000"
          }
        );
      },
      this
    );
    

    //controls tankblue
    this.input.keyboard.on(
      "keyup_Z",
      function(event) {
        this.tankblack.forward();
      },
      this
    );
    this.input.keyboard.on(
      "keyup_S",
      function(event) {
        this.tankblack.backward();
      },
      this
    );
    this.input.keyboard.on(
      "keyup_Q",
      function(event) {
        this.tankblack.turnLeft();
      },
      this
    );
    this.input.keyboard.on(
      "keyup_D",
      function(event) {
        this.tankblack.turnRight();
      },
      this
    );

    //controls tankblue
    this.input.keyboard.on(
      "keyup_O",
      function(event) {
        this.tankblue.forward();
      },
      this
    );
    this.input.keyboard.on(
      "keyup_L",
      function(event) {
        this.tankblue.backward();
      },
      this
    );
    this.input.keyboard.on(
      "keyup_K",
      function(event) {
        this.tankblue.turnLeft();
      },
      this
    );
    this.input.keyboard.on(
      "keyup_M",
      function(event) {
        this.tankblue.turnRight();
      },
      this
    );
  }
  moveTank(receivedMessage) {
    var dataInput = receivedMessage;

    console.log(this);
    switch (dataInput.Player.movement) {
      case "left":
        console.log("move left");
        this.tankblack.turnLeft();
        
        break;
      case "right":
        console.log("move right");
        //this.tankblack.turnRight();
        break;
      case "forward":
        console.log("move forward");
        //this.tankblack.forward();
        break;
      case "backward":
        console.log("move backward");
        //this.tankblack.backward();
        break;
      default:
        console.log("idle");
        break;
    }
  }
  tankAction(receivedMessage) {
    var dataInput = receivedMessage;
    
    switch (dataInput.Player.action) {
      case "A":
        console.log("A");

        break;
      case "B":
        console.log("B");

        break;
      case "X":
        console.log("X");

        break;
      case "Y":
        console.log("Y");

        break;
      default:
        console.log("no key pressed");
        break;
    }
  }
}
