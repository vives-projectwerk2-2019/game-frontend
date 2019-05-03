import Phaser from "phaser";
import ProgressBar from "../../src/ProgressBar/ProgressBar";
import TankStats from "./TankStats";

class StatsOverview extends Phaser.GameObjects.Container{

    constructor(scene, x, y, children = null) {
        super(scene, x, y, children);
        scene.add.existing(this);
        this.setSize(370, 850);
        this.scene = scene;
        
        let rect = scene.add.rectangle(0, 0, 370, 850, 0xd30102, 0.9);
        rect.setOrigin(0,0);
        this.add(rect);

        let title = scene.add.text(this.width / 2, 10, "++ Player stats ++",
            { fontSize: 48, font: 'Courier', fill: '#fdf6e3', align: 'center'}
        ).setOrigin(0.5, 0);
        title.setFontSize(30);

        this.add(title);
    }

    update_tanks(tanks) {
        tanks.forEach((tank, index) => {
            const t = new TankStats(this.scene, 10, 50 + index * 100);
            t.update_stats(tank);
            this.add(t);
        })
    }
}

export default StatsOverview;