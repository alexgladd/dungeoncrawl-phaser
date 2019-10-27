// manage entity movement

/**
 * @typedef Direction
 * @type {('UP'|'DOWN'|'LEFT'|'RIGHT'|'UP_LEFT'|'UP_RIGHT'|'DOWN_LEFT'|'DOWN_RIGHT')}
 */

/**
 * Game directions enum
 * @enum {string}
 */
const directions = {
  up: 'UP',
  right: 'RIGHT',
  down: 'DOWN',
  left: 'LEFT',
  upLeft: 'UP_LEFT',
  upRight: 'UP_RIGHT',
  downLeft: 'DOWN_LEFT',
  downRight: 'DOWN_RIGHT'
};

/**
 * Get a random direction
 * @param {?boolean} diagonals whether to include diagonals
 * @returns {Direction} a random direction
 */
const getRandomDirection = (diagonals=false) => {
  const dirs = Object.values(directions);

  if (diagonals) {
    return dirs[Math.floor(Math.random() * dirs.length)];
  } else {
    return dirs[Math.floor(Math.random() * 4)];
  }
}

/**
 * Check if the given direction is a diagonal
 * @param {Direction} direction the direction to check
 * @returns {boolean} true if the given direction is a diagonal
 */
const isDiagonal = (direction) => {
  return [
    directions.upLeft,
    directions.upRight,
    directions.downLeftf,
    directions.downRight ].includes(direction);
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

    case directions.upLeft:
      return canMoveUpLeft(entity, map);

    case directions.upRight:
      return canMoveUpRight(entity, map);

    case directions.downLeft:
      return canMoveDownLeft(entity, map);

    case directions.downRight:
      return canMoveDownRight(entity, map);
    
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

/**
 * Check whether the given entity can move diagonally up/left on the given level
 * @param {Entity} entity the entity to check movement for
 * @param {DungeonLevel} map the map to use for the movement check
 */
const canMoveUpLeft = (entity, map) => {
  const nextPos = {
    x: entity.gamePosition.x - 1,
    y: entity.gamePosition.y - 1
  };

  return map.isPassable(nextPos);
}

/**
 * Check whether the given entity can move diagonally up/right on the given level
 * @param {Entity} entity the entity to check movement for
 * @param {DungeonLevel} map the map to use for the movement check
 */
const canMoveUpRight = (entity, map) => {
  const nextPos = {
    x: entity.gamePosition.x + 1,
    y: entity.gamePosition.y - 1
  };

  return map.isPassable(nextPos);
}

/**
 * Check whether the given entity can move diagonally down/left on the given level
 * @param {Entity} entity the entity to check movement for
 * @param {DungeonLevel} map the map to use for the movement check
 */
const canMoveDownLeft = (entity, map) => {
  const nextPos = {
    x: entity.gamePosition.x - 1,
    y: entity.gamePosition.y + 1
  };

  return map.isPassable(nextPos);
}

/**
 * Check whether the given entity can move diagonally down/right on the given level
 * @param {Entity} entity the entity to check movement for
 * @param {DungeonLevel} map the map to use for the movement check
 */
const canMoveDownRight = (entity, map) => {
  const nextPos = {
    x: entity.gamePosition.x + 1,
    y: entity.gamePosition.y + 1
  };

  return map.isPassable(nextPos);
}

export default {
  directions,
  getRandomDirection,
  isDiagonal,
  canMove,
  canMoveUp,
  canMoveDown,
  canMoveLeft,
  canMoveRight,
  canMoveUpLeft,
  canMoveUpRight,
  canMoveDownLeft,
  canMoveDownRight
}
