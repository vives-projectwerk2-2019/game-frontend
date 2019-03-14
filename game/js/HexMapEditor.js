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

    getNameFromTextureId(textureId){
        return this.tileGroup.findIndex(texture => texture.value === textureID);
    }

    toggleCurrentTileTexture(){
        let currentId = this.getIdFromTextureName(this.cursor.getTileTextureName());
        if (currentId < this.tileGroup.length) {
            let position = this.cursor.currentPosition;
            console.log(this.jsonMap);
            console.log(this.cursor.currentPosition)
            this.jsonMap[position.x][position.y] = currentId + 1;
            this.cursor.changeSelectedTileTexture(this.tileGroup[currentId + 1]);
        } else {
            this.jsonMap[position.x][position.y] = 0;
            this.cursor.changeSelectedTileTexture(this.tileGroup[0]);
        }
    }

    //called to set the keybinds for the cursor
    assignCursorMovementBinds() {
        this.scene.input.keyboard.on('keyup_Z', function(event){
            this.cursor.forward();
        },this);
        this.scene.input.keyboard.on('keyup_S', function(event){
            this.cursor.backward();
        },this);
        this.scene.input.keyboard.on('keyup_Q', function(event){
            this.cursor.turnLeft();
        },this);
        this.scene.input.keyboard.on('keyup_D', function(event){
            this.cursor.turnRight();
        },this);
        this.scene.input.keyboard.on('keyup_A', function(event){
            this.toggleCurrentTileTexture();
        },this);
        this.scene.input.keyboard.on('keyup_E', function(event){
            this.saveMap();
        },this);
    }
    //will save the map to local storage
    saveMap(){
        localStorage.setItem("map", JSON.stringify(this.jsonMap));
        console.log("saved sucsesfully");
    }
}