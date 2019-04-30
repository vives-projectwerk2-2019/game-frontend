class HealthOverviewPanel extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children) {
        super(scene, x, y, children);
        scene.add.existing(this); 
        this.numberOfTanks = 0;
        this.xposition = {};
        this.yposition = {};
        
    }
    
    addData(health, shield, x, id, idsaver) {
        let newY = (this.numberOfTanks > 0 ? this.last.y + 50 : 30);
        this.numberOfTanks ++ ;
        //this.add(new HealthPanel(this.scene, x, newY, null, idsaver[0], health, shield));
        
        // function isOdd(element, index, idsaver)  
        // {  
        // return (element % 2 == 1);  
        // } 

        // let iTank = idsaver.find(isOdd);
        let iTank;
        for (i = 0; i < 8; i++) {
            if (idsaver[i] == id) {
                iTank = i;
            }
        }
        this.xposition[iTank] = x;
        this.yposition[iTank] = newY;
        this.add(new HealthPanel(this.scene, this.xposition[iTank], this.yposition[iTank], null, idsaver[iTank], health, shield, iTank));

    }          
  
}