export function scoreToRate(score: number): number {
  return Math.ceil(score / 20);
}
