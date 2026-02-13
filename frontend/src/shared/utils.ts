export function percentDiff(
  comparison: number,
  baseline: number
): number {
  if (baseline === 0) return 0;

  return Number((((comparison / baseline) - 1) * 100).toFixed(2));
}

export function formatNumber(value: number): string {
  return value.toLocaleString(undefined, {
    maximumFractionDigits: 2
  });
}
