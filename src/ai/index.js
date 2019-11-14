// ai stuff

import BaseAi from './BaseAi';
import PassiveAi from './PassiveAi';
import Creature from '../entities/Creature';
import DefensiveAi from './DefensiveAi';

/**
 * @typedef AiType
 * @type {('passive'|'defensive'|'aggressive')}
 */

/**
 * Available AI types
 */
const AiTypes = {
  passive: 'passive',
  defensive: 'defensive',
  aggressive: 'aggressive'
};

/**
 * Create an AI of the given type for the given creature
 * @param {AiType} type the type of AI to create
 * @param {Creature} creature the creature to create the AI for
 * @returns {BaseAi} a subclass of BaseAi of the requested type
 */
const initAi = (type, creature) => {
  switch (type) {
    case AiTypes.passive:
      return new PassiveAi(creature);

    case AiTypes.defensive:
      return new DefensiveAi(creature);

    default:
      return null;
  }
}

export default {
  types: AiTypes,
  initAi
}
