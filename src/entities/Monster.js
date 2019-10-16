import SpriteEntity from './SpriteEntity';
import MovementController from '../game/MovementController';

export default class Monster extends SpriteEntity {
  constructor(scene, x=0, y=0, frame=282) {
    super(scene, x, y, frame);
  }

  start() {
    super.start();

    this.sprite.setTint(0xb5651d);
  }

  aiTurn() {
    let attempts = 4;
    let move = MovementController.getRandomDirection();

    while (attempts > 0 && !this._isValidMove(move)) {
      move = MovementController.getRandomDirection();
      attempts--;
    }

    if (this._isValidMove(move)) {
      this.translate(move);
    }
    // else do nothing this turn
  }

  _isValidMove(direction) {
    if (this.scene.getAdjacentEntity(this, direction)) {
      return false;
    } else {
      return MovementController.canMove(this, direction, this.scene.map);
    }
  }
}
