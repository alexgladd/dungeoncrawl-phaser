// manage entity movement

/**
 * @typedef Direction
 * @type {('UP'|'DOWN'|'LEFT'|'RIGHT')}
 */

/**
 * Game directions enum
 * @enum {string}
 */
const directions = {
  up: 'UP',
  right: 'RIGHT',
  down: 'DOWN',
  left: 'LEFT'
};

/**
 * @returns {Direction} a random direction
 */
const getRandomDirection = () => {
  const dirs = Object.values(directions);
  return dirs[Math.floor(Math.random() * dirs.length)];
}

/**
 * Check whether the entity can move the given direction on the given level
 * @param {Entity} entity the entity to check movement for
 * @param {Direction} direction the direction to check movement
 * @param {DungeonLevel} map the map to use for the movement check
 */
const canMove = (entity, direction, map) => {
  switch (direction) {
    case directions.up:
      return canMoveUp(entity, map);
    
    case directions.down:
      return canMoveDown(entity, map);
    
    case directions.left:
      return canMoveLeft(entity, map);
    
    case directions.right:
      return canMoveRight(entity, map);
    
    default:
      return false;
  }
}

/**
 * Check whether the given entity can move up on the given level
 * @param {Entity} entity the entity to check movement for
 * @param {DungeonLevel} map the map to use for the movement check
 */
const canMoveUp = (entity, map) => {
  const nextPos = {
    x: entity.gamePosition.x,
    y: entity.gamePosition.y - 1
  };

  return map.isPassable(nextPos);
}

/**
 * Check whether the given entity can move down on the given level
 * @param {Entity} entity the entity to check movement for
 * @param {DungeonLevel} map the map to use for the movement check
 */
const canMoveDown = (entity, map) => {
  const nextPos = {
    x: entity.gamePosition.x,
    y: entity.gamePosition.y + 1
  };

  return map.isPassable(nextPos);
}

/**
 * Check whether the given entity can move left on the given level
 * @param {Entity} entity the entity to check movement for
 * @param {DungeonLevel} map the map to use for the movement check
 */
const canMoveLeft = (entity, map) => {
  const nextPos = {
    x: entity.gamePosition.x - 1,
    y: entity.gamePosition.y
  };

  return map.isPassable(nextPos);
}

/**
 * Check whether the given entity can move right on the given level
 * @param {Entity} entity the entity to check movement for
 * @param {DungeonLevel} map the map to use for the movement check
 */
const canMoveRight = (entity, map) => {
  const nextPos = {
    x: entity.gamePosition.x + 1,
    y: entity.gamePosition.y
  };

  return map.isPassable(nextPos);
}

export default {
  directions,
  getRandomDirection,
  canMove,
  canMoveUp,
  canMoveDown,
  canMoveLeft,
  canMoveRight
}
