import { Vector2 } from "angry-pixel";

export class MoveAndBounce {
    boundaries: number[] = [476, -476, 896, -896]; // top, bottom, left, right
    direction: Vector2 = new Vector2(1, 1);
    speed: number = 200; // pixels per second
}
