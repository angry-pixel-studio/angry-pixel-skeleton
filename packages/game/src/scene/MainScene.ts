import { Scene } from 'angry-pixel';
import { ASSETS } from '@config/assets';
import { camera } from '@entity/Camera';
import { logo } from '@entity/Logo';
import { MoveAndBounceSystem } from '@system/MoveAndBounceSystem';

export class MainScene extends Scene {
  loadAssets(): void {
    Object.values(ASSETS.images).forEach((filename) => this.assetManager.loadImage(filename as string));
    Object.values(ASSETS.fonts).forEach((data) => {
      const font = data as { name: string; url: string };
      this.assetManager.loadFont(font.name, font.url);
    });
    Object.values(ASSETS.audio).forEach((filename) => this.assetManager.loadAudio(filename as string));
    Object.values(ASSETS.video).forEach((filename) => this.assetManager.loadVideo(filename as string));
  }

  registerSystems(): void {
    this.addSystem(MoveAndBounceSystem);
  }

  createEntities(): void {
    this.entityManager.createEntity(camera);
    this.entityManager.createEntity(logo);
  }
}
