import { Camera, Transform } from 'angry-pixel';
import { RENDER_LAYERS } from '@config/layers';

export const camera = [
  new Transform(),
  new Camera({
    layers: [RENDER_LAYERS.Logo],
    debug: true,
  }),
];
