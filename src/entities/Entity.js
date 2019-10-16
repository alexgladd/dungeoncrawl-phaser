import Phaser from 'phaser';
import MovementController from '../game/MovementController';

export default class Entity extends Phaser.GameObjects.Container {
  constructor(scene, x=0, y=0, ppu=16) {
    super(scene, x * ppu, y * ppu);

    this._gamePosition = {
      x: x,
      y: y
    };

    this._scenePosition = {
      x: x * ppu,
      y: y * ppu
    };

    this._ppu = ppu;
  }

  get ppu() {
    return this._ppu;
  }

  get gamePosition() {
    return this._gamePosition;
  }

  set gamePosition(pos={ x: 0, y: 0 }) {
    this._gamePosition.x = pos.x;
    this._gamePosition.y = pos.y;

    this._scenePosition.x = pos.x * this._ppu;
    this._scenePosition.y = pos.y * this._ppu;

    this.setPosition(this.scenePosition.x, this.scenePosition.y);
  }

  get scenePosition() {
    return this._scenePosition;
  }

  start() {
    // should be overridden
  }

  update(time, delta) {
    // should be overridden
  }

  translate(direction) {
    switch (direction) {
      case MovementController.directions.up:
        this.translateUp();
        break;
      
      case MovementController.directions.down:
        this.translateDown();
        break;

      case MovementController.directions.left:
        this.translateLeft();
        break;

      case MovementController.directions.right:
        this.translateRight();
        break;
    }
  }

  translateUp() {
    this.gamePosition = {
      x: this.gamePosition.x,
      y: this.gamePosition.y - 1
    };
  }

  translateDown() {
    this.gamePosition = {
      x: this.gamePosition.x,
      y: this.gamePosition.y + 1
    };
  }

  translateRight() {
    this.gamePosition = {
      x: this.gamePosition.x + 1,
      y: this.gamePosition.y
    };
  }

  translateLeft() {
    this.gamePosition = {
      x: this.gamePosition.x - 1,
      y: this.gamePosition.y
    };
  }
}
