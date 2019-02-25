class HexMap {
    constructor(tileTexture, selectedTileTexture, scene, width, length, tileSize, xOffset, yOffset){
        this.tileTexture = tileTexture;
        this.selectedTileTexture = selectedTileTexture;
        this.width = width;
        this.length = length;
        this.tileSize = tileSize;
        this.scene = scene;
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.map = this.generateMap();
    }

    generateMap() {
        let tileWidth = Math.sqrt(3) / 2 * this.tileSize;
        let tileHeight = 2 * (this.tileSize/3);
        let map = [];

        for (let xIndex = 0; xIndex < this.width; xIndex++) {
            map[xIndex] = [];
            for (let yIndex = 0; yIndex < this.length; yIndex++) {
                let xSpacing = tileWidth * xIndex;
                let ySpacing = tileHeight * 0.75 * yIndex;

                if (yIndex%2 == 0) {
                    map[xIndex][yIndex] = new Tile(this.tileTexture, this.scene, xSpacing + this.xOffset, ySpacing + this.yOffset, this.oddrToCube(xIndex, yIndex), this.tileSize);
                } else {
                    map[xIndex][yIndex] = new Tile(this.tileTexture, this.scene, (xSpacing + tileWidth / 2) + this.xOffset, ySpacing + this.yOffset, this.oddrToCube(xIndex, yIndex), this.tileSize);
                }
            }
        }

        return map;
    }

    cubeToOddr(cubePosition){
        var collum = cubePosition.x + (cubePosition.z - (cubePosition.z&1)) / 2;
        var row = cubePosition.z;
        return {x: collum, y: row};
    }

    oddrToCube(collum, row) {
        var x = collum - (row - (row&1)) / 2;
        var z = row;
        var y = -x-z;
        return {x: x, y: y, z: z};
    }

    selectTile(x,y) {
        this.map[x][y].setTexture(this.selectedTileTexture);
    }

    unselectTile(x,y) {
        this.map[x][y].setTexture(this.tileTexture);
    }

    getTile(position) {
        if (position.x < this.width && position.y < this.length && position.x >= 0 && position.y >= 0){
            return this.map[position.x][position.y];
        } else {
            console.log("out of bounds");
            return null;
        }
    }
}