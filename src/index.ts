import { Game, CollisionMethodConfig, GameConfig, Vector2 } from "angry-pixel";
import { Scene00 } from "./scene/Scene00";

const containerElement = document.getElementById("app");

const config: GameConfig = {
    containerNode: containerElement,
    gameWidth: 1280,
    gameHeight: 720,
    debugEnabled: false,
    spriteDefaultScale: new Vector2(1, 1),
    collisions: {
        method: CollisionMethodConfig.AABB,
    },
    canvasColor: "#00D9D9",
};

// Create the Game
const game = new Game(config);

// Add a scene
game.addScene(Scene00, "Scene00");

// Run the game
game.run();
