export function formatISK(amount: number): string {
  return amount.toLocaleString('is-IS', { maximumFractionDigits: 0 }) + ' kr.'
}
