import { Container, Text, Application } from 'pixi.js';
import type { Scene } from '@/app/SceneManager';

export class SlotScene implements Scene {
  private root = new Container();

  constructor(private app: Application) {}

  mount(): void {
    const title = new Text({ text: 'Slot Scene Skeleton', style: { fill: 0x7dd3fc, fontSize: 28 } });
    title.x = 24;
    title.y = 24;
    this.root.addChild(title);
    this.app.stage.addChild(this.root);
  }

  unmount(): void {
    this.root.destroy({ children: true });
  }

  update(): void {}
}
