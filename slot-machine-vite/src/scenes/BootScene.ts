import { Container, Text } from 'pixi.js';
import type { Scene } from '@/app/SceneManager';
import { Application } from 'pixi.js';

export class BootScene implements Scene {
  private root = new Container();

  constructor(private app: Application) {}

  mount(): void {
    const label = new Text({ text: 'Booting assets...', style: { fill: 0xffffff, fontSize: 24 } });
    label.x = 24;
    label.y = 24;
    this.root.addChild(label);
    this.app.stage.addChild(this.root);
  }

  unmount(): void {
    this.root.destroy({ children: true });
  }

  update(): void {}
}
