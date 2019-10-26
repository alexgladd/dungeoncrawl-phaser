import Phaser from 'phaser';
import Creature from './Creature';
import Monster from './Monster';
import MovementController from '../game/MovementController';
import UiController from '../ui/UiController';

export default class Player extends Creature {
  constructor(scene, x=0, y=0, frame=25) {
    super(scene, { maxHp: 10, hp: 10, attack: 2, xp: 0, xpToNextLevel: 100 }, x, y, frame);

    this.handleInput = this.handleInput.bind(this);
  }

  start() {
    super.start();

    this.sprite.setTint(0xffff00);

    const arrows = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT
    }, true, true);

    const wasd = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    }, true, true);

    [ arrows.up, wasd.up ].forEach(key => {
      key.on('down', () => this.handleInput(MovementController.directions.up));
    });

    [ arrows.down, wasd.down ].forEach(key => {
      key.on('down', () => this.handleInput(MovementController.directions.down));
    });

    [ arrows.left, wasd.left ].forEach(key => {
      key.on('down', () => this.handleInput(MovementController.directions.left));
    });

    [ arrows.right, wasd.right ].forEach(key => {
      key.on('down', () => this.handleInput(MovementController.directions.right));
    });
  }

  update(time, delta) {
    
  }

  handleInput(direction) {
    const adjEntity = this.scene.getAdjacentEntity(this, direction);

    if (adjEntity) {
      // attack the adjacent entity if it's a monster
      if (adjEntity instanceof Monster) {
        this.attack(adjEntity);
        UiController.updateEnemy(adjEntity);
        this.scene.startAiTurn();
      }
    } else if (MovementController.canMove(this, direction, this.scene.map)) {
      this.translate(direction);
      UiController.clearEnemy();
      this.scene.startAiTurn();
    }
  }

  /**
   * Reward the given amount of experience to the player
   * @param {number} xp the amount of experience to gain
   */
  addExperience(xp) {
    this.stats.xp += xp;

    UiController.addLogMessage(`You gain ${xp} experience`);

    if (this.stats.xp >= this.stats.xpToNextLevel) {
      this._levelUp();
      UiController.addLogMessage(`You've reached level ${this.stats.level}!`);
    }

    UiController.updatePlayerStats(this);
  }

  /**
   * Advance the player to the next level
   */
  _levelUp() {
    this.stats.level += 1;
    this.stats.xp = this.stats.xp % this.stats.xpToNextLevel;
    this.stats.xpToNextLevel = 100 * this.stats.level;
    this.stats.maxHp += 10;
    this.stats.hp = this.stats.maxHp;

    if (this.stats.level % 2 === 0) this.stats.attack += 1;
    if (this.stats.level % 3 === 0) this.stats.defense += 1;
  }

  /**
   * Handle the results of an attack
   * @param {import('./Creature').CombatResult} result the combat results
   */
  _postAttack(result) {
    if (result.didHit) {
      UiController.addLogMessage(`You hit the ${result.defender.type} for ${result.damage} damage`);
    } else {
      UiController.addLogMessage(`You miss the ${result.defender.type}`);
    }
  }
}
