import Entity from './Entity';

export default class SpriteEntity extends Entity {
  constructor(scene, x=0, y=0, frame=0, texture='sprites') {
    super(scene, x, y);

    this._frame = frame;
    this._texture = texture;
  }

  start() {
    super.start();
    
    this.sprite = this.scene.add.sprite(0, 0, this._texture, this._frame);
    this.sprite.setOrigin(0, 0);
    
    this.add(this.sprite);
  }
}
