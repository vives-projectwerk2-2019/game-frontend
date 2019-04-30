class Tile {
    constructor(texture, scene, x, y, cubePosition, size){
        this.position = {x: x, y: y};
        this.cubePosition = cubePosition;
        this.body = scene.add.sprite(x, y, texture).setDisplaySize(size, size);
        scene.add.sprite(x, y, texture).setDisplaySize(size);
    }

    setTexture(texture) {
        this.body.setTexture(texture);
    }
}

export default Tile;