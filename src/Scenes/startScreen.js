import Phaser from "phaser";

class startScreen extends Phaser.Scene {
    constructor() {
        super({ key: "startScreen" });
    }

    preload() { //where assets are loaded
        this.load.image('background', '/assets/background.jpg');
    }

    create() {
        this.key_2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.key_3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.input.on('pointerdown', () => this.scene.start("loadScreen"));

        const clickButton = this.add.text(500, 400, "Press spacebar to start the game", { font: "72px Impact" })
    }

    update(delta) {
        if (this.key_2.isDown) {
            this.scene.start("mainScreen");
        } else if (this.key_3.isDown) {
            this.scene.start("loadScreen");
            //this.scene.start("mainScreen");
        }
    }

    
}

export default startScreen;