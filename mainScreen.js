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
var allTanks = [null];

//Timer
var text;
var timedEvent;
var timeRemaning;
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
<<<<<<< HEAD
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
        this.load.image("destroyedTank", "tank.png");
        this.map = new HexMap(this, 60, 40, 35, "MapConfiguration.json");
=======
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
    this.map = new HexMap(this, 60, 40, 35, "MapConfiguration.json");
>>>>>>> ba7c84cbca93446d422e7d37ab4c5e18618f490f

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
            "assets/animations/northwestbullet.png", { frameWidth: 32, frameHeight: 32, endFrame: 4 }
        );
        this.load.spritesheet(
            "southeastbullet",
            "assets/animations/southeastbullet.png", { frameWidth: 32, frameHeight: 32, endFrame: 4 }
        );
        this.load.spritesheet(
            "southwestbullet",
            "assets/animations/southwestbullet.png", { frameWidth: 32, frameHeight: 32, endFrame: 4 }
        );
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
            if (
                weapon == damageDealer.weapons.weaponName[i] &&
                damageDealer.addonUses[i] < 1
            ) {
                damageTaker.health =
                    damageTaker.health - damageDealer.weapons.weaponDamage[i];
                if (damageDealer.weapons.weaponName[i] != "gatling gun") {
                    damageDealer.addonUses[i]++;
                }
            }
            if (damageTaker.health <= 0) {
                console.log(damageTaker.username + " tank died");
                damageTaker.texture = null;
            }
        }
<<<<<<< HEAD
=======
      }
      if (damageTaker.health <= 0) {
        console.log(damageTaker.username + " tank died");
        damageTaker.sprite.setTexture("destroyedTank");
        //damageTaker = null;
      }
>>>>>>> ba7c84cbca93446d422e7d37ab4c5e18618f490f
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

<<<<<<< HEAD
            scene.tankblack = new Tank(
                scene.selectTankColor(),
                scene,
                scene.map,
                4,
                4,
                45,
                "black"
            );
            //scene.tankblack.setAddons();
            scene.tankblue = new Tank(
                scene.selectTankColor(),
                scene,
                scene.map,
                2,
                2,
                45,
                "blue"
            );
            scene.tankyeet = new Tank(
                scene.selectTankColor(),
                scene,
                scene.map,
                3,
                3,
                45,
                "yeet"
            );
            allTanks = [scene.tankblack, scene.tankblue, scene.tankyeet];
            console.log(allTanks);
            scene.mqtt = new Mqtt(scene);
            //scoreboard
            scene.nameText = scene.add.text(10, 10, "Name: test", {
                font: "16px Arial",
                fill: "#000000"
            });
            scene.scoreText = scene.add.text(10, 48, "Score: 0", {
                font: "16px Arial",
                fill: "#000000"
            });
            scene.hitpointsText = scene.add.text(
                10,
                86,
                "Hitpoints: " + scene.tankblue.health, {
                    font: "16px Arial",
                    fill: "#000000"
                }
            );

            //Timer
            console.log(this);
            text = this.add.text(600, 32, "", { font: "24px Arial", fill: "#000000" }).setOrigin(0.5, 0.5);
            timedEvent = this.time.delayedCall(15000, scene.onEvent, [], this);
        });
=======
      scene.tankblack = new Tank(
        scene.selectTankColor(),
        scene,
        scene.map,
        4,
        4,
        45,
        "black"
      );
      //scene.tankblack.setAddons();
      scene.tankblue = new Tank(
        scene.selectTankColor(),
        scene,
        scene.map,
        2,
        2,
        45,
        "blue"
      );
      scene.tankyeet = new Tank(
        scene.selectTankColor(),
        scene,
        scene.map,
        3,
        3,
        45,
        "yeet"
      );
      allTanks = [scene.tankblack, scene.tankblue, scene.tankyeet];
      //console.log(allTanks);
      scene.mqtt = new Mqtt(scene);
      //scoreboard

      //Timer
      //console.log(this);
      text = this.add
        .text(600, 32, "", { font: "16px Arial", fill: "#000000" })
        .setOrigin(0.5, 0.5);
      timedEvent = this.time.delayedCall(3000, scene.onEvent, [], this);
    });
>>>>>>> ba7c84cbca93446d422e7d37ab4c5e18618f490f

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
        timeRemaning = 15 - timedEvent.getElapsedSeconds().toString().substr(0, 2);
        text.setText("Round ends in " + timeRemaning);
    }

    onEvent() {
        console.log("Timer has ended");
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
        let receivedMessage = {
            Player: {
                username: "",
                movement: "forward",
                dev_id: "",
                action: 0,
                joined: true
            },
            Controller: { addons: ["gatling gun", null, null], dev_id: "" }
        };
        var dataInput = receivedMessage;
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
                this.dealDamage(this.tankblack, "gatling gun", allTanks);
                this.hitpointsText = this.add.text(
                    10,
                    146,
                    "Hitpoints: " + this.tankblue.health, {
                        font: "16px Arial",
                        fill: "#000000"
                    }
                );
            },
            this
        );
        this.input.keyboard.on(
            "keyup_R",
            function(event) {
                this.tankblue.printHealth();
            },
            this
        );
        this.input.keyboard.on(
            "keyup_T",
            function(event) {
                this.tankblue.setAddons(dataInput);
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

        // controls tankblue
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
                //console.log("A");

                break;
            case "B":
                //console.log("B");

                break;
            case "X":
                //console.log("X");

                break;
            case "Y":
                //console.log("Y");

                break;
            default:
                //console.log("no key pressed");
                break;
        }
    }
}