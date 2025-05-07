export const formatPhoneNr = (digits?: string) => {
  if (!digits) return ''

  const a = digits.slice(0, 3)
  const b = digits.slice(3, 7)

  return b ? `${a}-${b}` : a
}
