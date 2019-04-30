class HealthPanel extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children ) {
        super(scene, x, y, children);
        this.scene.add.existing(this);
        
        
    }
    setStartValues(x, y, /*id, */healthvalue, shieldvalue, iTank){
        let healthword = this.scene.add.text(x, y, "Health: ",
            { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
        healthword.setFontSize(18);
        this.add(healthword);    // Remove from scene and add to container
        y = y + 40;
        let shieldword = this.scene.add.text(x, y, "Shield: ",
            { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
        shieldword.setFontSize(18);
        this.add(shieldword);    // Remove from scene and add to container

        /*let idtext = scene.add.text(x, y-30, id ,
        { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
        idtext.setFontSize(18);
        this.add(idtext);    */

        y = y - 20;
        this.teller = 0;
        
        this.newProgressBarHealth = new ProgressBar(this.scene, x, y, 200, 15, 0x008000);
        this.add(this.newProgressBarHealth);

        this.healthvaluetext = this.scene.add.text(x, y, healthvalue,
            { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
            this.healthvaluetext.setFontSize(18);
        this.add(this.healthvaluetext);    // Remove from scene and add to container
        
        y = y + 40;
        this.newProgressBarShield = new ProgressBar(this.scene, x, y, 200, 15, 0x008000);
        this.add(this.newProgressBarShield);
        
        this.shieldvaluetext = this.scene.add.text(x, y, shieldvalue,
            { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
            this.shieldvaluetext.setFontSize(18);
        this.add(this.shieldvaluetext);    // Remove from scene and add to container
        

        /*var healthvaluetext=[];
        healthvaluetext[iTank] = scene.add.text(x, y, healthvalue,
            { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
            healthvaluetext[iTank].setFontSize(18);
        this.add(healthvaluetext[iTank]);    // Remove from scene and add to container
        y = y + 20;
        /*this.shield[iTank] = scene.add.text(x, y, shieldvalue,
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
        if(this.teller == 101){
            this.teller = 0;
        }
        this.teller ++;
        /*this.healthvaluetext.setText(100- this.teller);
        this.shieldvaluetext.setText(100- this.teller);
        this.newProgressBarHealth.setProgress(100- this.teller);
        this.newProgressBarShield.setProgress(100- this.teller);
        //healthvaluetext[1].setText(10);*/
        
    }
}