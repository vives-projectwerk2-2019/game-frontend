/*jshint esversion: 6 */

//an extended version of HexMap containing more functionality specific to editing a map

class HexMapEditor extends HexMap {
    //expects everything from HexMap
    constructor(scene, tileSize, xOffset, yOffset, file){
        super(scene, tileSize, xOffset, yOffset, file);
        this.cursor = null;
    }
}