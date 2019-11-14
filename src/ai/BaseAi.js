import Creature from "../entities/Creature";
import EntityScene from "../scenes/EntityScene";

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
   * Get the scene the AI's creature belongs to
   * @returns {EntityScene} the scene the controlled creature belongs to
   */
  get scene() {
    return this.creature.scene;
  }

  /**
   * Control the creature for one turn - SHOULD BE IMPLEMENTED BY SUBCLASSES
   */
  takeTurn() {}
}
