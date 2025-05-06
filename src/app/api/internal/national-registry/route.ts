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
  const query = {
    nationalId: url.searchParams.get('nationalId') || undefined,
    phoneNumber: url.searchParams.get('phoneNumber') || undefined,
  }

  const parsed = nationalIdQuerySchema.safeParse(query)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid query parameters', reason: parsed.error },
      { status: 400 },
    )
  }

  try {
    const conditions = []
    if (parsed.data.nationalId) {
      conditions.push(sql`national_id = ${parsed.data.nationalId}`)
    }
    if (parsed.data.phoneNumber) {
      conditions.push(sql`phone_number = ${parsed.data.phoneNumber}`)
    }

    let whereClause = sql``

    if (conditions.length > 0) {
      // Start with WHERE and append conditions using AND
      whereClause = sql`WHERE `

      for (let i = 0; i < conditions.length; i++) {
        if (i > 0) {
          whereClause = sql`${whereClause} AND `
        }
        whereClause = sql`${whereClause}${conditions[i]}`
      }
    }

    const data = await sql`
      SELECT *
      FROM national_registry
      ${whereClause}
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
