import { CollisionMatrix, Game, GameConfig } from "angry-pixel";
import { LoadAssets } from "./scene/LoadAssets";
import { MainScene } from "./scene/MainScene";
import { PARAMETERS } from "./config/parameters";

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

// Add scenes
game.addScene(LoadAssets, "LoadAssets");
game.addScene(MainScene, "MainScene");

// Run the game
game.run();
