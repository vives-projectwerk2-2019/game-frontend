class Tank {
    constructor(tankTexture, scene, map, x, y, size) {
        this.map = map;
        this.currentTile = this.map.getTile({x: x, y: y});
        this.sprite = scene.add.sprite(this.currentTile.body.x, this.currentTile.body.y, tankTexture).setDisplaySize(size,size);
        this.currentPosition = this.updateCurrentPosition();
        this.currentRotation = 1;
        this.updateCurrentRotation();
    }
}