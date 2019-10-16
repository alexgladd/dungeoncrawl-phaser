// position utilities

const equals = (pos1={ x: 0, y: 0 }, pos2={ x: 0, y: 0 }) => {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

export default {
  equals
}
