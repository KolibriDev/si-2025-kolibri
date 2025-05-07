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
    return jsonError('Unauthorized', 401)
  }

  const query = getQueryParams(req)

  const parsed = nationalIdQuerySchema.safeParse(query)
  if (!parsed.success) {
    return jsonError('Invalid query parameters', 400, parsed.error)
  }

  try {
    const data = await queryNationalRegistry(parsed.data)

    const validated = z.array(nationalRegistrySchema).safeParse(data)
    if (!validated.success) {
      return jsonError('Unexpected data format', 500, validated.error)
    }

    return NextResponse.json(validated.data)
  } catch (error) {
    return jsonError('Internal Server Error', 500, error)
  }
}

function getQueryParams(req: NextRequest) {
  const url = new URL(req.url)
  return {
    nationalId: url.searchParams.get('nationalId') || undefined,
    phoneNumber: url.searchParams.get('phoneNumber') || undefined,
  }
}

async function queryNationalRegistry({
  nationalId,
  phoneNumber,
}: {
  nationalId?: string
  phoneNumber?: string
}) {
  const conditions = []
  if (nationalId) conditions.push(sql`national_id = ${nationalId}`)
  if (phoneNumber) conditions.push(sql`phone_number = ${phoneNumber}`)

  const where = conditions.length
    ? conditions.reduce(
        (acc, condition, i) =>
          i === 0 ? sql`WHERE ${condition}` : sql`${acc} AND ${condition}`,
        sql``,
      )
    : sql``

  return await sql`
    SELECT *
    FROM national_registry
    ${where}
  `
}

function jsonError(message: string, status: number, reason?: unknown) {
  return NextResponse.json({ error: message, reason }, { status })
}
