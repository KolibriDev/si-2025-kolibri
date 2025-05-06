import { sql, taxReturnSchema, validateSecret } from '@/lib/apiHelper'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split('/').pop()

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
  }

  if (!validateSecret(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await sql`
      SELECT id, national_id, name, address, email, phone_number, has_accident_insurance, bank_account
      FROM tax_return
      WHERE id = ${id};
    `

    const validated = z.array(taxReturnSchema).safeParse(data)

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
  const id = req.nextUrl.pathname.split('/').pop()

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
  }

  if (!validateSecret(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = taxReturnSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  try {
    const result = await sql`
      UPDATE tax_return
      SET national_id = ${parsed.data.national_id},
          name = ${parsed.data.name},
          address = ${parsed.data.address},
          email = ${parsed.data.email},
          phone_number = ${parsed.data.phone_number},
          has_accident_insurance = ${parsed.data.has_accident_insurance},
          bank_account = ${parsed.data.bank_account}
      WHERE id = ${id};
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
