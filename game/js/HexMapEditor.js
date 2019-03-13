/*jshint esversion: 6 */

//an extended version of HexMap containing more functionality specific to editing a map

class HexMapEditor extends HexMap {
    //expects everything from HexMap
    constructor(scene, tileSize, xOffset, yOffset, file){
        super(scene, tileSize, xOffset, yOffset, file);
        this.cursor = null;
    }
    //sets up the map and cursor, expects a starting position x and y, string cursorTexture and number cursorSize
    //to be called after the preload!!
    generateEditor(startPositionX, startPositionY, cursorTexture, cursorSize){
        this.generateMap();
        this.cursor = new TileSelector(cursorTexture, this.scene, this, startPositionX, startPositionY, cursorSize);
    }

    getIdFromTextureName(textureName){     //takes a string textureName and returns its index
        return this.tileGroup.indexOf(textureName);
    }
}