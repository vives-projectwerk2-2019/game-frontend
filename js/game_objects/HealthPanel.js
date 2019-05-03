import Phaser from "phaser";
import ProgressBar from "../../src/ProgressBar/ProgressBar";

class HealthPanel extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children, id, healthvalue, shieldvalue, iTank) {
        super(scene, x, y, children);
        scene.add.existing(this);
        this.healtharray;
        this.shieldarray = [100, 100, 100, 100, 100, 100, 100, 100];
    }
    settextplayers(scene, x, y){
        //y = y + 100;
        let healthword = scene.add.text(x, y, "Health: ",
            { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
        healthword.setFontSize(18);
        this.add(healthword);    // Remove from scene and add to container
        y = y + 40;
        let shieldword = scene.add.text(x, y, "Shield: ",
            { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
        shieldword.setFontSize(18);
        this.add(shieldword);    // Remove from scene and add to container
        this.teller = 100;
        
    }
    setProgressBar(scene, x, y, children, id, healthvalue, shieldvalue, iTank){
        y = y + 20;
        this.iTank = iTank;
        if (iTank == 0) {
            this.newProgressBarHealth0 = new ProgressBar(this.scene, x, y, 200, 15, 0x008000);
            this.add(this.newProgressBarHealth0);

            this.healthvaluetext0 = scene.add.text(x, y, healthvalue,
                { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
                this.healthvaluetext0.setFontSize(18);
            this.add(this.healthvaluetext0);    // Remove from scene and add to container
            
            y = y + 40;
            this.newProgressBarShield0 = new ProgressBar(this.scene, x, y, 200, 15, 0x008000);
            this.add(this.newProgressBarShield0);
            
            this.shieldvaluetext0 = scene.add.text(x, y, shieldvalue,
                { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
                this.shieldvaluetext0.setFontSize(18);
            this.add(this.shieldvaluetext0);    // Remove from scene and add to container
            console.log("settext0");
        } else if (iTank == 1) {
            this.newProgressBarHealth1 = new ProgressBar(this.scene, x, y, 200, 15, 0x008000);
            this.add(this.newProgressBarHealth1);

            this.healthvaluetext1 = scene.add.text(x, y, healthvalue,
                { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
                this.healthvaluetext1.setFontSize(18);
            this.add(this.healthvaluetext1);    // Remove from scene and add to container
            
            y = y + 40;
            this.newProgressBarShield1 = new ProgressBar(this.scene, x, y, 200, 15, 0x008000);
            this.add(this.newProgressBarShield1);
            
            this.shieldvaluetext1 = scene.add.text(x, y, shieldvalue,
                { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
                this.shieldvaluetext1.setFontSize(18);
            this.add(this.shieldvaluetext1);    // Remove from scene and add to container
            console.log("settext1");
        } else if (iTank == 2) {
            this.newProgressBarHealth2 = new ProgressBar(this.scene, x, y, 200, 15, 0x008000);
            this.add(this.newProgressBarHealth2);

            this.healthvaluetext2 = scene.add.text(x, y, healthvalue,
                { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
                this.healthvaluetext2.setFontSize(18);
            this.add(this.healthvaluetext2);    // Remove from scene and add to container
            
            y = y + 40;
            this.newProgressBarShield2 = new ProgressBar(this.scene, x, y, 200, 15, 0x008000);
            this.add(this.newProgressBarShield2);
            
            this.shieldvaluetext2 = scene.add.text(x, y, shieldvalue,
                { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
                this.shieldvaluetext2.setFontSize(18);
            this.add(this.shieldvaluetext2);    // Remove from scene and add to container
            console.log("settext2");
        } else if (iTank == 3) {
            this.newProgressBarHealth3 = new ProgressBar(this.scene, x, y, 200, 15, 0x008000);
            this.add(this.newProgressBarHealth3);

            this.healthvaluetext3 = scene.add.text(x, y, healthvalue,
                { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
                this.healthvaluetext3.setFontSize(18);
            this.add(this.healthvaluetext3);    // Remove from scene and add to container
            
            y = y + 40;
            this.newProgressBarShield3 = new ProgressBar(this.scene, x, y, 200, 15, 0x008000);
            this.add(this.newProgressBarShield3);
            
            this.shieldvaluetext3 = scene.add.text(x, y, shieldvalue,
                { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
                this.shieldvaluetext3.setFontSize(18);
            this.add(this.shieldvaluetext3);    // Remove from scene and add to container
            console.log("settext3");
        } else if (iTank == 4) {
            this.newProgressBarHealth4 = new ProgressBar(this.scene, x, y, 200, 15, 0x008000);
            this.add(this.newProgressBarHealth4);

            this.healthvaluetext4 = scene.add.text(x, y, healthvalue,
                { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
                this.healthvaluetext4.setFontSize(18);
            this.add(this.healthvaluetext4);    // Remove from scene and add to container
            
            y = y + 40;
            this.newProgressBarShield4 = new ProgressBar(this.scene, x, y, 200, 15, 0x008000);
            this.add(this.newProgressBarShield4);
            
            this.shieldvaluetext4 = scene.add.text(x, y, shieldvalue,
                { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
                this.shieldvaluetext4.setFontSize(18);
            this.add(this.shieldvaluetext4);    // Remove from scene and add to container
            console.log("settext4");
        } else if (iTank == 5) {
            this.newProgressBarHealth5 = new ProgressBar(this.scene, x, y, 200, 15, 0x008000);
            this.add(this.newProgressBarHealth5);

            this.healthvaluetext5 = scene.add.text(x, y, healthvalue,
                { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
                this.healthvaluetext5.setFontSize(18);
            this.add(this.healthvaluetext5);    // Remove from scene and add to container
            
            y = y + 40;
            this.newProgressBarShield5 = new ProgressBar(this.scene, x, y, 200, 15, 0x008000);
            this.add(this.newProgressBarShield5);
            
            this.shieldvaluetext5 = scene.add.text(x, y, shieldvalue,
                { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
                this.shieldvaluetext5.setFontSize(18);
            this.add(this.shieldvaluetext5);    // Remove from scene and add to container
            console.log("settext5");
        } else if (iTank == 6) {
            this.newProgressBarHealth6 = new ProgressBar(this.scene, x, y, 200, 15, 0x008000);
            this.add(this.newProgressBarHealth6);

            this.healthvaluetext6 = scene.add.text(x, y, healthvalue,
                { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
                this.healthvaluetext6.setFontSize(18);
            this.add(this.healthvaluetext6);    // Remove from scene and add to container
            
            y = y + 40;
            this.newProgressBarShield6 = new ProgressBar(this.scene, x, y, 200, 15, 0x008000);
            this.add(this.newProgressBarShield6);
            
            this.shieldvaluetext6 = scene.add.text(x, y, shieldvalue,
                { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
                this.shieldvaluetext6.setFontSize(18);
            this.add(this.shieldvaluetext6);    // Remove from scene and add to container
            console.log("settext6");
        } else if (iTank == 7) {
            this.newProgressBarHealth7 = new ProgressBar(this.scene, x, y, 200, 15, 0x008000);
            this.add(this.newProgressBarHealth7);

            this.healthvaluetext7 = scene.add.text(x, y, healthvalue,
                { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
                this.healthvaluetext7.setFontSize(18);
            this.add(this.healthvaluetext7);    // Remove from scene and add to container
            
            y = y + 40;
            this.newProgressBarShield7 = new ProgressBar(this.scene, x, y, 200, 15, 0x008000);
            this.add(this.newProgressBarShield7);
            
            this.shieldvaluetext7 = scene.add.text(x, y, shieldvalue,
                { font: "Arial", fill: "#FF0000" }).setOrigin(0, 0);
                this.shieldvaluetext7.setFontSize(18);
            this.add(this.shieldvaluetext7);    // Remove from scene and add to container
            console.log("settext7");
        } 

        
    }
    setDataValues(healtharray, shieldarray){
        this.healtharray = healtharray;
        this.shieldarray = shieldarray;
    }

    preUpdate(time, delta) {
        if (this.iTank == 0) {
            this.healthvaluetext0.setText(this.healtharray[0]);
            this.shieldvaluetext0.setText(this.shieldarray[0]);
            this.newProgressBarHealth0.setProgress(this.healtharray[0]*5);
            this.newProgressBarShield0.setProgress(this.shieldarray[0]*5);
            //console.log("0");
        } else if (this.iTank == 1) {
            this.healthvaluetext0.setText(this.healtharray[0]);
            this.shieldvaluetext0.setText(this.shieldarray[0]);
            this.newProgressBarHealth0.setProgress(this.healtharray[0]*5);
            this.newProgressBarShield0.setProgress(this.shieldarray[0]*5);
            this.healthvaluetext1.setText(this.healtharray[1]);
            this.shieldvaluetext1.setText(this.shieldarray[1]);
            this.newProgressBarHealth1.setProgress(this.healtharray[1]*5);
            this.newProgressBarShield1.setProgress(this.shieldarray[1]*5);
            //console.log("1");
        } else if (this.iTank == 2) {
            this.healthvaluetext0.setText(this.healtharray[0]);
            this.shieldvaluetext0.setText(this.shieldarray[0]);
            this.newProgressBarHealth0.setProgress(this.healtharray[0]*5);
            this.newProgressBarShield0.setProgress(this.shieldarray[0]*5);
            this.healthvaluetext1.setText(this.healtharray[1]);
            this.shieldvaluetext1.setText(this.shieldarray[1]);
            this.newProgressBarHealth1.setProgress(this.healtharray[1]*5);
            this.newProgressBarShield1.setProgress(this.shieldarray[1]*5);
            this.healthvaluetext2.setText(this.healtharray[2]);
            this.shieldvaluetext2.setText(this.shieldarray[2]);
            this.newProgressBarHealth2.setProgress(this.healtharray[2]*5);
            this.newProgressBarShield2.setProgress(this.shieldarray[2]*5);
            //console.log("2");
        } else if (this.iTank == 3) {
            this.healthvaluetext0.setText(this.healtharray[0]);
            this.shieldvaluetext0.setText(this.shieldarray[0]);
            this.newProgressBarHealth0.setProgress(this.healtharray[0]*5);
            this.newProgressBarShield0.setProgress(this.shieldarray[0]*5);
            this.healthvaluetext1.setText(this.healtharray[1]);
            this.shieldvaluetext1.setText(this.shieldarray[1]);
            this.newProgressBarHealth1.setProgress(this.healtharray[1]*5);
            this.newProgressBarShield1.setProgress(this.shieldarray[1]*5);
            this.healthvaluetext2.setText(this.healtharray[2]);
            this.shieldvaluetext2.setText(this.shieldarray[2]);
            this.newProgressBarHealth2.setProgress(this.healtharray[2]*5);
            this.newProgressBarShield2.setProgress(this.shieldarray[2]*5);
            this.healthvaluetext3.setText(this.healtharray[3]);
            this.shieldvaluetext3.setText(this.shieldarray[3]);
            this.newProgressBarHealth3.setProgress(this.healtharray[3]*5);
            this.newProgressBarShield3.setProgress(this.shieldarray[3]*5);
            //console.log("3");
        } else if (this.iTank == 4) {
            this.healthvaluetext0.setText(this.healtharray[0]);
            this.shieldvaluetext0.setText(this.shieldarray[0]);
            this.newProgressBarHealth0.setProgress(this.healtharray[0]*5);
            this.newProgressBarShield0.setProgress(this.shieldarray[0]*5);
            this.healthvaluetext1.setText(this.healtharray[1]);
            this.shieldvaluetext1.setText(this.shieldarray[1]);
            this.newProgressBarHealth1.setProgress(this.healtharray[1]*5);
            this.newProgressBarShield1.setProgress(this.shieldarray[1]*5);
            this.healthvaluetext2.setText(this.healtharray[2]);
            this.shieldvaluetext2.setText(this.shieldarray[2]);
            this.newProgressBarHealth2.setProgress(this.healtharray[2]*5);
            this.newProgressBarShield2.setProgress(this.shieldarray[2]*5);
            this.healthvaluetext3.setText(this.healtharray[3]);
            this.shieldvaluetext3.setText(this.shieldarray[3]);
            this.newProgressBarHealth3.setProgress(this.healtharray[3]*5);
            this.newProgressBarShield3.setProgress(this.shieldarray[3]*5);
            this.healthvaluetext4.setText(this.healtharray[4]);
            this.shieldvaluetext4.setText(this.shieldarray[4]);
            this.newProgressBarHealth4.setProgress(this.healtharray[4]*5);
            this.newProgressBarShield4.setProgress(this.shieldarray[4]*5);
            //console.log("4");
        } else if (this.iTank == 5) {
            this.healthvaluetext0.setText(this.healtharray[0]);
            this.shieldvaluetext0.setText(this.shieldarray[0]);
            this.newProgressBarHealth0.setProgress(this.healtharray[0]*5);
            this.newProgressBarShield0.setProgress(this.shieldarray[0]*5);
            this.healthvaluetext1.setText(this.healtharray[1]);
            this.shieldvaluetext1.setText(this.shieldarray[1]);
            this.newProgressBarHealth1.setProgress(this.healtharray[1]*5);
            this.newProgressBarShield1.setProgress(this.shieldarray[1]*5);
            this.healthvaluetext2.setText(this.healtharray[2]);
            this.shieldvaluetext2.setText(this.shieldarray[2]);
            this.newProgressBarHealth2.setProgress(this.healtharray[2]*5);
            this.newProgressBarShield2.setProgress(this.shieldarray[2]*5);
            this.healthvaluetext3.setText(this.healtharray[3]);
            this.shieldvaluetext3.setText(this.shieldarray[3]);
            this.newProgressBarHealth3.setProgress(this.healtharray[3]*5);
            this.newProgressBarShield3.setProgress(this.shieldarray[3]*5);
            this.healthvaluetext4.setText(this.healtharray[4]);
            this.shieldvaluetext4.setText(this.shieldarray[4]);
            this.newProgressBarHealth4.setProgress(this.healtharray[4]*5);
            this.newProgressBarShield4.setProgress(this.shieldarray[4]*5);
            this.healthvaluetext5.setText(this.healtharray[5]);
            this.shieldvaluetext5.setText(this.shieldarray[5]);
            this.newProgressBarHealth5.setProgress(this.healtharray[5]*5);
            this.newProgressBarShield5.setProgress(this.shieldarray[5]*5);
            //console.log("5");
        } else if (this.iTank == 6) {
            this.healthvaluetext0.setText(this.healtharray[0]);
            this.shieldvaluetext0.setText(this.shieldarray[0]);
            this.newProgressBarHealth0.setProgress(this.healtharray[0]*5);
            this.newProgressBarShield0.setProgress(this.shieldarray[0]*5);
            this.healthvaluetext1.setText(this.healtharray[1]);
            this.shieldvaluetext1.setText(this.shieldarray[1]);
            this.newProgressBarHealth1.setProgress(this.healtharray[1]*5);
            this.newProgressBarShield1.setProgress(this.shieldarray[1]*5);
            this.healthvaluetext2.setText(this.healtharray[2]);
            this.shieldvaluetext2.setText(this.shieldarray[2]);
            this.newProgressBarHealth2.setProgress(this.healtharray[2]*5);
            this.newProgressBarShield2.setProgress(this.shieldarray[2]*5);
            this.healthvaluetext3.setText(this.healtharray[3]);
            this.shieldvaluetext3.setText(this.shieldarray[3]);
            this.newProgressBarHealth3.setProgress(this.healtharray[3]*5);
            this.newProgressBarShield3.setProgress(this.shieldarray[3]*5);
            this.healthvaluetext4.setText(this.healtharray[4]);
            this.shieldvaluetext4.setText(this.shieldarray[4]);
            this.newProgressBarHealth4.setProgress(this.healtharray[4]*5);
            this.newProgressBarShield4.setProgress(this.shieldarray[4]*5);
            this.healthvaluetext5.setText(this.healtharray[5]);
            this.shieldvaluetext5.setText(this.shieldarray[5]);
            this.newProgressBarHealth5.setProgress(this.healtharray[5]*5);
            this.newProgressBarShield5.setProgress(this.shieldarray[5]*5);
            this.healthvaluetext6.setText(this.healtharray[6]);
            this.shieldvaluetext6.setText(this.shieldarray[6]);
            this.newProgressBarHealth6.setProgress(this.healtharray[6]*5);
            this.newProgressBarShield6.setProgress(this.shieldarray[6]*5);
            //console.log("6");
        } else if (this.iTank == 7) {
            this.healthvaluetext0.setText(this.healtharray[0]);
            this.shieldvaluetext0.setText(this.shieldarray[0]);
            this.newProgressBarHealth0.setProgress(this.healtharray[0]*5);
            this.newProgressBarShield0.setProgress(this.shieldarray[0]*5);
            this.healthvaluetext1.setText(this.healtharray[1]);
            this.shieldvaluetext1.setText(this.shieldarray[1]);
            this.newProgressBarHealth1.setProgress(this.healtharray[1]*5);
            this.newProgressBarShield1.setProgress(this.shieldarray[1]*5);
            this.healthvaluetext2.setText(this.healtharray[2]);
            this.shieldvaluetext2.setText(this.shieldarray[2]);
            this.newProgressBarHealth2.setProgress(this.healtharray[2]*5);
            this.newProgressBarShield2.setProgress(this.shieldarray[2]*5);
            this.healthvaluetext3.setText(this.healtharray[3]);
            this.shieldvaluetext3.setText(this.shieldarray[3]);
            this.newProgressBarHealth3.setProgress(this.healtharray[3]*5);
            this.newProgressBarShield3.setProgress(this.shieldarray[3]*5);
            this.healthvaluetext4.setText(this.healtharray[4]);
            this.shieldvaluetext4.setText(this.shieldarray[4]);
            this.newProgressBarHealth4.setProgress(this.healtharray[4]*5);
            this.newProgressBarShield4.setProgress(this.shieldarray[4]);
            this.healthvaluetext5.setText(this.healtharray[5]);
            this.shieldvaluetext5.setText(this.shieldarray[5]);
            this.newProgressBarHealth5.setProgress(this.healtharray[5]*5);
            this.newProgressBarShield5.setProgress(this.shieldarray[5]*5);
            this.healthvaluetext6.setText(this.healtharray[6]);
            this.shieldvaluetext6.setText(this.shieldarray[6]);
            this.newProgressBarHealth6.setProgress(this.healtharray[6]*5);
            this.newProgressBarShield6.setProgress(this.shieldarray[6]*5);
            this.healthvaluetext7.setText(this.healtharray[7]);
            this.shieldvaluetext7.setText(this.shieldarray[7]);
            this.newProgressBarHealth7.setProgress(this.healtharray[7]*5);
            this.newProgressBarShield7.setProgress(this.shieldarray[7]*5);
            //console.log("7");
        } 
            /*this.healthvaluetext0.setText(this.healtharray[0]);
            this.shieldvaluetext0.setText(this.shieldarray[0]);
            this.newProgressBarHealth0.setProgress(this.healtharray[0]);
            this.newProgressBarShield0.setProgress(this.shieldarray[0]);
            this.healthvaluetext1.setText(this.healtharray[1]);
            this.shieldvaluetext1.setText(this.shieldarray[1]);
            this.newProgressBarHealth1.setProgress(this.healtharray[1]);
            this.newProgressBarShield1.setProgress(this.shieldarray[1]);
            this.healthvaluetext2.setText(this.healtharray[2]);
            this.shieldvaluetext2.setText(this.shieldarray[2]);
            this.newProgressBarHealth2.setProgress(this.healtharray[2]);
            this.newProgressBarShield2.setProgress(this.shieldarray[2]);
            this.healthvaluetext3.setText(this.healtharray[3]);
            this.shieldvaluetext3.setText(this.shieldarray[3]);
            this.newProgressBarHealth3.setProgress(this.healtharray[3]);
            this.newProgressBarShield3.setProgress(this.shieldarray[3]);
            this.healthvaluetext4.setText(this.healtharray[4]);
            this.shieldvaluetext4.setText(this.shieldarray[4]);
            this.newProgressBarHealth4.setProgress(this.healtharray[4]);
            this.newProgressBarShield4.setProgress(this.shieldarray[4]);
            this.healthvaluetext5.setText(this.healtharray[5]);
            this.shieldvaluetext5.setText(this.shieldarray[5]);
            this.newProgressBarHealth5.setProgress(this.healtharray[5]);
            this.newProgressBarShield5.setProgress(this.shieldarray[5]);
            this.healthvaluetext6.setText(this.healtharray[6]);
            this.shieldvaluetext6.setText(this.shieldarray[6]);
            this.newProgressBarHealth6.setProgress(this.healtharray[6]);
            this.newProgressBarShield6.setProgress(this.shieldarray[6]);
            this.healthvaluetext7.setText(this.healtharray[7]);
            this.shieldvaluetext7.setText(this.shieldarray[7]);
            this.newProgressBarHealth7.setProgress(this.healtharray[7]);
            this.newProgressBarShield7.setProgress(this.shieldarray[7]);*/
    }
}

export default HealthPanel;