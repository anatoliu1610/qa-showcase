import { GameApp } from '@/app/GameApp';
import { BootScene } from '@/scenes/BootScene';
import { SlotScene } from '@/scenes/SlotScene';

async function bootstrap(): Promise<void> {
  const host = document.getElementById('app');
  if (!host) throw new Error('App host not found');

  const app = new GameApp();
  await app.init(host);

  app.sceneManager.setScene(new BootScene(app.pixi));

  window.setTimeout(() => {
    app.sceneManager.setScene(new SlotScene(app.pixi));
  }, 500);
}

void bootstrap();
