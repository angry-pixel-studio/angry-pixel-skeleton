import { Game } from "angry-pixel";
import { MainScene } from "@scene/MainScene";
import { gameConfig } from "@config/gameConfig";

const createAndStart = () => {
    // create the game
    const game = new Game(gameConfig);
    //  add scenes
    game.addScene(MainScene, "MainScene", true);
    // start game
    game.start();
};

createAndStart();
