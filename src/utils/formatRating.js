export function formatRating(rating) {
  const num = parseFloat(rating);
  if (isNaN(num) || num <= 0) return "0.0";
  return num.toFixed(1);
}
