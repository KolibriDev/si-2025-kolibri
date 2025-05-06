import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import {
  nationalIdQuerySchema,
  nationalRegistrySchema,
  sql,
  validateSecret,
} from '@/lib/apiHelper'

export async function GET(req: NextRequest) {
  if (!validateSecret(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(req.url)
  const nationalId = url.searchParams.get('nationalId')

  const parsed = nationalIdQuerySchema.safeParse({ nationalId })
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Missing or invalid nationalId' },
      { status: 400 },
    )
  }

  try {
    const data = await sql`
      SELECT *
      FROM national_registry
      WHERE national_id = ${parsed.data.nationalId};
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
