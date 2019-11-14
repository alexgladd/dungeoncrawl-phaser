// defensive AI

import PassiveAi from './PassiveAi';
import MovementController from '../game/MovementController';
import Player from '../entities/Player';

export default class DefensiveAi extends PassiveAi {
  constructor(creature) {
    super(creature);
  }

  takeTurn() {
    if (!this.tryAttackAdjacentPlayer()) {
      this.tryRandomMove();
    }
  }

  /**
   * Try to find and attack an adjacent player
   * @returns {boolean} true if the controlled creature attacks, false otherwise
   */
  tryAttackAdjacentPlayer() {
    let result = false;
    const dirs = Object.values(MovementController.directions);
    
    let i = 0;
    while (i < dirs.length) {
      const entity = this.scene.getAdjacentEntity(this.creature, dirs[i]);

      if (entity && entity instanceof Player) {
        // attack the player
        this.creature.attack(entity);
        result = true;
        break;
      }

      i++;
    }

    return result;
  }
}
