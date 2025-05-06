import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

const querySchema = z.object({
  national_id: z.string(),
})

const nationalRegistrySchema = z.object({
  national_id: z.string().length(10),
  name: z.string(),
})

export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-internal-secret')
  if (secret !== process.env.INTERNAL_API_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(req.url)
  const national_id = url.searchParams.get('national_id')

  const parsed = querySchema.safeParse({ national_id })
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Missing or invalid national_id' },
      { status: 400 },
    )
  }

  try {
    const data = await sql`
      SELECT *
      FROM national_registry
      WHERE national_id = ${parsed.data.national_id};
    `

    const validated = z.array(nationalRegistrySchema).safeParse(data)
    if (!validated.success) {
      return NextResponse.json(
        { error: 'Unexpected data format' },
        { status: 500 },
      )
    }

    return NextResponse.json(validated.data, { status: 200 })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
