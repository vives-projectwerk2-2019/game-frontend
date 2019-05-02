import Phaser from "phaser";

class PlayerPanel extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children, playerName, assetKey, addon1, addon2, addon3) {
        super(scene, x, y, children);
        scene.add.existing(this);

        let nameLabel = scene.add.text(5, 5, playerName,
            { font: "Arial ", fill: "#FF0000" }).setOrigin(0, 0);
        nameLabel.setFontSize(24);
        nameLabel.set
        this.add(nameLabel);    // Remove from scene and add to container

        let imagetank = scene.make.image({
            x: 10,
            y: 30,
            key: assetKey,
            scale: {
                x: 0.1,
                y: 0.1
            }
        }).setOrigin(0, 0);
        this.add(imagetank);
        let imageaddon1 = scene.make.image({
            x: 100,
            y: 15,
            key: addon1,
            scale: {
                x: 0.08,
                y: 0.08
            }
        }).setOrigin(0, 0);
        this.add(imageaddon1);
        let imageaddon2 = scene.make.image({
            x: 100,
            y: 45,
            key: addon2,
            scale: {
                x: 0.08,
                y: 0.08
            }
        }).setOrigin(0, 0);
        this.add(imageaddon2);
        let imageaddon3 = scene.make.image({
            x: 100,
            y: 75,
            key: addon3,
            scale: {
                x: 0.08,
                y: 0.08
            }
        }).setOrigin(0, 0);
        this.add(imageaddon3);
    }
    // ...

    // preUpdate(time, delta) {}
}

export default PlayerPanel;