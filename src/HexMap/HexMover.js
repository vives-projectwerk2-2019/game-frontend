import Terrain from "../Terrain/Terrain"

/*jshint esversion: 6 */

class HexMover {
  constructor(
    username,
    texture,
    x,
    y,
    addons,
    rotation,
    previousRotation,
    scene,
    map,
    size,
    dev_id
  ) {
    this.map = map;
    this.currentTile = this.map.getTile({ x: x, y: y });
    this.sprite = scene.add
      .sprite(this.currentTile.body.x, this.currentTile.body.y, texture)
      .setDisplaySize(size, size);
    this.currentPosition = this.updateCurrentPosition();
    this.currentRotation = rotation;
    this.previousRotation = previousRotation;
    this.updateCurrentRotation();
    this.username = username;
    this.weapons = {
      // base weapon always equiped
      weaponName: ["gatling gun"],
      weaponDamage: [4],
      weaponRange: [20]
    };
    
    this.addons = ["gatling gun"];
    this.addonUses = [0, 0, 0, 0];
    this.health = 20;
    this.canEnterWater = false;
    this.tankMovementRange = 1;
    this.id = dev_id;
    this.isAlive = true;
  }

  //movement
  forward() {
    let newCubeLocation = {};

    if (this.currentRotation == 1) {
      //y ==, z-1,x+1
      newCubeLocation = {
        x: this.currentTile.cubePosition.x + 1,
        y: this.currentTile.cubePosition.y,
        z: this.currentTile.cubePosition.z - 1
      };
    } else if (this.currentRotation == 2) {
      //y - 1, z ==; x + 1
      newCubeLocation = {
        x: this.currentTile.cubePosition.x + 1,
        y: this.currentTile.cubePosition.y - 1,
        z: this.currentTile.cubePosition.z
      };
    } else if (this.currentRotation == 3) {
      //y - 1, z + 1, x ==
      newCubeLocation = {
        x: this.currentTile.cubePosition.x,
        y: this.currentTile.cubePosition.y + 1,
        z: this.currentTile.cubePosition.z + 1
      };
    } else if (this.currentRotation == 4) {
      //y ==, z + 1, x - 1
      newCubeLocation = {
        x: this.currentTile.cubePosition.x - 1,
        y: this.currentTile.cubePosition.y,
        z: this.currentTile.cubePosition.z + 1
      };
    } else if (this.currentRotation == 5) {
      //y +1, z ==, x -1
      newCubeLocation = {
        x: this.currentTile.cubePosition.x - 1,
        y: this.currentTile.cubePosition.y + 1,
        z: this.currentTile.cubePosition.z
      };
    } else if (this.currentRotation == 6) {
      //y + 1, z - 1, x ==
      newCubeLocation = {
        x: this.currentTile.cubePosition.x,
        y: this.currentTile.cubePosition.y + 1,
        z: this.currentTile.cubePosition.z - 1
      };
    }
    let nextState = new Terrain();
    var nextTile = nextState.getNextTileType(
      this.map.cubeToOddr(newCubeLocation),
      this.map.jsonMap
    );
    var tankPath = nextState.setTankPathState(nextTile);
    if (tankPath == tankPathEnum.UNBLOCKED) {
      let newPosition = this.map.cubeToOddr(newCubeLocation);
      this.setPosition(newPosition.x, newPosition.y);
    }
  }

  backward() {
    let newCubeLocation = {};

    if (this.currentRotation == 1) {
      //y ==, z-1,x+1
      newCubeLocation = {
        x: this.currentTile.cubePosition.x - 1,
        y: this.currentTile.cubePosition.y,
        z: this.currentTile.cubePosition.z + 1
      };
    } else if (this.currentRotation == 2) {
      //y - 1, z ==; x + 1
      newCubeLocation = {
        x: this.currentTile.cubePosition.x - 1,
        y: this.currentTile.cubePosition.y + 1,
        z: this.currentTile.cubePosition.z
      };
    } else if (this.currentRotation == 3) {
      //y - 1, z + 1, x ==
      newCubeLocation = {
        x: this.currentTile.cubePosition.x,
        y: this.currentTile.cubePosition.y - 1,
        z: this.currentTile.cubePosition.z - 1
      };
    } else if (this.currentRotation == 4) {
      //y ==, z + 1, x - 1
      newCubeLocation = {
        x: this.currentTile.cubePosition.x + 1,
        y: this.currentTile.cubePosition.y,
        z: this.currentTile.cubePosition.z - 1
      };
    } else if (this.currentRotation == 5) {
      //y +1, z ==, x -1
      newCubeLocation = {
        x: this.currentTile.cubePosition.x + 1,
        y: this.currentTile.cubePosition.y - 1,
        z: this.currentTile.cubePosition.z
      };
    } else if (this.currentRotation == 6) {
      //y + 1, z - 1, x ==
      newCubeLocation = {
        x: this.currentTile.cubePosition.x,
        y: this.currentTile.cubePosition.y - 1,
        z: this.currentTile.cubePosition.z + 1
      };
    }

    let nextState = new Terrain();
    var nextTile = nextState.getNextTileType(
      this.map.cubeToOddr(newCubeLocation),
      this.map.jsonMap
    );
    var tankPath = nextState.setTankPathState(nextTile);
    if (tankPath == tankPathEnum.UNBLOCKED) {
      let newPosition = this.map.cubeToOddr(newCubeLocation);
      this.setPosition(newPosition.x, newPosition.y);
    }
  }

  turnLeft() {
    if (this.currentRotation != 1) {
      this.currentRotation = this.currentRotation - 1;
    } else {
      this.currentRotation = 6;
    }
    this.updateCurrentRotation();
    console.log(this.currentRotation);
  }

  turnRight() {
    if (this.currentRotation != 6) {
      this.currentRotation = this.currentRotation + 1;
    } else {
      this.currentRotation = 1;
    }
    this.updateCurrentRotation();
    console.log(this.currentRotation);
  }

  setPosition(x, y, rotation) {
    if (this.map.getTile({ x: x, y: y })) {
      this.currentTile = this.map.getTile({ x: x, y: y });
      this.sprite.x = this.currentTile.body.x;
      this.sprite.y = this.currentTile.body.y;
      this.currentPosition = this.updateCurrentPosition();
      this.currentRotation = rotation;
      this.updateCurrentRotation();
    }
  }

  //rotation = the direction which the tank is gonna move
  //previousRotation = the direction of which the tank starts moving
  lerpTurn(previousRotation, rotation) {

    for (i = 0; previousRotation != rotation; i++) {
      if (rotation > previousRotation) {
        previousRotation += lerp;
        }
      else if (rotation < previousRotation) {
        previousRotation -= lerp;
      }
    console.log(previousRotation);
    this.currentRotation = previousRotation;
    }
  }

  updateCurrentRotation() {
    this.sprite.setAngle(60 * this.currentRotation - 30);
  }

  updateCurrentPosition() {
    return this.map.cubeToOddr(this.currentTile.cubePosition);
  }
}

export default HexMover;
