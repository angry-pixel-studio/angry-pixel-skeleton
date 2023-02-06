import { Component, randomInt, TextRenderer, TimeManager } from "angry-pixel";

export interface ColorChangerOptions {
    color: string[];
    period: number;
}

export class ColorChanger extends Component {
    private textRenderer: TextRenderer;
    private timer: number = 0;

    private colors: string[];
    private period: number;

    protected init({ color, period }: ColorChangerOptions): void {
        this.colors = color;
        this.period = period;
    }

    protected start(): void {
        this.textRenderer = this.getComponent(TextRenderer);
    }

    protected update(): void {
        if (this.timer >= this.period) {
            this.textRenderer.color = this.colors[randomInt(0, this.colors.length - 1)];
            this.timer = 0;
        }

        this.timer += TimeManager.deltaTime;
    }
}
