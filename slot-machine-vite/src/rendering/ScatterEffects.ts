import { Container, Graphics } from 'pixi.js';
import { TweenManager } from '@/rendering/TweenManager';

type Point = { x: number; y: number };

export class ScatterEffects extends Container {
  private readonly tweens = new TweenManager();
  private readonly idleRings: Graphics[] = [];
  private readonly particlePool: Graphics[] = [];

  constructor() {
    super();
    for (let i = 0; i < 80; i++) {
      const p = new Graphics();
      p.circle(0, 0, 2).fill({ color: 0xfde047, alpha: 0.95 });
      p.visible = false;
      this.particlePool.push(p);
      this.addChild(p);
    }
  }

  update(deltaMs: number): void {
    this.tweens.update(deltaMs);
  }

  setIdle(scatterPositions: Point[]): void {
    this.clearIdle();

    scatterPositions.forEach((pos, idx) => {
      const ring = new Graphics();
      ring.circle(0, 0, 52).stroke({ color: 0x22d3ee, width: 2, alpha: 0.25 });
      ring.x = pos.x;
      ring.y = pos.y;
      this.idleRings.push(ring);
      this.addChild(ring);

      this.tweens.loop({
        duration: 900 + idx * 90,
        onUpdate: (_v, t) => {
          const pulse = 0.95 + Math.sin(t * Math.PI * 2) * 0.08;
          ring.scale.set(pulse);
          ring.alpha = 0.2 + Math.sin(t * Math.PI * 2) * 0.1;
        }
      });
    });
  }

  playLandImpact(pos: Point): void {
    const flash = new Graphics();
    flash.circle(0, 0, 60).fill({ color: 0xffffff, alpha: 0.55 });
    flash.x = pos.x;
    flash.y = pos.y;
    flash.scale.set(0.45, 1.2);
    this.addChild(flash);

    this.tweens.to({
      duration: 140,
      from: 0.45,
      to: 1.1,
      onUpdate: (value) => flash.scale.set(value, 1.3 - (value - 0.45))
    });

    this.tweens.to({
      duration: 200,
      from: 0.55,
      to: 0,
      onUpdate: (value) => (flash.alpha = value),
      onDone: () => flash.destroy()
    });

    this.playBurst(pos);
  }

  playHighlightAll(scatterPositions: Point[], onDone?: () => void): void {
    const rays = new Graphics();
    this.addChild(rays);

    this.tweens.to({
      duration: 700,
      from: 0,
      to: 1,
      onUpdate: (_value, t) => {
        rays.clear();
        scatterPositions.forEach((p) => {
          const len = 80 + Math.sin(t * Math.PI * 2) * 12;
          for (let i = 0; i < 8; i++) {
            const angle = (Math.PI * 2 * i) / 8 + t * 0.9;
            rays.moveTo(p.x, p.y);
            rays.lineTo(p.x + Math.cos(angle) * len, p.y + Math.sin(angle) * len);
          }
        });
        rays.stroke({ color: 0x67e8f9, width: 2, alpha: 0.35 });
      },
      onDone: () => {
        rays.destroy();
        onDone?.();
      }
    });
  }

  clearEffects(): void {
    this.clearIdle();
    this.tweens.clear();
    this.particlePool.forEach((p) => (p.visible = false));
  }

  private clearIdle(): void {
    this.idleRings.forEach((r) => r.destroy());
    this.idleRings.length = 0;
  }

  private playBurst(pos: Point): void {
    for (let i = 0; i < 10; i++) {
      const particle = this.particlePool.find((p) => !p.visible);
      if (!particle) break;

      particle.visible = true;
      particle.x = pos.x;
      particle.y = pos.y;
      particle.alpha = 1;

      const angle = (Math.PI * 2 * i) / 10;
      const radius = 48 + i * 3;

      this.tweens.to({
        duration: 280,
        from: 0,
        to: 1,
        onUpdate: (_v, t) => {
          particle.x = pos.x + Math.cos(angle) * radius * t;
          particle.y = pos.y + Math.sin(angle) * radius * t;
          particle.alpha = 1 - t;
        },
        onDone: () => {
          particle.visible = false;
        }
      });
    }
  }
}
