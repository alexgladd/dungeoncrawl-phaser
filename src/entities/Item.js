// item entity
import SpriteEntity from './SpriteEntity';
import EntityScene from '../scenes/EntityScene';

/**
 * @typedef ItemType
 * @type {('weapon'|'armor'|'jewel'|'potion')}
 */

/**
 * @typedef ItemStats
 * @type {object}
 * @property {number?} bonusAttack
 * @property {number?} bonusDefense
 * @property {number?} bonusAccuracy
 * @property {number?} bonusDodge
 * @property {number?} healHp
 * @property {number?} damageHp
 */

/**
 * Item types
 */
const ItemTypes = {
  weapon: 'weapon',
  armor: 'armor',
  jewel: 'jewel',
  potion: 'potion'
};

/**
 * @typedef ItemData
 * @type {object}
 * @property {number} level
 * @property {ItemType} type
 * @property {string} name
 * @property {ItemStats} stats
 * @property {number} frame
 * @property {number?} tint
 */

/**
 * Item class
 */
export default class Item extends SpriteEntity {
  /**
   * @static
   * @returns {Object<symbol, ItemType>} the available item types
   */
  static get types() {
    return ItemTypes;
  }

  /**
   * Constructor
   * @param {EntityScene} scene 
   * @param {ItemData} data 
   * @param {number?} x 
   * @param {number?} y 
   * @param {string?} texture 
   */
  constructor(scene, data,  x=0, y=0, texture='sprites') {
    super(scene, x, y, data.frame, texture);

    this.itemData = data;
    this.isPassable = true;
  }

  start() {
    super.start();

    if (this.itemData.tint) {
      this.sprite.setTint(this.itemData.tint);
    }

    this.sprite.setInteractive({ cursor: 'help' });
    this.sprite.on('pointerdown', () => {
      // TODO log item info
      console.log(`Item ${this.itemData.name}`, this.itemData);
    });
  }
}
