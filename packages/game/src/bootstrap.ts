import { Game } from 'angry-pixel';
import { createGameConfig, type GameDebugOptions } from '@config/gameConfig';
import { MainScene } from '@scene/MainScene';

export type StartGameOptions = {
  debug?: GameDebugOptions;
};

export function startGame(container: HTMLElement, options?: StartGameOptions): Game {
  const game = new Game(createGameConfig({ container, debug: options?.debug }));
  game.addScene(MainScene, 'MainScene', true);
  game.start();
  return game;
}
