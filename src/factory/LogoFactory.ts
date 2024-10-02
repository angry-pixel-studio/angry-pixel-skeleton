import { MoveAndBounce } from "@component/MoveAndBounce";
import { ASSETS } from "@config/assets";
import { RENDER_LAYERS } from "@config/layers";
import { AssetManager, Component, SpriteRenderer, Transform } from "angry-pixel";

export const logoFactory = (assetManager: AssetManager): Component[] => [
    Transform,
    new SpriteRenderer({
        layer: RENDER_LAYERS.Logo,
        image: assetManager.getImage(ASSETS.images.logo),
    }),
    MoveAndBounce,
];
