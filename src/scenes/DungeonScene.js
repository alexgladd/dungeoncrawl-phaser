import EntityScene from './EntityScene';
import Player from '../entities/Player';
import Monster from '../entities/Monster';
import MonsterFactory from '../entities/MonsterFactory';
import DungeonLevel from '../game/DungeonLevel';
import TurnController from '../game/TurnController';
import UiController from '../ui/UiController';
import InputController from '../game/InputController';
import MovementController from '../game/MovementController';
import spritesheet from '../assets/spritesheet.png';

export default class DungeonScene extends EntityScene {
  constructor(level=0) {
    super(`dungeon-level-${level}`);

    this.dungeonLevel = level;
    this.turnController = new TurnController();
  }

  preload() {
    this.load.spritesheet('sprites', spritesheet, {
      frameWidth: 16,
      frameHeight: 16,
      spacing: 1
    });
  }

  create(data) {
    this._createMap();
    this._spawnPlayer();
    this._spawnMonsters();

    UiController.addLogMessage(`You enter dungeon level ${this.dungeonLevel}`);

    this.input.keyboard.on('keydown', this.handleInput, this);
  }

  update(time, delta) {
    this.cameras.main.centerOn(this.player.scenePosition.x + 8, this.player.scenePosition.y + 8);
  }

  handleInput(event) {
    // console.log('Input args', event.key);
  }

  startAiTurn() {
    for (let i = 0; i < this.monsters.length; i++) {
      this.monsters[i].aiTurn();
    }
  }

  removeEntity(entity) {
    super.removeEntity(entity);

    if (this.monsters.includes(entity)) {
      this.monsters.splice(this.monsters.findIndex(e => e === entity), 1);
    }
  }

  _createMap() {
    this._map = DungeonLevel.randomLevel(51, 51, this.dungeonLevel);

    const tilemap = this.make.tilemap({
      data: this.map.levelData,
      tileWidth: 16, tileHeight: 16,
      width: 3, height: 3
    });

    const tileset = tilemap.addTilesetImage('sprites', 'sprites', 16, 16, 0, 1);
    tilemap.createStaticLayer(0, tileset, 0, 0);

    this.cameras.main.setBounds(0, 0, this.map.tileWidth * 16, this.map.tileHeight * 16);
  }

  _spawnPlayer() {
    this.player = new Player(this, this.map.spawnLocation.x, this.map.spawnLocation.y);
    this.addEntity(this.player);
    UiController.updatePlayerStats(this.player);
  }

  _spawnMonsters() {
    this.monsters = [];
    const rooms = this.map.rooms;

    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i];
      if (room === this.map.spawnRoom) continue;

      const rPos = DungeonLevel.randomRoomLocation(room);
      const monster = MonsterFactory.createRandomMonster(this, this.dungeonLevel, rPos.x, rPos.y);

      this.addEntity(monster);
      this.monsters.push(monster);
    }
  }
}
