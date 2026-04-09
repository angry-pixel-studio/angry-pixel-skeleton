import { SpriteRenderer, Transform } from 'angry-pixel';
import { RENDER_LAYERS } from '@config/layers';
import { ASSETS } from '@config/assets';
import { MoveAndBounce } from '@component/MoveAndBounce';

export const logo = [
  Transform,
  new SpriteRenderer({
    layer: RENDER_LAYERS.Logo,
    image: ASSETS.images.logo,
  }),
  MoveAndBounce,
];
