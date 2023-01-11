import { AssetManager, Scene, SceneManager } from "angry-pixel";

export class LoadAssets extends Scene {
    protected init(): void {
        AssetManager.loadFont("PressStart2P-Regular", "font/PressStart2P-Regular.ttf");
    }

    protected update(): void {
        if (AssetManager.getAssetsLoaded()) {
            SceneManager.loadScene("Scene00");
        }
    }
}
