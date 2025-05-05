import postgres from 'postgres'
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

async function getTaxPayer(nationalId: string) {
  const data = await sql`
    SELECT *
    FROM tax_authority_tax_payers
    WHERE national_id = ${nationalId};
  `

  return data
}

export async function GET(request: Request) {
  const secret = request.headers.get('x-internal-secret')
  if (secret !== process.env.INTERNAL_API_SECRET) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { searchParams } = new URL(request.url)

  const nationalId = searchParams.get('nationalId')

  if (!nationalId) {
    return Response.json({ error: 'Missing nationalId' }, { status: 400 })
  }

  try {
    const result = await getTaxPayer(nationalId)

    return Response.json(result)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
