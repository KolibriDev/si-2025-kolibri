import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import {
  sql,
  taxpayerSchema,
  updateTaxpayerSchema,
  validateSecret,
} from '@/lib/apiHelper'

export async function GET(req: NextRequest) {
  const national_id = req.nextUrl.pathname.split('/').pop()

  if (!national_id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
  }

  if (!validateSecret(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await sql`
      SELECT national_id, email
      FROM tax_authority_tax_payers
      WHERE national_id = ${national_id};
    `

    const validated = z.array(taxpayerSchema).safeParse(data)

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Unexpected data format' },
        { status: 500 },
      )
    }

    if (validated.data.length === 0) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 })
    }

    return NextResponse.json(validated.data[0], { status: 200 })
  } catch (error) {
    console.error('Error fetching data:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

export async function PUT(req: NextRequest) {
  const national_id = req.nextUrl.pathname.split('/').pop()

  if (!national_id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
  }

  if (!validateSecret(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = updateTaxpayerSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  try {
    const result = await sql`
      UPDATE tax_authority_tax_payers
      SET email = ${parsed.data.email}
      WHERE national_id = ${national_id};
    `

    if (result.count === 0) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Updated' }, { status: 200 })
  } catch (error) {
    console.error('Error updating record:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
