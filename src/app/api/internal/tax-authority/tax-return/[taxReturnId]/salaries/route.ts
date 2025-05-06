import { NextRequest, NextResponse } from 'next/server'
import { sql, salarySchema, validateSecret } from '@/lib/apiHelper'

export async function POST(req: NextRequest) {
  if (!validateSecret(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = salarySchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  try {
    await sql`
      INSERT INTO salaries (tax_return_id employer_national_id employer_name amount)
      VALUES (${parsed.data.tax_return_id}, ${parsed.data.employer_national_id}, ${parsed.data.employer_name}, ${parsed.data.amount})
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
