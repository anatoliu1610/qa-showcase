import { Container } from 'pixi.js';
import { ScatterEffects } from '@/rendering/ScatterEffects';
import { WinLineView } from '@/rendering/WinLineView';

export class EffectsLayer extends Container {
  readonly symbolHighlightLayer = new Container();

  constructor(
    public readonly winLineView: WinLineView,
    public readonly scatterEffects: ScatterEffects
  ) {
    super();
    this.sortableChildren = true;

    this.symbolHighlightLayer.zIndex = 10;
    this.winLineView.zIndex = 20;
    this.scatterEffects.zIndex = 30;

    this.addChild(this.symbolHighlightLayer);
    this.addChild(this.winLineView);
    this.addChild(this.scatterEffects);
  }

  clearAll(): void {
    this.winLineView.clearAll();
    this.scatterEffects.clearEffects();
    this.symbolHighlightLayer.removeChildren().forEach((c) => c.destroy());
  }
}
