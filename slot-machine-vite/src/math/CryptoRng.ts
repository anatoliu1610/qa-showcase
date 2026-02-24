import type { RngProvider } from '@/math/RngProvider';

export class CryptoRng implements RngProvider {
  nextFloat(): number {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return (arr[0] ?? 0) / 4294967296;
  }

  nextInt(maxExclusive: number): number {
    return Math.floor(this.nextFloat() * maxExclusive);
  }
}
