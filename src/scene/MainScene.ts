import { Scene } from "angry-pixel";
import { LAYERS } from "../config/layers";
import { Logo } from "../gameObject/Logo";

export class MainScene extends Scene {
    protected init(): void {
        this.gameCamera.layers = [LAYERS.Default, LAYERS.Text];

        this.addGameObject(Logo);
    }
}
