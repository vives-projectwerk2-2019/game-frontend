import Phaser from "phaser";

class ProgressBar extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height, fillColor) {
        super(scene, x, y, width, height, fillColor);
        scene.add.existing(this);
        
        this.setOrigin(0, 0);
        this.initialWidth = width;
        this.progressPercentage = 100;
    }
    setProgress(percentage) {
        this.progressPercentage = percentage;
    }

    setColor(color) {
        this.fillColor = color;
    }

    preUpdate(time, delta) {
        let actualWidth = this.progressPercentage * this.initialWidth / 100;
        this.setSize(actualWidth, this.height);

    }
}

export default ProgressBar;
