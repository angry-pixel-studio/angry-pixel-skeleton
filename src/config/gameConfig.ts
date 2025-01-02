import { GameConfig } from "angry-pixel";
import { COLLISION_MATRIX } from "./collisionMatrix";

const params = new URLSearchParams(window.location.search);

export const gameConfig: GameConfig = {
    containerNode: document.querySelector("#app"),
    width: 1920,
    height: 1080,
    canvasColor: "#D9D9D9",
    collisions: {
        collisionMatrix: COLLISION_MATRIX,
    },
    debug: {
        colliders: Boolean(Number(params.get("debug"))),
        mousePosition: Boolean(Number(params.get("debug"))),
    },
};
