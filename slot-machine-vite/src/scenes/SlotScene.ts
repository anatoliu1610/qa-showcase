import { Application, Container, Graphics, Text } from 'pixi.js';
import type { Scene } from '@/app/SceneManager';
import { gameConfig } from '@/config/gameConfig';
import { ReelView } from '@/rendering/ReelView';
import { SlotStateMachine } from '@/domain/SlotStateMachine';
import { SpinController } from '@/domain/SpinController';
import { CryptoRng } from '@/math/CryptoRng';
import { ResultGenerator } from '@/math/ResultGenerator';
import { WinCalculator } from '@/math/WinCalculator';
import type { WinEvaluation } from '@/types/slot';

export class SlotScene implements Scene {
  private root = new Container();
  private reels: ReelView[] = [];
  private spinButton = new Container();
  private statusLabel = new Text({ text: 'Idle', style: { fill: 0xcbd5e1, fontSize: 18 } });
  private creditLabel = new Text({ text: 'Last Win: 0', style: { fill: 0x7dd3fc, fontSize: 20 } });

  private readonly stateMachine = new SlotStateMachine();
  private readonly spinController: SpinController;

  constructor(private app: Application) {
    const generator = new ResultGenerator(gameConfig, new CryptoRng());
    const winCalculator = new WinCalculator(gameConfig);

    this.spinController = new SpinController(
      this.stateMachine,
      gameConfig,
      this.reels,
      generator,
      winCalculator,
      (result) => this.onEvaluation(result)
    );
  }

  mount(): void {
    this.createLayout();
    this.app.stage.addChild(this.root);
  }

  unmount(): void {
    this.root.destroy({ children: true });
    this.reels = [];
  }

  update(deltaMs: number): void {
    this.spinController.update(deltaMs);
    this.statusLabel.text = `State: ${this.stateMachine.current}`;
  }

  private createLayout(): void {
    const title = new Text({ text: 'Slot Machine', style: { fill: 0xffffff, fontSize: 30 } });
    title.x = 24;
    title.y = 20;

    this.statusLabel.x = 24;
    this.statusLabel.y = 62;

    this.creditLabel.x = 24;
    this.creditLabel.y = 88;

    this.root.addChild(title, this.statusLabel, this.creditLabel);

    const board = new Graphics();
    board.roundRect(24, 140, 740, 320, 22);
    board.fill({ color: 0x0b1128 });
    board.stroke({ color: 0x60a5fa, alpha: 0.35, width: 2 });
    this.root.addChild(board);

    this.reels = gameConfig.reels.map((strip, i) => {
      const reel = new ReelView({ strip, widthPx: 130, symbolHeight: 90 });
      reel.x = 42 + i * 145;
      reel.y = 165;
      this.root.addChild(reel);
      return reel;
    });

    this.spinController.setReels(this.reels);

    this.createSpinButton();
  }

  private createSpinButton(): void {
    const bg = new Graphics();
    bg.roundRect(24, 490, 180, 56, 14);
    bg.fill({ color: 0x0891b2, alpha: 0.22 });
    bg.stroke({ color: 0x22d3ee, width: 2, alpha: 0.5 });

    const label = new Text({ text: 'SPIN', style: { fill: 0xe0f2fe, fontSize: 24, fontWeight: '700' } });
    label.x = 86;
    label.y = 503;

    this.spinButton.eventMode = 'static';
    this.spinButton.cursor = 'pointer';
    this.spinButton.addChild(bg, label);
    this.spinButton.on('pointertap', () => {
      this.spinController.startSpin();
    });

    this.root.addChild(this.spinButton);
  }

  private onEvaluation(result: WinEvaluation): void {
    this.creditLabel.text = `Last Win: ${result.totalAmount} (lines ${result.lineWins.length}, scatter ${result.scatterCount})`;
  }
}
