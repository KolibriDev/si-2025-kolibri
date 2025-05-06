import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import {
  createAndUpdateTaxReturnSchema,
  nationalIdQuerySchema,
  sql,
  taxReturnSchema,
  validateSecret,
} from '@/lib/apiHelper'

export async function POST(req: NextRequest) {
  if (!validateSecret(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = createAndUpdateTaxReturnSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  try {
    await sql`
      INSERT INTO tax_return (national_id, name, address, email, phone_number, has_accident_insurance, bank_account)
      VALUES (${parsed.data.national_id}, ${parsed.data.name}, ${parsed.data.address}, ${parsed.data.email}, ${parsed.data.phone_number},${parsed.data.has_accident_insurance}, ${parsed.data.bank_account})
    `

    return NextResponse.json({ message: 'Created' }, { status: 201 })
  } catch (error) {
    console.error('Error creating record:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

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
      SELECT id, national_id, name, address, email, phone_number, has_accident_insurance, bank_account
      FROM tax_return
      WHERE national_id = ${parsed.data.nationalId};
    `

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
