class PlayerOverviewPanel extends Phaser.GameObjects.Container {
  constructor(scene, x, y, children) {
    super(scene, x, y, children);
    scene.add.existing(this);

        let title = scene.add.text(5, 5, "Players:",
        { setfontSize: 48, font: 'Arial', fill: '#ff0000',}).setOrigin(0, 0);
          title.setFontSize(30);

          this.add(title);    // Remove from scene and add to container
        // let title = scene.add.text(5, 5, "Players:",
        // { font: 'Arial', fill: '#ff0000' }).setOrigin(0, 0);
        // title.setFontSize(48);
        //this.add(title);    // Remove from scene and add to container

    this.numberOfTanks = 0;
   
    }
    
    addPlayer(player, assetKey, id, idsaver) {
        idsaver[this.numberOfTanks] = id;
        let newY = (this.numberOfTanks > 0 ? this.last.y + 100 : 30);
        this.add(new PlayerPanel(this.scene, 0, newY, null, player, assetKey));   
        this.numberOfTanks++;
    }

}