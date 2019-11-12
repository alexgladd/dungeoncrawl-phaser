import Creature from "../entities/Creature";

/**
 * Base AI class - SHOULD NOT BE INSTANTIATED
 */
export default class BaseAi {
  /**
   * Constructor
   * @param {Creature} creature the creature to control
   */
  constructor(creature) {
    this.creature = creature;
  }

  /**
   * Control the creature for one turn - SHOULD BE IMPLEMENTED BY SUBCLASSES
   */
  takeTurn() {}
}
