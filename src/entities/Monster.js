import Creature from './Creature';
import MovementController from '../game/MovementController';
import UiController from '../ui/UiController';
import Player from './Player';

/**
 * @typedef MonsterType
 * @type {('crab'|'spider'|'rat'|'bat')}
 */

/**
 * Monster types enum
 * @type {Object<symbol, MonsterType>}
 */
const MonsterTypes = {
  crab: 'crab',
  spider: 'spider',
  rat: 'rat',
  bat: 'bat'
};

export default class Monster extends Creature {
  /**
   * @static
   * @returns {Object<symbol, MonsterType>} the available monster types
   */
  static get types() {
    return MonsterTypes;
  }

  constructor(scene, type, stats={}, tint=null, x=0, y=0, frame=282) {
    super(scene, stats, x, y, frame);

    this._type = type;
    this._tint = tint;
  }

  get type() {
    return this._type;
  }

  start() {
    super.start();

    if (this._tint) {
      this.sprite.setTint(this._tint);
    }

    this.sprite.setInteractive({ cursor: 'help' });
    this.sprite.on('pointerdown', () => {
      UiController.updateEnemy(this);
    });
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

  _preDeath() {
    if (this.lastAttacker && this.lastAttacker instanceof Player) {
      // killed by the player, reward xp
      UiController.addLogMessage(`You kill the ${this.type}`);
      this.lastAttacker.addExperience(this.stats.rewardXp);
    } else {
      UiController.addLogMessage(`The ${this.type} dies`);
    }
  }
}
