import { Scene } from "angry-pixel";
import { ASSETS } from "../config/assets";

export class LoadAssets extends Scene {
    protected init(): void {
        Object.values(ASSETS.images).forEach((filename) => this.assetManager.loadImage(filename));
        // Object.values(ASSETS.fonts).forEach((data) => this.assetManager.loadFont(data.name, data.url));
        // Object.values(ASSETS.audio).forEach((filename) => this.assetManager.loadAudio(filename));
        // Object.values(ASSETS.video).forEach((filename) => this.assetManager.loadVideo(filename));
    }

    protected update(): void {
        if (this.assetManager.getAssetsLoaded()) {
            this.sceneManager.loadScene("MainScene");
        }
    }
}
