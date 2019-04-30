class PlayerPanel extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children, playerName, assetKey) {
        super(scene, x, y, children);
        scene.add.existing(this);

        let nameLabel = scene.add.text(5, 5, playerName,
            { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
        nameLabel.setFontSize(24);
        this.add(nameLabel);    // Remove from scene and add to container

        let image = scene.make.image({
            x: 5,
            y: 35,
            key: assetKey,
            scale: {
                x: 0.1,
                y: 0.1
            }
        }).setOrigin(0, 0);
        this.add(image);
    }
    // ...

    // preUpdate(time, delta) {}
}