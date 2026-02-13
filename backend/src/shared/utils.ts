function percentDiff(comparison, baseline) {
  if (baseline === 0) {
    throw new Error("Baseline cannot be zero");
  }

  return Number((((comparison / baseline) - 1) * 100).toFixed(2));
}

function isPositiveNumber(value) {
  return typeof value === "number" && value > 0;
}

module.exports = {
  percentDiff,
  isPositiveNumber
};
