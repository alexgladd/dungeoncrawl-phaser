import Creature from './Creature';
import MovementController from '../game/MovementController';
import UiController from '../ui/UiController';
import Player from './Player';
import AI from '../ai';
import EntityScene from '../scenes/EntityScene';

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

  /**
   * Constructor
   * @param {EntityScene} scene the scene to add the monster to
   * @param {MonsterType} type the type of the monster
   * @param {object} stats the monster's stats
   * @param {import('../ai').AiType} aiType the type of AI to use for the monster
   * @param {number} tint the color to tint the monster's sprite
   * @param {number} x the game position x
   * @param {number} y the game position y
   * @param {number} frame the frame number of the monster's sprite
   */
  constructor(scene, type, stats={}, aiType, tint=null, x=0, y=0, frame=282) {
    super(scene, stats, x, y, frame);

    this._type = type;
    this._tint = tint;

    this.ai = AI.initAi(aiType, this);
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
    this.ai.takeTurn();
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
