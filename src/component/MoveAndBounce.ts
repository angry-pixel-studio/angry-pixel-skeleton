import { Component, Transform, Vector2 } from "angry-pixel";

export class MoveAndBounce extends Component {
    private transform: Transform;
    private direction: Vector2;
    private speed: number;

    protected init(): void {
        this.transform = this.gameObject.transform;
        this.direction = new Vector2(1, 1);
        this.speed = 200; // pixels per second
    }

    protected update(): void {
        if (this.transform.position.y >= 476 || this.transform.position.y <= -476) {
            this.direction.y *= -1;
        }

        if (this.transform.position.x >= 896 || this.transform.position.x <= -896) {
            this.direction.x *= -1;
        }

        this.transform.position.x += this.direction.x * this.speed * this.timeManager.deltaTime;
        this.transform.position.y += this.direction.y * this.speed * this.timeManager.deltaTime;
    }
}
