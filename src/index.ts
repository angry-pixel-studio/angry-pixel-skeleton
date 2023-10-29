import { CollisionMatrix, Game, GameConfig } from "angry-pixel";
import { PARAMETERS } from "./config/parameters";
import { MainScene } from "./scene/MainScene";
import { LoadAssets } from "./scene/LoadAssets";

const config: GameConfig = {
    containerNode: document.getElementById("app"),
    gameWidth: 1920,
    gameHeight: 1080,
    canvasColor: "#00D9D9",
    collisions: {
        collisionMatrix: PARAMETERS.collisionMatrix as CollisionMatrix,
    },
};

// Create the Game
const game = new Game(config);

// Add scene
game.addScene(LoadAssets, "LoadAssets", undefined, true);
game.addScene(MainScene, "MainScene");

// Run the game
game.run();
