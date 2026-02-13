export function computeCB(actual: number, fuel: number) {
  const TARGET = 89.3368;
  const ENERGY = 41000;
  return (TARGET - actual) * fuel * ENERGY;
}
