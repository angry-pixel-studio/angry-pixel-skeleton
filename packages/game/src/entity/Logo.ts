import { Archetype, SpriteRenderer, Transform } from 'angry-pixel';
import { RENDER_LAYERS } from '@config/layers';
import { ASSETS } from '@config/assets';
import { MoveAndBounce } from '@component/MoveAndBounce';

export const logo: Archetype = {
  components: [
    new Transform(),
    new SpriteRenderer({
      layer: RENDER_LAYERS.Main,
      image: ASSETS.images.angryPixel,
    }),
    new MoveAndBounce(),
  ],
};
