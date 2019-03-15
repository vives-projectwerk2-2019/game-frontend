
class Editor extends Phaser.Scene {
    constructor() {
        super({key:"Editor"});
    }

    preload() {
        this.load.image('background', 'assets/background.jpg');
        this.load.image('selectSprite', 'assets/tanks/tankgreen.png');
        this.map = new HexMapEditor(this, 60, 40,35, "MapConfiguration.json");
    }

    init () {
        var canvas = this.sys.game.canvas;
    }

    create() {
        this.background = this.add.image(1200/2, 800/2, 'background');
        this.setupKeyBinds();
        let scene = this;
        this.map.loaded.then(function() {
            scene.map.generateEditor(1, 1, "selectSprite", 30);
            scene.map.assignCursorMovementBinds();
        });
    }

    update(delta) {
        if(this.key_1.isDown){
            this.scene.start("Main");
            count = [0, 0, 0, 0, 0, 0, 0, 0];
        }
    }

    setupKeyBinds() {
        this.key_Z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.key_Q = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_E = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        
    }
}