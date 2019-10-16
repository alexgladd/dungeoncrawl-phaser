// manage entity movement

const directions = {
  up: 'UP',
  right: 'RIGHT',
  down: 'DOWN',
  left: 'LEFT'
};

const getRandomDirection = () => {
  const dirs = Object.values(directions);
  return dirs[Math.floor(Math.random() * dirs.length)];
}

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

const canMoveUp = (entity, map) => {
  const nextPos = {
    x: entity.gamePosition.x,
    y: entity.gamePosition.y - 1
  };

  return map.isPassable(nextPos);
}

const canMoveDown = (entity, map) => {
  const nextPos = {
    x: entity.gamePosition.x,
    y: entity.gamePosition.y + 1
  };

  return map.isPassable(nextPos);
}

const canMoveLeft = (entity, map) => {
  const nextPos = {
    x: entity.gamePosition.x - 1,
    y: entity.gamePosition.y
  };

  return map.isPassable(nextPos);
}

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
