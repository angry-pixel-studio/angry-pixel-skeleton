import { Component, ComponentTypes, random, TextRenderer, TimeManager } from "angry-pixel";

export class ColorChanger extends Component {
    private textRenderer: TextRenderer;
    private timer: number = 0;

    constructor(private colors: string[], private period: number) {
        super();
    }

    protected start(): void {
        this.textRenderer = this.getComponentByType<TextRenderer>(ComponentTypes.TextRenderer) as TextRenderer;
    }

    protected update(): void {
        if (this.timer >= this.period) {
            this.textRenderer.color = this.colors[random(0, this.colors.length - 1)];
            this.timer = 0;
        }

        this.timer += TimeManager.deltaTime;
    }
}
