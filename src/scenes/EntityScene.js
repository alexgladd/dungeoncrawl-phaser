import Phaser from 'phaser';
import Entity from '../entities/Entity';
import Position from '../game/Position';
import MovementController from '../game/MovementController';

export default class EntityScene extends Phaser.Scene {
  constructor(key, config={}) {
    super({
      key: key,
      ...config
    });

    this._entities = [];
    this._map = null;
  }

  get entities() {
    return this._entities;
  }

  get map() {
    return this._map;
  }

  startPlayerTurn() {
    // to be overridden
  }

  startAiTurn() {
    // to be overridden
  }

  addEntity(entity) {
    if (!entity || !(entity instanceof Entity)) return;

    this._entities.push(entity);
    this.add.existing(entity);
    entity.start();
  }

  getAdjacentEntity(entity, direction) {
    switch (direction) {
      case MovementController.directions.up:
        return this.getEntityAt({ x: entity.gamePosition.x, y: entity.gamePosition.y - 1 });

      case MovementController.directions.down:
        return this.getEntityAt({ x: entity.gamePosition.x, y: entity.gamePosition.y + 1 });
      
      case MovementController.directions.left:
        return this.getEntityAt({ x: entity.gamePosition.x - 1, y: entity.gamePosition.y });
      
      case MovementController.directions.right:
        return this.getEntityAt({ x: entity.gamePosition.x + 1, y: entity.gamePosition.y });

      default:
        return null;
    }
  }

  getEntityAt(pos={ x: 0, y: 0 }) {
    let entity = null;

    let i = 0;
    while(i < this.entities.length) {
      const e = this.entities[i];

      if (Position.equals(pos, e.gamePosition)) {
        entity = e;
        break;
      }

      i++;
    }

    return entity;
  }
}
