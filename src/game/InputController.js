// manage game input from the player

// allow WASD and arrow key movement
const MovementUp = [ 'w', 'ArrowUp' ];
const MovementLeft = [ 'a', 'ArrowLeft' ];
const MovementDown = [ 's', 'ArrowDown' ];
const MovementRight = [ 'd', 'ArrowRight' ];

const MovementInput = [ ...MovementUp, ...MovementLeft, ...MovementDown, ...MovementRight];

const ActionInput = [
  'e', // interact
  ' '  // attack
];

const isMovementInput = (key) => {
  return MovementInput.includes(key);
}

const isActionInput = (key) => {
  return ActionInput.includes(key);
}

const isMovementUp = (key) => {
  return MovementUp.includes(key);
}

const isMovementLeft = (key) => {
  return MovementLeft.includes(key);
}

const isMovementDown = (key) => {
  return MovementDown.includes(key);
}

const isMovementRight = (key) => {
  return MovementRight.includes(key);
}

export default {
  isMovementInput,
  isActionInput,
  isMovementUp,
  isMovementDown,
  isMovementLeft,
  isMovementRight
}
