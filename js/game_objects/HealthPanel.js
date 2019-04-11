class HealthPanel extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children, healthvalue, shieldvalue) {
        super(scene, x, y, children);
        scene.add.existing(this);
        // this.remove(shield);    // remove shield from screen
        // this.remove(health);    // remove shield from screen

        let healthword = scene.add.text(x, y, "Health: ",
            { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
        healthword.setFontSize(18);
        this.add(healthword);    // Remove from scene and add to container
        y = y + 20;
        let shieldword = scene.add.text(x, y, "Shield: ",
            { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
        shieldword.setFontSize(18);
        this.add(shieldword);    // Remove from scene and add to container

        //scene.remove.text(x, y, "Health: ");
       
        x = x + 80;
        y = y - 20;
        let health = scene.add.text(x, y, healthvalue,
            { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
        health.setFontSize(18);
        this.add(health);    // Remove from scene and add to container
        y = y + 20;
        let shield = scene.add.text(x, y, shieldvalue,
            { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
        shield.setFontSize(18);
        this.add(shield);    // Remove from scene and add to container
        //this.remove(shield);    // remove shield from screen

    }
    // ...

    // preUpdate(time, delta) {}
}