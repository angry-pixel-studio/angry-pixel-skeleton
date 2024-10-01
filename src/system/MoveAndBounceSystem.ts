import { MoveAndBounce } from "@component/MoveAndBounce";
import { EntityManager, inject, Symbols, System, TimeManager, Transform } from "angry-pixel";

export class MoveAndBounceSystem implements System {
    @inject(Symbols.EntityManager) private readonly entityManager: EntityManager;
    @inject(Symbols.TimeManager) private readonly timeManager: TimeManager;

    public onUpdate(): void {
        this.entityManager.search(MoveAndBounce).forEach(({ component: moveAndBounce, entity }) => {
            const transform = this.entityManager.getComponent(entity, Transform);

            if (transform.position.y >= 476 || transform.position.y <= -476) {
                moveAndBounce.direction.y *= -1;
            }

            if (transform.position.x >= 896 || transform.position.x <= -896) {
                moveAndBounce.direction.x *= -1;
            }

            transform.position.x += moveAndBounce.direction.x * moveAndBounce.speed * this.timeManager.deltaTime;
            transform.position.y += moveAndBounce.direction.y * moveAndBounce.speed * this.timeManager.deltaTime;
        });
    }
}
