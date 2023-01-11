import { Game, GameConfig, Vector2, CollisionMethods } from "angry-pixel";
import { LoadAssets } from "./scene/LoadAssets";
import { Scene00 } from "./scene/Scene00";

const containerElement = document.getElementById("app");

const config: GameConfig = {
    containerNode: containerElement,
    gameWidth: 1280,
    gameHeight: 720,
    canvasColor: "#00D9D9",
};

// Create the Game
const game = new Game(config);

// Add a scene
game.addScene(LoadAssets, "LoadAssets");
game.addScene(Scene00, "Scene00");

// Run the game
game.run();
