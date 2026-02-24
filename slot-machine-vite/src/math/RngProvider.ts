export interface RngProvider {
  nextFloat(): number;
  nextInt(maxExclusive: number): number;
}
