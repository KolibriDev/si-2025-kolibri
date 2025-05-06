export function formatISK(amount?: number | null): string {
  if (!amount) return ''
  return amount.toLocaleString('is-IS', { maximumFractionDigits: 0 }) + ' kr.'
}
