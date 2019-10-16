// generate a dungeon level

import Dungeoneer from 'dungeoneer';
import { posix } from 'path';

export default class DungeonLevel {
  constructor(rooms, tiles, level=0) {
    this._rooms = rooms;
    this._tiles = tiles;
    this._level = level;
  }

  get tileWidth() {
    return this._tiles.length;
  }

  get tileHeight() {
    return this._tiles[0].length;
  }

  get rooms() {
    return this._rooms;
  }

  get tiles() {
    return this._tiles;
  }

  get spawnRoom() {
    if (!this._spawnRoom) this._createLocations();

    return this._spawnRoom;
  }

  get spawnLocation() {
    if (!this._spawnLocation) {
      this._createLocations();
    }

    return this._spawnLocation;
  }

  get exitRoom() {
    if (!this._exitRoom) this._createLocations();
    
    return this._exitRoom;
  }

  get exitLocation() {
    if (!this._exitLocation) {
      this._createLocations();
    }

    return this._exitLocation;
  }

  get levelData() {
    if (!this._levelData) {
      this._buildLevelData();
    }

    return this._levelData;
  }

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

  static randomRoomLocation(room) {
    return {
      x: room.x + Math.floor(Math.random() * room.width),
      y: room.y + Math.floor(Math.random() * room.height)
    };
  }

  static randomLevel(width, height, dungeonLevel=0) {
    const level = Dungeoneer.build({ width, height });
    return new DungeonLevel(level.rooms, level.tiles, dungeonLevel);
  }
}
