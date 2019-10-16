// creatures have life, can move, and can attack other creatures

import SpriteEntity from './SpriteEntity';
import Roll from '../game/Roll';
import Util from '../game/Util';

const DefaultStats = {
  level: 1,
  maxHp: 1,
  hp: 1,
  attack: 1,
  defense: 1,
  accuracy: 0,
  dodge: 0
};

const CriticalSuccess = 999;
const CriticalFailure = 0;

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
      return CriticalSuccess;
    } else if (roll === 1) {
      return CriticalFailure;
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
      return CriticalSuccess;
    } else if (roll === 1) {
      return CriticalFailure;
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

    if (hit === CriticalSuccess) {
      // always hit
      this._attackHit(creature, hit);
    } else if (hit === CriticalFailure) {
      // always miss
      this._attackMiss(hit);
    } else {
      const dodge = Util.clamp(creature.dodgeChance - hit, 0, 20);

      if (dodge === CriticalSuccess) {
        // always dodge
        this._attackMiss(hit, dodge);
      } else if (dodge === CriticalFailure) {
        // always fail to dodge
        this._attackHit(creature, hit, dodge);
      } else if (hit > dodge) {
        // hit
        this._attackHit(creature, hit, dodge);
      } else {
        // miss
        this._attackMiss(hit, dodge);
      }
    }
  }

  /**
   * Have this creature take HP damage
   * @param {number} damage the amound of HP damage to take
   */
  takeDamage(damage) {
    const newHp = this.stats.hp - damage;
    this.stats.hp = newHp;

    if (this.stats.hp <= 0) {
      // TODO this creature dies
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
    const damage = Math.max(atkPower - defPower, 0);

    console.log(`${this.constructor.name}'s attack hits [ hit=${hit} dodge=${dodge} atk=${atkPower} def=${defPower} dmg=${damage} ]`)

    creature.takeDamage(damage);
  }

  /**
   * Resolve an attack with a miss
   * @param {number} hit the hit chance for the failed attack
   * @param {number} dodge the dodge chance for the failed attack
   */
  _attackMiss(hit, dodge=null) {
    console.log(`${this.constructor.name}'s attack misses [ hit=${hit} dodge=${dodge} ]`);
  }
}
