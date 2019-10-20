import Phaser from 'phaser';
import DungeonScene from './scenes/DungeonScene';

const config = {
  type: Phaser.AUTO,
  parent: 'game-canvas',
  render: {
    pixelArt: true
  },
  scene: new DungeonScene(1),
  scale: {
    width: 320,
    height: 240,
    zoom:2,
    mode: Phaser.Scale.ScaleModes.FIT,
    min: { width: 320, height: 240 }
  }
};

const game = new Phaser.Game(config);
