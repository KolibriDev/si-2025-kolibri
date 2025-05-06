import { NextRequest, NextResponse } from 'next/server'
import { sql, taxpayerSchema, validateSecret } from '@/lib/apiHelper'

export async function POST(req: NextRequest) {
  if (!validateSecret(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = taxpayerSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  try {
    await sql`
      INSERT INTO tax_authority_tax_payers (national_id, email)
      VALUES (${parsed.data.national_id}, ${parsed.data.email})
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
