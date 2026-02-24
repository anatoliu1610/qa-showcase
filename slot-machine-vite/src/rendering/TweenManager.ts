type Tween = {
  elapsed: number;
  duration: number;
  from: number;
  to: number;
  onUpdate: (value: number, progress: number) => void;
  onDone?: () => void;
  loop: boolean;
};

export class TweenManager {
  private tweens: Tween[] = [];

  to(options: {
    duration: number;
    from: number;
    to: number;
    onUpdate: (value: number, progress: number) => void;
    onDone?: () => void;
  }): void {
    this.tweens.push({
      elapsed: 0,
      duration: Math.max(1, options.duration),
      from: options.from,
      to: options.to,
      onUpdate: options.onUpdate,
      onDone: options.onDone,
      loop: false
    });
  }

  loop(options: {
    duration: number;
    from?: number;
    to?: number;
    onUpdate: (value: number, progress: number) => void;
  }): void {
    this.tweens.push({
      elapsed: 0,
      duration: Math.max(1, options.duration),
      from: options.from ?? 0,
      to: options.to ?? 1,
      onUpdate: options.onUpdate,
      loop: true
    });
  }

  update(deltaMs: number): void {
    for (let i = this.tweens.length - 1; i >= 0; i--) {
      const t = this.tweens[i];
      if (!t) continue;
      t.elapsed += deltaMs;
      const progress = Math.min(1, t.elapsed / t.duration);
      const value = t.from + (t.to - t.from) * progress;
      t.onUpdate(value, progress);

      if (progress >= 1) {
        if (t.loop) {
          t.elapsed = 0;
        } else {
          t.onDone?.();
          this.tweens.splice(i, 1);
        }
      }
    }
  }

  clear(): void {
    this.tweens.length = 0;
  }
}
