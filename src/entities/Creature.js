// creatures have life, can move, and can attack other creatures

import SpriteEntity from './SpriteEntity';
import Roll from '../game/Roll';
import Util from '../game/Util';

/**
 * @typedef CombatResult
 * @type {Object}
 * @property {Creature} attacker the attacking creature
 * @property {Creature} defender the defending creature
 * @property {boolean} didHit whether the attack hit
 * @property {number} hit the hit chance
 * @property {?number} dodge the dodge chance
 * @property {?number} attack the attack strength
 * @property {?number} defense the defense strength
 * @property {?number} damage the attack damage
 */

/**
 * Default stats for a Creature
 */
const DefaultStats = {
  level: 1,
  maxHp: 1,
  hp: 1,
  attack: 1,
  defense: 1,
  accuracy: 0,
  dodge: 0
};

export default class Creature extends SpriteEntity {
  constructor(scene, stats=DefaultStats, x=0, y=0, frame=0) {
    super(scene, x, y, frame);

    this.stats = { ...DefaultStats, ...stats };
  }

  /**
   * @returns {number} a calculated hit chance for this creature
   */
  get hitChance() {
    const roll = Roll.d20();

    if (roll === 20) {
      return Roll.criticalSuccess;
    } else if (roll === 1) {
      return Roll.criticalFailure;
    } else {
      return Util.clamp(roll + this.stats.accuracy, 0, 20);
    }
  }

  /**
   * @returns {number} a calculated dodge chance for this creature
   */
  get dodgeChance() {
    const roll = Roll.d20();

    if (roll === 20) {
      return Roll.criticalSuccess;
    } else if (roll === 1) {
      return Roll.criticalFailure;
    } else {
      return Util.clamp(roll + this.stats.dodge, 0, 20);
    }
  }

  /**
   * @returns {number} a calculated attack power for this creature
   */
  get attackPower() {
    return Roll.dN(this.stats.attack);
  }

  /**
   * @returns {number} a calculated defense power for this creature
   */
  get defensePower() {
    if (this.stats.defense <= 1) {
      return Util.clamp(this.stats.defense);
    } else {
      const halfDef = Math.floor(this.stats.defense / 2.0);
      return halfDef + Roll.dN(halfDef);
    }
  }

  /**
   * Attack another creature
   * @param {Creature} creature 
   */
  attack(creature) {
    const hit = this.hitChance;

    if (hit === Roll.criticalSuccess) {
      // always hit
      this._attackHit(creature, hit);
    } else if (hit === Roll.criticalFailure) {
      // always miss
      this._attackMiss(creature, hit);
    } else {
      const dodge = Util.clamp(creature.dodgeChance - hit, 0, 20);

      if (dodge === Roll.criticalSuccess) {
        // always dodge
        this._attackMiss(creature, hit, dodge);
      } else if (dodge === Roll.criticalFailure) {
        // always fail to dodge
        this._attackHit(creature, hit, dodge);
      } else if (hit > dodge) {
        // hit
        this._attackHit(creature, hit, dodge);
      } else {
        // miss
        this._attackMiss(creature, hit, dodge);
      }
    }
  }

  /**
   * Have this creature take HP damage
   * @param {number} damage the amound of HP damage to take
   */
  takeDamage(damage) {
    const newHp = Math.max(0, this.stats.hp - damage);
    this.stats.hp = newHp;

    if (this.stats.hp <= 0) {
      // TODO this creature dies
      this._preDeath();
      this.scene.removeEntity(this);
    }
  }

  /**
   * Resolve an attack with a hit
   * @param {Creature} creature the creature being attacked
   * @param {number} hit the hit chance for the attack
   * @param {number} dodge the dodge chance for the attack
   */
  _attackHit(creature, hit, dodge=null) {
    const atkPower = this.attackPower;
    const defPower = creature.defensePower;

    /**
     * @type {CombatResult}
     */
    const result = {
      attacker: this,
      defender: creature,
      didHit: true,
      hit,
      dodge,
      attack: atkPower,
      defense: defPower,
      damage: Math.max(atkPower - defPower, 0)
    };

    console.log(`${this.constructor.name}'s attack hits [ hit=${hit} dodge=${dodge} atk=${result.attack} def=${result.defense} dmg=${result.damage} ]`)

    this._postAttack(result);
    creature.takeDamage(result.damage);
  }

  /**
   * Resolve an attack with a miss
   * @param {Creature} creature the creature being attacked
   * @param {number} hit the hit chance for the failed attack
   * @param {number} dodge the dodge chance for the failed attack
   */
  _attackMiss(creature, hit, dodge=null) {
    /**
     * @type {CombatResult}
     */
    const result = {
      attacker: this,
      defender: creature,
      didHit: false,
      hit,
      dodge
    };

    console.log(`${this.constructor.name}'s attack misses [ hit=${hit} dodge=${dodge} ]`);

    this._postAttack(result);
  }

  /**
   * Called when the creature is about to die; should be overridden by subclasses.
   */
  _preDeath() {

  }

  /**
   * Called after this creature completes an attack; should be overridden by subclasses.
   * @param {CombatResult} result the results of the combat
   */
  _postAttack(result) {

  }
}
