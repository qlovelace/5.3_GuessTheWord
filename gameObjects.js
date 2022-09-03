

class TileSet {
    constructor(tilesetIndex = 0, tileSize = 8) {
        this.index = tilesetIndex;
        this.tileSize = tileSize;
        this.image = tileSetslist[tilesetIndex];
        this.imageVisited = tileSetsVisetedlist[tilesetIndex];
    }
    getTilePos(tileId) {
        return tileId*this.tileSize;
    }
    changeTileSet(tilesetIndex, tileSize = 8){
        this.index = tilesetIndex;
        this.tileSize = tileSize;
        this.image = tileSetslist[tilesetIndex];
        this.imageVisited = tileSetsVisetedlist[tilesetIndex];
    }
    getCurrentTileIndex(){
        return this.index;
    }
}
const TILE_SET = new TileSet();
