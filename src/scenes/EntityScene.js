import Phaser from 'phaser';
import Entity from '../entities/Entity';
import Position from '../game/Position';
import MovementController from '../game/MovementController';
import DungeonLevel from '../game/DungeonLevel';

export default class EntityScene extends Phaser.Scene {
  constructor(key, config={}) {
    super({
      key: key,
      ...config
    });

    this._entities = [];
    this._map = null;
  }

  /**
   * @returns {Array<Entity>} the list of entities currently in the scene
   */
  get entities() {
    return this._entities;
  }

  /**
   * @returns {DungeonLevel} the dugneon level map being used in the scene
   */
  get map() {
    return this._map;
  }

  /**
   * Signal to the scene that the player is starting their turn. Should be overridden by subclasses.
   */
  startPlayerTurn() {
    // to be overridden
  }

  /**
   * Signal to the scene that the player's turn is over so that the AI can take its turn(s). Should
   * be overridded by subclasses.
   */
  startAiTurn() {
    // to be overridden
  }

  /**
   * Add an Entity to the scene
   * @param {Entity} entity the entity to add to the scene
   */
  addEntity(entity) {
    if (!entity || !(entity instanceof Entity)) return;

    this._entities.push(entity);
    this.add.existing(entity);
    entity.start();
  }

  /**
   * Remove an Entity from the scene; automatically calls 'destroy' on the Entity
   * @param {Entity} entity the entity to remove from the scene
   */
  removeEntity(entity) {
    if (!entity || !(entity instanceof Entity)) return;

    const idx = this._entities.findIndex(e => e === entity);

    if (idx >= 0) {
      this._entities.splice(idx, 1);
    }

    entity.destroy();
  }

  /**
   * Check if there is any entity adjacent to the given Entity in the given direction
   * @param {Entity} entity the entity to check adjacency for
   * @param {import('../game/MovementController').Direction} direction the direction in which to
   * check adjacency
   * @returns {(Entity|null)} the adjacent Entity if one is found, or null
   */
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

      case MovementController.directions.upLeft:
        return this.getEntityAt({ x: entity.gamePosition.x - 1, y: entity.gamePosition.y - 1 });

      case MovementController.directions.upRight:
        return this.getEntityAt({ x: entity.gamePosition.x + 1, y: entity.gamePosition.y - 1 });

      case MovementController.directions.downLeft:
        return this.getEntityAt({ x: entity.gamePosition.x - 1, y: entity.gamePosition.y + 1 });

      case MovementController.directions.downRight:
        return this.getEntityAt({ x: entity.gamePosition.x + 1, y: entity.gamePosition.y + 1 });

      default:
        return null;
    }
  }

  /**
   * Get the Entity at the given position, if one exists
   * @param {import('../game/Position').Position} pos the Position to check
   * @returns {(Entity|null)} the Entity at the given position if found, or null
   */
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
