import Phaser from 'phaser';
import DungeonScene from './scenes/DungeonScene';

const config = {
  type: Phaser.AUTO,
  parent: 'game-canvas',
  width: 320,
  height: 240,
  resolution: 0.03125,
  zoom: 2,
  render: {
    pixelArt: true
  },
  scene: new DungeonScene()
};

const game = new Phaser.Game(config);
