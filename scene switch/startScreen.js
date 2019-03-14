class startScreen extends Phaser.Scene {
    constructor() {
        super({key:"startScreen"});
    }

    preload() { //where assets are loaded
    }

    create(){
        this.key_2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.text1 = this.add.text(2,2,"Press 2 to start the game", { font:"36px Impact"});
    }

    update(delta) {
        if(this.key_2.isDown){
            this.scene.start("main");
        }
    }
}