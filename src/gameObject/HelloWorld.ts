import { GameObject, TextRenderer, TextRendererOptions, Vector2 } from "angry-pixel";
import { ColorChanger } from "../component/ColorChanger";
import { LAYERS } from "../config/layers";

export class HelloWorld extends GameObject {
    protected init(): void {
        this.layer = LAYERS.Text;

        this.addComponent<TextRenderer, TextRendererOptions>(TextRenderer, {
            width: 1920,
            height: 64,
            color: "#FFFFFF",
            text: "Hello world",
            font: "PressStart2P-Regular",
            fontSize: 64,
            bitmapSpacing: new Vector2(-1, -2),
        });

        this.addComponent(ColorChanger, { color: ["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFFFF"], period: 1 });
    }
}
