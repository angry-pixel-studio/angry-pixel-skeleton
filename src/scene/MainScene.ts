import { cameraFactory } from "@factory/CameraFactory";
import { logoFactory } from "@factory/LogoFactory";
import { ASSETS } from "@config/assets";
import { RENDER_LAYERS } from "@config/layers";
import { MoveAndBounceSystem } from "@system/MoveAndBounceSystem";
import { Scene, System, SystemType } from "angry-pixel";

export class MainScene extends Scene {
    public systems: SystemType<System>[] = [MoveAndBounceSystem];

    public loadAssets(): void {
        Object.values(ASSETS.images).forEach((filename) => this.assetManager.loadImage(filename));
        // Object.values(ASSETS.fonts).forEach((data) => this.assetManager.loadFont(data.name, data.url));
        // Object.values(ASSETS.audio).forEach((filename) => this.assetManager.loadAudio(filename));
        // Object.values(ASSETS.video).forEach((filename) => this.assetManager.loadVideo(filename));
    }

    public setup(): void {
        // setup camera
        this.entityManager.createEntity(cameraFactory([RENDER_LAYERS.Logo]));
        // setup logo
        this.entityManager.createEntity(logoFactory(this.assetManager));
    }
}
