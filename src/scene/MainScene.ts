import { Scene } from "angry-pixel";
import { HelloWorld } from "../gameObject/HelloWorld";
import { LAYERS } from "../config/layers";

export class MainScene extends Scene {
    protected init(): void {
        this.gameCamera.layers = [LAYERS.Text];

        this.addGameObject(HelloWorld);
    }
}
