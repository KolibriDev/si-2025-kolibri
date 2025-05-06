import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import {
  nationalIdQuerySchema,
  sql,
  taxReturnSchema,
  validateSecret,
} from '@/lib/apiHelper'
import { TaxReturn } from '@/lib/application'

export async function GET(req: NextRequest) {
  if (!validateSecret(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(req.url)
  const nationalId = url.searchParams.get('nationalId')

  const parsed = nationalIdQuerySchema.safeParse({ nationalId })
  if (!parsed.success || !parsed.data.nationalId) {
    return NextResponse.json(
      { error: 'Missing or invalid nationalId' },
      { status: 400 },
    )
  }

  try {
    let data: TaxReturn = { nationalId: parsed.data.nationalId }

    if (data.nationalId === '1203894569') {
      data = {
        ...data,
      }
    }

    const validated = z.array(taxReturnSchema).safeParse(data)
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
