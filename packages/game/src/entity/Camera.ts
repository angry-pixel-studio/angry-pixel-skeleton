import { Camera, Transform } from 'angry-pixel';
import { RENDER_LAYERS } from '@config/layers';

export const camera = [
  new Transform(),
  new Camera({
    layers: [RENDER_LAYERS.Main],
    debug: true,
  }),
];
