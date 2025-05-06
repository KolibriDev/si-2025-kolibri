import { sql, salarySchema, validateSecret } from '@/lib/apiHelper'
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
      SELECT id, tax_return_id employer_national_id employer_name amount
      FROM salaries
      WHERE id = ${id};
    `

    const validated = z.array(salarySchema).safeParse(data)

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
  const parsed = salarySchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  try {
    const result = await sql`
      UPDATE tax_return
      SET employer_national_id = ${parsed.data.employer_national_id},
          employer_name = ${parsed.data.employer_name},
          amount = ${parsed.data.amount}}
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
