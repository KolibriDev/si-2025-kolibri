export async function fetchIndividualByNationalId(nationalId: string) {
  const res = await fetch(
    `${process.env.INTERNAL_API_BASE_URL}/api/internal/national-registry/?nationalId=${nationalId}`,
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

export async function fetchIndividualByPhone(phoneNumber: string) {
  const res = await fetch(
    `${process.env.INTERNAL_API_BASE_URL}/api/internal/national-registry/?phoneNumber=${phoneNumber}`,
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
