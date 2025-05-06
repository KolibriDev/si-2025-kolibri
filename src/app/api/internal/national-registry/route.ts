import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import {
  nationalIdQuerySchema,
  nationalRegistrySchema,
  sql,
} from '@/lib/apiHelper'

export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-internal-secret')
  if (secret !== process.env.INTERNAL_API_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(req.url)
  const national_id = url.searchParams.get('national_id')

  const parsed = nationalIdQuerySchema.safeParse({ national_id })
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
        { error: 'Unexpected data format', reason: validated.error },
        { status: 500 },
      )
    }

    return NextResponse.json(validated.data, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error', reason: error },
      { status: 500 },
    )
  }
}
