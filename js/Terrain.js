//enum state of the next tile based on the tank direction if the path is blocked or not 
var tankPathEnum = {
	UNBLOCKED: 0, 
	BLOCKED: 1
}; 

//enum type of terrain tiles
//the tile id's should match the ones from the json
var tankTileEnum  = {
	WATER: 0,
	GRASS: 1,
	MOUNTAIN: 2,
	SWAMP: 3,
	OTHER_TANK: 4,
};

class TankTerrain {

	//looks if the path of the tank is blocked 
	setTankPathState(nextTile)
	{
		let tankState = tankPathEnum.UNBLOCKED;

		if(nextTile == tankTileEnum.MOUNTAIN || nextTile == tankTileEnum.WATER) {
			tankState = tankPathEnum.BLOCKED;
		}

		return tankState;
	}
	
};
