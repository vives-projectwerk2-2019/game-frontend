class HealthPanel extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children, id, healthvalue, shieldvalue, iTank) {
        super(scene, x, y, children);
        scene.add.existing(this);
        
        let healthword = scene.add.text(x, y, "Health: ",
            { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
        healthword.setFontSize(18);
        this.add(healthword);    // Remove from scene and add to container
        y = y + 20;
        let shieldword = scene.add.text(x, y, "Shield: ",
            { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
        shieldword.setFontSize(18);
        this.add(shieldword);    // Remove from scene and add to container

        let idtext = scene.add.text(x, y-30, id ,
        { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
        idtext.setFontSize(18);
        this.add(idtext);    

        x = x + 80;
        y = y - 20;
        this.teller = 0.0;
        
        // this.progresbar = scene.add(new ProgressBar(this.scene, 20, 20, 50, 20, 0x008000));
        //this.newProgressBar.setProgress(100);
        this.newProgressBarHealth = new ProgressBar(this.scene, 50, 20, 200, 15, 0x008000);
        this.add(this.newProgressBarHealth);

        this.healthvaluetext = scene.add.text(x, y, healthvalue,
            { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
            this.healthvaluetext.setFontSize(18);
        this.add(this.healthvaluetext);    // Remove from scene and add to container
        y = y + 20;

        this.newProgressBarShield = new ProgressBar(this.scene, 50, 40, 200, 15, 0x008000);
        this.add(this.newProgressBarShield);

        this.shieldvaluetext = scene.add.text(x, y, shieldvalue,
            { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
            this.shieldvaluetext.setFontSize(18);
        this.add(this.shieldvaluetext);    // Remove from scene and add to container
        

        /*this.healthvaluetext={};
        this.healthvaluetext[iTank] = scene.add.text(x, y, healthvalue,
            { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
            this.healthvaluetext[iTank].setFontSize(18);
        this.add(this.healthvaluetext[iTank]);    // Remove from scene and add to container
        y = y + 20;
        this.shield[iTank] = scene.add.text(x, y, shieldvalue,
            { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
            this.shield[iTank].setFontSize(18);
        this.add(this.shield[iTank]);    // Remove from scene and add to container*/

        //health.setText("test");
    }
    setHealth(healthvalue){
        this.healthvalue = healthvalue;
    }
    setShield(shieldvalue){
        this.shieldvalue = shieldvalue;
    }

    preUpdate(time, delta) {
        console.log("Before update!");
        this.teller ++;
        this.healthvaluetext.setText(this.teller);
        this.shieldvaluetext.setText(this.teller);
        this.newProgressBarHealth.setProgress(100);
        this.newProgressBarShield.setProgress(100);
        
    }
}