import Phaser from 'phaser';
import Creature from './Creature';
import MovementController from '../game/MovementController';

export default class Player extends Creature {
  constructor(scene, x=0, y=0, frame=25) {
    super(scene, { maxHp: 10, hp: 10, attack: 2 }, x, y, frame);

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
      // attack the adjacent entity if it's a creature
      if (adjEntity instanceof Creature) {
        this.attack(adjEntity);
        this.scene.startAiTurn();
      }
    } else if (MovementController.canMove(this, direction, this.scene.map)) {
      this.translate(direction);
      this.scene.startAiTurn();
    }
  }
}
