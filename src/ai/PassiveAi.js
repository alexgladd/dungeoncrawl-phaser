// passive AI

import BaseAi from './BaseAi';
import MovementController from '../game/MovementController';

export default class PassiveAi extends BaseAi {
  constructor(creature) {
    super(creature);
  }

  takeTurn() {
    let moveAttempts = 4;
    let move = MovementController.getRandomDirection();

    while (moveAttempts > 0 && !this.creature._isValidMove(move)) {
      move = MovementController.getRandomDirection();
      moveAttempts--;
    }

    if (this.creature._isValidMove(move)) {
      this.creature.translate(move);
    }
    // else do nothing this turn
  }
}
