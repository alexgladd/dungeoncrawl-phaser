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

  /**
   * @returns {number} the (scene) pixels per (game) unit for this entity
   */
  get ppu() {
    return this._ppu;
  }

  /**
   * @returns {Position} the position in game units of this entity
   */
  get gamePosition() {
    return this._gamePosition;
  }

  /**
   * @param {Position} pos the game position to move this entity to
   */
  set gamePosition(pos={ x: 0, y: 0 }) {
    this._gamePosition.x = pos.x;
    this._gamePosition.y = pos.y;

    this._scenePosition.x = pos.x * this._ppu;
    this._scenePosition.y = pos.y * this._ppu;

    this.setPosition(this.scenePosition.x, this.scenePosition.y);
  }

  /**
   * @returns {Position} the position in scene units (pixels) of this entity
   */
  get scenePosition() {
    return this._scenePosition;
  }

  /**
   * Called once when the entity get added to an EntityScene. Should be overridden by Entity
   * subclasses.
   */
  start() {
    // should be overridden
  }

  /**
   * Called once per game step. Should be overridden by Entity subclasses.
   * @param {number} time the current time
   * @param {number} delta the time in milliseconds since the last update call
   */
  update(time, delta) {
    // should be overridden
  }

  /**
   * Move the entity one unit in the given direction
   * @param {Direction} direction the direction to move the entity
   */
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

  /**
   * Move the entity one unit up
   */
  translateUp() {
    this.gamePosition = {
      x: this.gamePosition.x,
      y: this.gamePosition.y - 1
    };
  }

  /**
   * Move the entity one unit down
   */
  translateDown() {
    this.gamePosition = {
      x: this.gamePosition.x,
      y: this.gamePosition.y + 1
    };
  }

  /**
   * Move the entity one unit right
   */
  translateRight() {
    this.gamePosition = {
      x: this.gamePosition.x + 1,
      y: this.gamePosition.y
    };
  }

  /**
   * Move the entity one unit left
   */
  translateLeft() {
    this.gamePosition = {
      x: this.gamePosition.x - 1,
      y: this.gamePosition.y
    };
  }
}
