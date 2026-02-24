import type { AssetManifest } from '@/assets/AssetManifest';

export class AssetLoader {
  async preload(_manifest: AssetManifest, onProgress: (progress: number) => void): Promise<void> {
    onProgress(1);
  }
}
