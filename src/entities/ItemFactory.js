// item factory
import Item from './Item';
import Util from '../game/Util';
import items from './items.json';
import EntityScene from '../scenes/EntityScene';

/**
 * All available items arranged by level
 * @type {Array<Array<import('./Item').ItemData>>}
 */
const ItemsByLevel = items.reduce((acc, item) => {
  if (!acc[item.level]) {
    acc[item.level] = [];
  }

  acc[item.level].push(item);

  return acc;
}, []);

/**
 * Create a random item
 * @param {EntityScene} scene the scene to create the item for
 * @param {number?} upToLevel the item level up to which to choose the item from
 * @param {number?} x the game position x to create the item at
 * @param {number?} y the game position y to create the item at
 * @returns {Item} the instance of the created item
 */
const createRandomItem = (scene, upToLevel=ItemsByLevel.length, x=0, y=0) => {
  const level = Util.clamp(Math.floor(Math.random() * (upToLevel + 1)), 0, ItemsByLevel.length - 1);
  const itemData = ItemsByLevel[level][Math.floor(Math.random() * ItemsByLevel[level].length)];
  return new Item(scene, itemData, x, y);
}

export default {
  createRandomItem
}
