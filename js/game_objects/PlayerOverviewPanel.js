import Phaser from "phaser";
import PlayerPanel from "./PlayerPanel";
import HealthPanel from "./HealthPanel";

class PlayerOverviewPanel extends Phaser.GameObjects.Container {
  constructor(scene, x, y, children) {
    super(scene, x, y, children);
    scene.add.existing(this);

        let title = scene.add.text(5, 5, "Players:",
        { setfontSize: 48, font: 'Arial', fill: '#ff0000',}).setOrigin(0, 0);
          title.setFontSize(30);

          this.add(title);    // Remove from scene and add to container

    this.numberOfTanks = 0;
   
    }
    
    addPlayer(player, assetKey, idsaver, addon1, addon2, addon3) {
        idsaver[this.numberOfTanks] = assetKey;
        let newY = (this.numberOfTanks > 0 ? this.last.y + 100 : 30);
        this.add(new PlayerPanel(this.scene, 0, newY, null, player, assetKey, addon1, addon2, addon3));   
        this.numberOfTanks++;
    }
}

export default PlayerOverviewPanel;