import { GameObject, Sprite, SpriteRenderer } from "angry-pixel";
import { MoveAndBounce } from "../component/MoveAndBounce";
import { ASSETS } from "../config/assets";

export class Logo extends GameObject {
    protected init(): void {
        this.addComponent(SpriteRenderer, {
            sprite: new Sprite({
                image: this.assetManager.getImage(ASSETS.images.logo),
            }),
        });

        this.addComponent(MoveAndBounce);
    }
}
