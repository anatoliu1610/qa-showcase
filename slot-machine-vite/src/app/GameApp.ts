import { Application } from 'pixi.js';
import { SceneManager } from '@/app/SceneManager';

export class GameApp {
  readonly pixi = new Application();
  readonly sceneManager = new SceneManager();

  async init(host: HTMLElement): Promise<void> {
    await this.pixi.init({
      resizeTo: window,
      background: '#060a1a',
      antialias: true
    });

    host.appendChild(this.pixi.canvas);

    this.pixi.ticker.add((ticker) => {
      this.sceneManager.update(ticker.deltaMS);
    });

    window.addEventListener('resize', this.handleResize);
  }

  destroy(): void {
    window.removeEventListener('resize', this.handleResize);
    this.pixi.destroy(true, { children: true });
  }

  private handleResize = (): void => {
    // App uses resizeTo window; hook left for responsive UI layout updates.
  };
}
