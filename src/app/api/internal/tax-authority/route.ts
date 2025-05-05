import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

const taxpayerSchema = z.object({
  national_id: z.string(),
  email: z.string(),
})

const querySchema = z.object({
  nationalId: z.string(),
})

export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-internal-secret')
  if (secret !== process.env.INTERNAL_API_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(req.url)
  const nationalId = url.searchParams.get('nationalId')

  const parsed = querySchema.safeParse({ nationalId })
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Missing or invalid nationalId' },
      { status: 400 },
    )
  }

  try {
    const data = await sql`
      SELECT national_id, email
      FROM tax_authority_tax_payers
      WHERE national_id = ${parsed.data.nationalId};
    `

    const validated = z.array(taxpayerSchema).safeParse(data)
    if (!validated.success) {
      return NextResponse.json(
        { error: 'Unexpected data format' },
        { status: 500 },
      )
    }

    return NextResponse.json(validated.data, { status: 200 })
  } catch (error) {
    console.error('Error fetching data:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
