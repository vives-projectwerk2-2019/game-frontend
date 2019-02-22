/*jshint esversion: 6 */

class main extends Phaser.Scene {
    constructor() {
        super({key:"main"});
    }

    preload() {
        this.load.image('tank','assets/tank.png');
        this.load.image('tile','assets/Tiles/tileAutumn_tile.png');
        this.load.image('selectedTile','assets/Tiles/tileDirt_tile.png');
        this.load.image('background', 'assets/background.jpg');
    }

    init () {
        var canvas = this.sys.game.canvas;
        var fullscreen = this.sys.game.device.fullscreen;

        if (!fullscreen.available)
        {
            return;
        }

        //canvas[fullscreen.request]();
    }

    create() {
        this.setupKeyBinds();
        this.background = this.add.image(1200/2, 800/2, 'background');

        this.setupFullScreen(this.background);

        this.map = new HexMap('tile', 'selectedTile', this, 5, 5, 180, 40,35);
        this.tank = new Tank('tank', this, this.map, 4, 4, 60);
        this.map.selectTile(4,4);
    }

/*     update(delta){
        if(this.key_Z.isDown){
            this.tank.forward();
        }
        if(this.key_S.isDown){
            this.tank.backward();
        }
        if(this.key_Q.isDown){
            this.tank.turnLeft();
        }
        if(this.key_D.isDown){
            this.tank.turnRight();
        }
    } */

    setupFullScreen (object){
        var fullscreenFunc = null;  //function for fullscreen
        
        document.querySelector('#play').addEventListener('click', function() {
            if(fullscreenFunc !== null) fullscreenFunc();
        });

        object.setInteractive();

        object.on('pointerover', function() {
            var canvas = this.sys.game.canvas;
            var fullscreen = this.sys.game.device.fullscreen;
            fullscreenFunc = function() {
                canvas[fullscreen.request]();
            };
        }, this);
    }

    setupKeyBinds() {
        this.key_Z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.key_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.input.keyboard.on('keyup_Z', function(event){
            this.tank.forward();
        },this);
        this.input.keyboard.on('keyup_S', function(event){
            this.tank.backward();
        },this);
        this.input.keyboard.on('keyup_Q', function(event){
            this.tank.turnLeft();
        },this);
        this.input.keyboard.on('keyup_D', function(event){
            this.tank.turnRight();
        },this);
    }
}