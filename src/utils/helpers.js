export function formatCurrency(amount) {
  const value = parseFloat(amount);
  if (isNaN(value)) return "$0.00";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export function truncateText(text, maxLength = 60) {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
