import { Scene } from "angry-pixel";
import { HelloWorld } from "../gameObject/HelloWorld";

export class Scene00 extends Scene {
    protected init(): void {
        this.gameCamera.layers = ["Text"];

        this.addGameObject(HelloWorld);
    }
}
