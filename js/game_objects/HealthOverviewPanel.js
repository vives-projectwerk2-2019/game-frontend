import HealthPanel from "./HealthPanel";

class HealthOverviewPanel extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children) {
        super(scene, x, y, children);
        scene.add.existing(this); 
        this.numberOfTanks = 0;
        this.xposition = {};
        this.yposition = {};
        this.healthpannel = new HealthPanel(this.scene, 0, 0, null);
        
    }
    
    addData(health, shield, x, y, id, idsaver) {
        let newY = (this.numberOfTanks > 0 ? y + 150 : 100);
        //let newY = y + 50 + last.y;
        x = this.x + 90;
        this.numberOfTanks ++ ;
        //this.add(new HealthPanel(this.scene, x, newY, null, idsaver[0], health, shield));
        
        // function isOdd(element, index, idsaver)  
        // {  
        // return (element % 2 == 1);  
        // } 

        // let iTank = idsaver.find(isOdd);
        let iTank;
        for (let i = 0; i < 8; i++) {
            if (idsaver[i] == id) {
                iTank = i;
            }
        }
        this.xposition[iTank] = x;
        this.yposition[iTank] = newY;
        //this.healthpannel = new HealthPanel(this.scene, this.xposition[iTank], this.yposition[iTank], null, idsaver[iTank], health, shield, iTank);
        //this.add(this.healthpannel);
        this.healthpannel.setStartValues(this.xposition[iTank], this.yposition[iTank], /*idsaver[iTank],*/ health, shield, iTank)
    }   
    
    /*setHealth(healthvalue){
        this.healthpannel = healtvalue;
    }
    setShield(shieldvalue){
        
    }*/
  
}

export default HealthOverviewPanel;