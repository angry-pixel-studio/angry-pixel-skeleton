import { Game } from 'angry-pixel';
import { createGameConfig } from './config/gameConfig';
import { MainScene } from './scene/MainScene';

export function startGame(container: HTMLElement, debug: boolean): Game {
  const game = new Game(createGameConfig({ container, debug }));
  game.addScene(MainScene, 'MainScene', true);
  game.start();
  return game;
}
