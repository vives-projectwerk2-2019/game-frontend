import HealthPanel from "./HealthPanel";

class HealthOverviewPanel extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children) {
        super(scene, x, y, children);
        scene.add.existing(this); 
        this.numberOfTanks = 0;
        this.xposition = {};
        this.yposition = {};
        this.healthpannel;
        this.newY = 0;
        this.iTank;
        this.healthdata = [0,0,0,0,0,0,0,0];
        this.shielddata = [0,0,0,0,0,0,0,0];
        this.healthpannel = new HealthPanel(this.scene, this.xposition[this.iTank], this.yposition[this.iTank], null);
        
        
    }
    
    addData(health, shield, x, id, idsaver) {
        this.newY = this.newY + 100;
        
        this.numberOfTanks ++ ;
        for (let i = 0; i < 8; i++) {
            if (idsaver[i] == id) {
                this.iTank = i;
            }
        }
        this.xposition[this.iTank] = x;
        this.yposition[this.iTank] = this.newY;
        this.healthpannel.settextplayers(this.scene, this.xposition[this.iTank], this.newY);
        this.healthpannel.setProgressBar(this.scene, this.xposition[this.iTank], this.newY, null, idsaver[this.iTank], health, shield, this.iTank);
        
    }       
    
    setHealth(/*shield, health,*/idsaver, id, health, shield){        //123401, 30, 650, idsaver, '123401'
        
        for (let i = 0; i < 8; i++) {
            if (idsaver[i] == id) {
                this.iTank = i;
                this.healthdata[i] = health;
                this.shielddata[i] = shield;
            }
        }
        //this.healthpannel.setProgressBar(this.scene, this.xposition[this.iTank], this.newY, null, idsaver[this.iTank], health, shield, this.iTank);*/
        this.healthpannel.setDataValues(this.healthdata, this.shielddata);
    }     
  
}

export default HealthOverviewPanel;