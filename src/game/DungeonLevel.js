// generate a dungeon level

import Dungeoneer from 'dungeoneer';

export default class DungeonLevel {
  constructor(rooms, tiles, level=0) {
    this._rooms = rooms;
    this._tiles = tiles;
    this._level = level;
  }

  /**
   * @returns {number} the width of the level in tiles
   */
  get tileWidth() {
    return this._tiles.length;
  }

  /**
   * @returns {number} the height of the level in tiles
   */
  get tileHeight() {
    return this._tiles[0].length;
  }

  /**
   * @returns {Array<object>} the list of rooms in the level
   */
  get rooms() {
    return this._rooms;
  }

  /**
   * @returns {Array<Array<object>>} the 2D array of tiles in the level ([x[y]]
   */
  get tiles() {
    return this._tiles;
  }

  /**
   * @returns {object} the player spawn room for the level
   */
  get spawnRoom() {
    if (!this._spawnRoom) this._createLocations();

    return this._spawnRoom;
  }

  /**
   * @returns {import('./Position').Position} the spawn location (game position) for the player in
   * the level
   */
  get spawnLocation() {
    if (!this._spawnLocation) {
      this._createLocations();
    }

    return this._spawnLocation;
  }

  /**
   * @returns {object} the level exit room for the level
   */
  get exitRoom() {
    if (!this._exitRoom) this._createLocations();
    
    return this._exitRoom;
  }

  /**
   * @returns {import('./Position').Position} the exit location (game position) for the level
   */
  get exitLocation() {
    if (!this._exitLocation) {
      this._createLocations();
    }

    return this._exitLocation;
  }

  /**
   * @returns {Array<Array<number>>} the 2D level data to use for a scene TileMap ([y[x]])
   */
  get levelData() {
    if (!this._levelData) {
      this._buildLevelData();
    }

    return this._levelData;
  }

  /**
   * Checks if the given game position is passable in the level
   * @param {import('./Position').Position} pos the game position to check
   * @returns {boolean} true if the position is passable, false otherwise
   */
  isPassable(pos={ x: 0, y: 0 }) {
    if (!pos) {
      return false;
    } else if (pos.x > this.tileWidth || pos.y > this.tileHeight) {
      return false;
    } else if (this._tiles[pos.x][pos.y].type === 'wall') {
      return false;
    } else {
      return true;
    }
  }

  /**
   * Determine the spawn and exit rooms and locations for the level
   */
  _createLocations() {
    this._spawnRoomIdx = Math.floor(Math.random() * this._rooms.length);
    const spawnRoom = this._rooms[this._spawnRoomIdx];
    const spawnMid = DungeonLevel.getRoomMiddle(spawnRoom);

    let greatestDistance = 0.0;
    let exitRoom;
    for(let i = 0; i < this._rooms.length; i++) {
      if (i === this._spawnRoomIdx) continue;

      const room = this._rooms[i];
      const roomMid = DungeonLevel.getRoomMiddle(room);
      const distance = Math.sqrt(Math.abs(roomMid.x - spawnMid.x) + Math.abs(roomMid.y - spawnMid.y));

      if (distance > greatestDistance) {
        greatestDistance = distance;
        exitRoom = room;
      }
    }

    console.log('Spawn room', spawnRoom);
    console.log('Exit room', exitRoom);

    this._spawnRoom = spawnRoom;
    this._spawnLocation = DungeonLevel.getRoomMiddle(spawnRoom, true);

    this._exitRoom = exitRoom;
    this._exitLocation = DungeonLevel.getRoomMiddle(exitRoom, true);
  }

  /**
   * Build the level data to use for a scene's tilemap
   */
  _buildLevelData() {
    this._levelData = [];

    for (let y = 0; y < this._tiles.length; y++) {
      this._levelData.push([]);

      for (let x = 0; x < this._tiles[y].length; x++) {
        const tile = this._tiles[x][y];

        if (tile.type === 'wall') {
          this._levelData[y].push(2);
        } else if (this._level !== 0 && this.spawnLocation.x === x && this.spawnLocation.y === y) {
          this._levelData[y].push(195);
        } else if (this.exitLocation.x === x && this.exitLocation.y === y) {
          this._levelData[y].push(194);
        } else {
          this._levelData[y].push(0);
        }
      }
    }
  }

  /**
   * Get the middle location (game position) for the given room
   * @param {object} room the room to get the middle for
   * @param {boolean} toInt should the computed location be floored to an integer
   * @returns {import('./Position').Position} the middle of the room
   */
  static getRoomMiddle(room, toInt=false) {
    if (toInt) {
      return {
        x: room.x + Math.floor(room.width / 2.0),
        y: room.y + Math.floor(room.height / 2.0)
      };
    } else {
      return {
        x: room.x + room.width / 2.0,
        y: room.y + room.height / 2.0
      };
    }
  }

  /**
   * Get a random location (game position) within the given room
   * @param {object} room the room to get a random location for
   * @returns {import('./Position').Position} the location within the room
   */
  static randomRoomLocation(room) {
    return {
      x: room.x + Math.floor(Math.random() * room.width),
      y: room.y + Math.floor(Math.random() * room.height)
    };
  }

  /**
   * Build a new randomized level
   * @param {number} width the width of the level in tiles
   * @param {number} height the height of the level in tiles
   * @param {number} dungeonLevel the vertical level or floor of the level
   */
  static randomLevel(width, height, dungeonLevel=0) {
    const level = Dungeoneer.build({ width, height });
    return new DungeonLevel(level.rooms, level.tiles, dungeonLevel);
  }
}
