import { GameObject, TextRenderer } from "angry-pixel";
import { ColorChanger } from "../component/ColorChanger";

export class HelloWorld extends GameObject {
    constructor() {
        super();

        this.layer = "Text";

        this.addComponent(
            () =>
                new TextRenderer({
                    width: 640,
                    height: 320,
                    color: "#FFFFFF",
                    text: "Hello world",
                    fontFamily: "PressStart2P-Regular",
                    fontUrl: "font/PressStart2P-Regular.ttf",
                    fontSize: 16,
                    lineSeparation: 4,
                })
        );

        this.addComponent(() => new ColorChanger(["#000000", "#ff0000", "#00ff00", "#0000ff", "#ffffff"], 1));
    }
}
