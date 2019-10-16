// controller for entities taking turns in the game

const TurnState = {
  waitingForInput: 'WAITING',
  playerTurn: 'PLAYER',
  aiTurn: 'AI'
};

export default class TurnController {
  constructor() {
    this._turnState = TurnState.waitingForInput;
  }

  get turnState() {
    return this._turnState;
  }

  get isWaiting() {
    return this._turnState === TurnState.waitingForInput;
  }

  get isPlayerTurn() {
    return this._turnState === TurnState.playerTurn;
  }

  get isAiTurn() {
    return this._turnState === TurnState.aiTurn;
  }

  startPlayerTurn() {
    this._turnState = TurnState.playerTurn;
  }

  startAiTurn() {
    this._turnState = TurnState.aiTurn;
  }

  endTurns() {
    this.turnState = TurnState.waitingForInput;
  }
}
