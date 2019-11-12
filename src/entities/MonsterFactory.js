// shortcuts for generating monsters

import Monster from './Monster';
import EntityScene from '../scenes/EntityScene';
import Util from '../game/Util';
import AI from '../ai';
import monsterStats from './monsters.json';

/**
 * All available monsters arranged by level
 * @type {Array<Array<import('./Monster').MonsterType>>}
 */
const LevelMonsters = [
  [Monster.types.crab],
  [Monster.types.spider],
  [Monster.types.rat, Monster.types.bat]
];

/**
 * Create a new monster of the given type for the given scene
 * @param {import('./Monster').MonsterType} type the type of monster to create
 * @param {EntityScene} scene the scene to create the monster for
 * @param {number} x the game position x value to create the monster at
 * @param {number} y the game position y value to create the monster at
 * @returns {Monster} a new instance of the given monster type
 */
const createMonster = (type, scene, x=0, y=0) => {
  switch (type) {
    case Monster.types.crab:
      // const crabStats = { level: 0, maxHp: 1, hp: 1, defense: 0, rewardXp: 10 };
      return new Monster(scene, type, monsterStats.crab, AI.types.passive, 0x189BD5, x, y, 185);

    case Monster.types.spider:
      // const spiderStats = { level: 1, maxHp: 2, hp: 2, defense: 0, rewardXp: 15 };
      return new Monster(scene, type, monsterStats.spider, AI.types.passive, 0x875303, x, y, 190);

    case Monster.types.rat:
      // const ratStats = { level: 2, maxHp: 3, hp: 3, attack: 2, defense: 1, rewardXp: 20 };
      return new Monster(scene, type, monsterStats.rat, AI.types.passive, 0xC6AB82, x, y, 287);

    case Monster.types.bat:
      // const batStats = { level: 2, maxHp: 2, hp: 2, attack: 2, defense: 1, rewardXp: 20 };
      return new Monster(scene, type, monsterStats.bat, AI.types.passive, 0x6C92B8, x, y, 282);

    default:
      console.error('Invalid monster type requested', type);
      return null;
  }
}

/**
 * Create a new random monster up to the given monster level for the given scene
 * @param {EntityScene} scene the scene to create the monster for
 * @param {number} upToLevel the monster level up to which to choose randomly from (inclusive)
 * @param {number} x the game position x value to create the monster at
 * @param {number} y the game position y value to create the monster at
 * @returns {Monster} a new instance of a random monster type
 */
const createRandomMonster = (scene, upToLevel=LevelMonsters.length, x=0, y=0) => {
  const level = Util.clamp(Math.floor(Math.random() * (upToLevel + 1)), 0, LevelMonsters.length - 1);
  const type = LevelMonsters[level][Math.floor(Math.random() * LevelMonsters[level].length)];
  return createMonster(type, scene, x, y);
}

export default {
  createMonster,
  createRandomMonster
}
