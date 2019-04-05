class PlayerPanel extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children) {
        super(scene, x, y, children);
        scene.add.existing(this);

        let nameLabel = scene.add.text(35, 25, playerName,
             {fontSize: 24, font: 'Arial', fill: '#FFFFFF'}).setOrigin(0,0);

        this.add(nameLabel);    // Remove from scene and add to container
        
    }
    // ...

    // preUpdate(time, delta) {}
}