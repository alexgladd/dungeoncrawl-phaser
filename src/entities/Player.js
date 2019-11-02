import Phaser from 'phaser';
import Creature from './Creature';
import Monster from './Monster';
import MovementController from '../game/MovementController';
import UiController from '../ui/UiController';
import Roll from '../game/Roll';

/**
 * @typedef PlayerStats
 * @type {Object}
 * @property {number} level the player's level
 * @property {number} xp the player's current experience
 * @property {number} xpToNextLevel the experience needed for the player to get to the next level
 * @property {number} maxHp the player's maximum HP
 * @property {number} hp the player's current HP
 * @property {number} attack the player's attack strength
 * @property {number} defense the player's defense strength
 * @property {number} accuracy the player's accuracy proficiency
 * @property {number} dodge the player's dodge proficiency
 */

/**
 * @typedef PlayerData
 * @type {Object}
 * @property {PlayerStats} stats the player's stats
 */

/**
 * Default player stats
 */
const DefaultPlayerStats = {
  maxHp: 10,
  hp: 10,
  attack: 2,
  xp: 0,
  xpToNextLevel: 100
};

/**
 * Player
 */
export default class Player extends Creature {
  /**
   * Player constructor
   * @param {DungeonScene} scene the scene to put the player into
   * @param {?PlayerData} playerData player data to init the player with (null for defaults)
   * @param {?number} x the player's X position
   * @param {?number} y the player's Y position
   * @param {?number} frame the spritesheet frame for the player graphic
   */
  constructor(scene, playerData=null, x=0, y=0, frame=25) {
    super(scene, playerData ? playerData.stats : DefaultPlayerStats, x, y, frame);

    this.handleInput = this.handleInput.bind(this);
  }

  /**
   * @returns {PlayerData} the player's current data
   */
  get playerData() {
    return {
      stats: { ...this.stats }
    };
  }

  start() {
    super.start();

    this.sprite.setTint(0xffff00);

    const move = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      upLeft: Phaser.Input.Keyboard.KeyCodes.Q,
      upRight: Phaser.Input.Keyboard.KeyCodes.E,
      downLeft: Phaser.Input.Keyboard.KeyCodes.Z,
      downRight: Phaser.Input.Keyboard.KeyCodes.C
    }, true, true);

    move.up.on('down', () => this.handleInput(MovementController.directions.up));
    move.down.on('down', () => this.handleInput(MovementController.directions.down));
    move.left.on('down', () => this.handleInput(MovementController.directions.left));
    move.right.on('down', () => this.handleInput(MovementController.directions.right));
    move.upLeft.on('down', () => this.handleInput(MovementController.directions.upLeft));
    move.upRight.on('down', () => this.handleInput(MovementController.directions.upRight));
    move.downLeft.on('down', () => this.handleInput(MovementController.directions.downLeft));
    move.downRight.on('down', () => this.handleInput(MovementController.directions.downRight));
  }

  update(time, delta) {
    
  }

  handleInput(direction) {
    const adjEntity = this.scene.getAdjacentEntity(this, direction);

    if (adjEntity) {
      // attack the adjacent entity if it's a monster
      if (adjEntity instanceof Monster) {
        this.attack(adjEntity);
        UiController.updateEnemy(adjEntity);
        this.scene.startAiTurn();
      }
    } else if (!MovementController.isDiagonal(direction) &&
        MovementController.canMove(this, direction, this.scene.map)) {
      this.translate(direction);
      UiController.clearEnemy();
      this.scene.startAiTurn();
    }
  }

  /**
   * Reward the given amount of experience to the player
   * @param {number} xp the amount of experience to gain
   */
  addExperience(xp) {
    this.stats.xp += xp;

    UiController.addLogMessage(`You gain ${xp} experience`);

    if (this.stats.xp >= this.stats.xpToNextLevel) {
      this._levelUp();
      UiController.addLogMessage(`You've reached level ${this.stats.level}!`);
    }

    UiController.updatePlayerStats(this);
  }

  /**
   * Heal the player for the given amount of HP
   * @param {number} hp the amount of HP to heal the player for
   */
  heal(hp) {
    this.stats.hp = Math.min(this.stats.hp + hp, this.stats.maxHp);
  }

  /**
   * Have the player rest for one turn
   */
  rest() {
    this.heal(Math.floor(this.stats.maxHp / 10.0));
    this.scene.startAiTurn();
  }

  /**
   * Advance the player to the next level
   */
  _levelUp() {
    this.stats.level += 1;
    this.stats.xp = this.stats.xp % this.stats.xpToNextLevel;
    this.stats.xpToNextLevel = 100 * this.stats.level;
    this.stats.maxHp += 10;
    this.stats.hp = this.stats.maxHp;

    if (this.stats.level % 2 === 0) this.stats.attack += 1;
    if (this.stats.level % 3 === 0) this.stats.defense += 1;
  }

  /**
   * Handle the results of an attack
   * @param {import('./Creature').CombatResult} result the combat results
   */
  _postAttack(result) {
    if (result.didHit && result.hit === Roll.criticalSuccess) {
      UiController.addLogMessage(`You critically hit the ${result.defender.type} for ${result.damage} damage`);
    } else if (result.didHit) {
      UiController.addLogMessage(`You hit the ${result.defender.type} for ${result.damage} damage`);
    } else {
      UiController.addLogMessage(`You miss the ${result.defender.type}`);
    }
  }
}
