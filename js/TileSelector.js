/*jshint esversion: 6 */

//user in the HexMapEditor as a way to select a tile, display this and change the properties of the selected tile

class TileSelector extends HexMover {
    constructor(texture, scene, map, x, y, size) {
        super(texture, scene, map, x, y, size);
    }

    getTileTextureName(){       //returns a string with the name of the texture on the current tile
        return this.currentTile.body.texture.key;
    }

    changeSelectedTileTexture(texture){     //expects a string texture, will change the currently selected tile to this texture
        this.currentTile.setTexture(texture);
    }
}