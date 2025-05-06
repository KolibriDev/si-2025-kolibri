export function formatISK(amount?: number | null): string {
  if (!amount) return ''
  return amount.toLocaleString('is-IS', { maximumFractionDigits: 0 }) + ' kr.'
}

export function formatDateIS(date: Date): string {
  return date.toLocaleDateString('is-IS', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
