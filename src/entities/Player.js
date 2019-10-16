import Phaser from 'phaser';
import SpriteEntity from './SpriteEntity';
import MovementController from '../game/MovementController';

export default class Player extends SpriteEntity {
  constructor(scene, x=0, y=0, frame=25) {
    super(scene, x, y, frame);

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
      // attack the adjacent entity
      console.log('Player has adjacent entity', direction);
    } else if (MovementController.canMove(this, direction, this.scene.map)) {
      this.translate(direction);
      this.scene.startAiTurn();
    }
  }

  // handleInputUp() {
  //   const adjEntity = this.scene.getAdjacentEntity(this, MovementController.directions.up);

  //   if (adjEntity) {
  //     console.log('Adjacent entity up');
  //   } else if (MovementController.canMoveUp(this, this.scene.map)) {
  //     this.translateUp();
  //     this.scene.startAiTurn();
  //   }
  // }

  // handleInputDown() {
  //   const adjEntity = this.scene.getAdjacentEntity(this, MovementController.directions.down);

  //   if (adjEntity) {
  //     console.log('Adjacent entity down');
  //   } else if (MovementController.canMoveDown(this, this.scene.map)) {
  //     this.translateDown();
  //     this.scene.startAiTurn();
  //   }
  // }

  // handleInputLeft() {
  //   const adjEntity = this.scene.getAdjacentEntity(this, MovementController.directions.left);

  //   if (adjEntity) {
  //     console.log('Adjacent entity left');
  //   } else if (MovementController.canMoveLeft(this, this.scene.map)) {
  //     this.translateLeft();
  //     this.scene.startAiTurn();
  //   }
  // }

  // handleInputRight() {
  //   const adjEntity = this.scene.getAdjacentEntity(this, MovementController.directions.right);

  //   if (adjEntity) {
  //     console.log('Adjacent entity right');
  //   } else if (MovementController.canMoveRight(this, this.scene.map)) {
  //     this.translateRight();
  //     this.scene.startAiTurn();
  //   }
  // }
}
