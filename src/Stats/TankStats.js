import Phaser from "phaser";
import ProgressBar from "../../src/ProgressBar/ProgressBar";

class TankStats extends Phaser.GameObjects.Container{

    constructor(scene, x, y, children = null) {
        super(scene, x, y, children);
        scene.add.existing(this);
        this.setSize(370, 100);

        this.name = scene.add.text(0, 0, "",
            { fontSize: '80px', fontFamily: 'Courier', fill: '#fdf6e3'}
        ).setOrigin(0, 0);
        this.name.setFontSize(30);

        this.add(this.name);
    }

    update_stats(tank) {
        this.name.setText(tank);
        console.log("update stats for a tank", tank);
    }
}

export default TankStats;