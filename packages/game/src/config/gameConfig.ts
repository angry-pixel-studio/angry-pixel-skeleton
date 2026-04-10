import { GameConfig } from 'angry-pixel';
import { COLLISION_MATRIX } from '@config/collisionMatrix';

export type GameDebugOptions = {
  colliders?: boolean;
  mousePosition?: boolean;
  textRendererBoundingBoxes?: boolean;
};

export function createGameConfig(options: { container: HTMLElement; debug?: GameDebugOptions }): GameConfig {
  const { container, debug } = options;
  return {
    containerNode: container,
    width: 1920,
    height: 1080,
    canvasColor: '#D9D9D9',
    collisions: {
      collisionMatrix: COLLISION_MATRIX,
    },
    debug: {
      colliders: debug?.colliders ?? false,
      mousePosition: debug?.mousePosition ?? false,
      textRendererBoundingBoxes: debug?.textRendererBoundingBoxes ?? false,
    },
  };
}
