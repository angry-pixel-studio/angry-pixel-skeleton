import { GameConfig } from 'angry-pixel';
import { COLLISION_MATRIX } from '@config/collisionMatrix';

export function createGameConfig({
  container,
  debug = false,
}: {
  container: HTMLElement;
  debug?: boolean;
}): GameConfig {
  return {
    containerNode: container,
    width: 1920,
    height: 1080,
    canvasColor: '#D9D9D9',
    collisions: {
      collisionMatrix: COLLISION_MATRIX,
    },
    debug: {
      colliders: debug,
      mousePosition: debug,
      textRendererBoundingBoxes: debug,
    },
  };
}
