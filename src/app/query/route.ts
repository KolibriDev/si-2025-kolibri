import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

async function nationalRegistry(nationalId: string) {
  const data = await sql`
    SELECT *
    FROM national_registry
    WHERE national_id = ${nationalId};
  `

  return data
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const nationalId = searchParams.get('nationalId')

  if (!nationalId) {
    return Response.json({ error: 'Missing nationalId' }, { status: 400 })
  }

  try {
    const result = await nationalRegistry(nationalId)
    return Response.json(result)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
