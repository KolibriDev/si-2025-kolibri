export async function fetchTaxPayerByNationalId(nationalId: string) {
  const res = await fetch(
    `${process.env.INTERNAL_API_BASE_URL}/api/internal/tax-authority/?nationalId=${nationalId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-internal-secret': process.env.INTERNAL_API_SECRET ?? '',
      },
    },
  )
  const data = await res.json()
  return data[0] ?? null
}
