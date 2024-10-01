import { MoveAndBounce } from "@component/MoveAndBounce";
import { GameSystem, Transform } from "angry-pixel";

export class MoveAndBounceSystem extends GameSystem {
    public onUpdate(): void {
        this.entityManager.search(MoveAndBounce).forEach(({ component, entity }) => {
            const transform = this.entityManager.getComponent(entity, Transform);
            const { boundaries, direction, speed } = component;

            if (transform.position.y >= boundaries[0] || transform.position.y <= boundaries[1]) {
                direction.y *= -1;
            }

            if (transform.position.x >= boundaries[2] || transform.position.x <= boundaries[3]) {
                direction.x *= -1;
            }

            transform.position.x += direction.x * speed * this.timeManager.deltaTime;
            transform.position.y += direction.y * speed * this.timeManager.deltaTime;
        });
    }
}
