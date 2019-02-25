class startScreen extends Phaser.Scene {
    constructor() {
        super({key:"startScreen"});
    }

    preload() { //where assets are loaded
    }

    create(){
        this.key_2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.text1 = this.add.text(0,0,"Welcome to scene 1, press 2 to go to scene 2 and 3 to go to scene 3", { font:"12px Impact"});
    }

    update(delta) {
        if(this.key_2.isDown){
            this.scene.start("main");
        }
    }
}