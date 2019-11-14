// passive AI

import BaseAi from './BaseAi';
import MovementController from '../game/MovementController';

export default class PassiveAi extends BaseAi {
  constructor(creature) {
    super(creature);
  }

  takeTurn() {
    this.tryRandomMove();
    // else do nothing this turn
  }

  /**
   * Attempt to move a random direction
   * @returns {boolean} true if the controlled creature moves, false otherwise
   */
  tryRandomMove() {
    let moveAttempts = 4;
    let move = MovementController.getRandomDirection();

    while (moveAttempts > 0 && !this.creature._isValidMove(move)) {
      move = MovementController.getRandomDirection();
      moveAttempts--;
    }

    if (this.creature._isValidMove(move)) {
      this.creature.translate(move);
      return true;
    } else {
      return false;
    }
  }
}
