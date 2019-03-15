
class Main extends Phaser.Scene {
    constructor() {
        super({key:"Main"});
    }

    preload() {
        this.load.image('tankblack','assets/tankblack.png');
        this.load.image('tankblue','assets/tankblue.png');
        this.load.image('tankcyan','assets/tankcyan.png');
        this.load.image('tankgreen','assets/tankgreen.png');
        this.load.image('tankgrey','assets/tankgrey.png');
        this.load.image('tankpurple','assets/tankpurple.png');
        this.load.image('tankred','assets/tankred.png');
        this.load.image('tankyellow','assets/tankyellow.png');
        this.load.image('background', 'assets/background.jpg');
        this.map = new HexMap(this, 60, 40,35, "MapConfiguration.json");
    }

    init () {
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
        this.background = this.add.image(1200/2, 800/2, 'background');
        let scene = this;
        this.map.loaded.then( function(){
                scene.map.generateMap();
                //this.setupFullScreen(this.background);

                scene.tankblack = new Tank('tankblack', scene, scene.map, 1, 1, 45);
                scene.tankblue = new Tank('tankblue', scene, scene.map, 2, 2, 45);
            } 
        );
    }

    update(delta) {
        if(this.key_1.isDown){
            this.scene.start("Editor");
        }
    }

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
        this.key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);

        //controls tankblue
        this.input.keyboard.on('keyup_Z', function(event){
            this.tankblack.forward();
        },this);
        this.input.keyboard.on('keyup_S', function(event){
            this.tankblack.backward();
        },this);
        this.input.keyboard.on('keyup_Q', function(event){
            this.tankblack.turnLeft();
        },this);
        this.input.keyboard.on('keyup_D', function(event){
            this.tankblack.turnRight();
        },this);

        //controls tankblue
        this.input.keyboard.on('keyup_O', function(event){
            this.tankblue.forward();
        },this);
        this.input.keyboard.on('keyup_L', function(event){
            this.tankblue.backward();
        },this);
        this.input.keyboard.on('keyup_K', function(event){
            this.tankblue.turnLeft();
        },this);
        this.input.keyboard.on('keyup_M', function(event){
            this.tankblue.turnRight();
        },this);
    }
}