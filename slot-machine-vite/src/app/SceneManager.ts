export interface Scene {
  mount(): void;
  unmount(): void;
  update(deltaMs: number): void;
}

export class SceneManager {
  private current: Scene | null = null;

  setScene(scene: Scene): void {
    this.current?.unmount();
    this.current = scene;
    this.current.mount();
  }

  update(deltaMs: number): void {
    this.current?.update(deltaMs);
  }
}
