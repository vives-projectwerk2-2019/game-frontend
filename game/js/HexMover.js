/*jshint esversion: 6 */
//baseclass for all objects that need to manouver over the hex grid
class HexMover {
    constructor(texture, scene, map, x, y, size) {
        this.map = map;
        this.currentTile = this.map.getTile({x: x, y: y});
        this.sprite = scene.add.sprite(this.currentTile.body.x, this.currentTile.body.y, texture).setDisplaySize(size,size);
        this.currentPosition = this.updateCurrentPosition();
        this.currentRotation = 1;
        this.updateCurrentRotation();
    }
}