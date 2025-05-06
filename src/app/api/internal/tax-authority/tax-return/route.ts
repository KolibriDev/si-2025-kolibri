import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import postgres from 'postgres'

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' })

const taxpayerSchema = z.object({
  national_id: z.string().length(10),
  name: z.string(),
  address: z.string(),
  email: z.string().email(),
  phone_number: z.string(),
  has_accident_insurance: z.boolean(),
  bank_account: z.string().length(12),
})

function validateSecret(req: NextRequest): boolean {
  const secret = req.headers.get('x-internal-secret')
  return secret === process.env.INTERNAL_API_SECRET
}

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

const querySchema = z.object({
  national_id: z.string(),
})

const nationalRegistrySchema = z.object({
  national_id: z.string().length(10),
  name: z.string(),
  address: z.string(),
  email: z.string().email(),
  phone_number: z.string(),
  has_accident_insurance: z.boolean(),
  bank_account: z.string().length(12),
})

export async function GET(req: NextRequest) {
  const secret = req.headers.get('x-internal-secret')
  if (secret !== process.env.INTERNAL_API_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(req.url)
  const national_id = url.searchParams.get('national_id')

  const parsed = querySchema.safeParse({ national_id })
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Missing or invalid national_id' },
      { status: 400 },
    )
  }

  try {
    const data = await sql`
      SELECT *
      FROM tax_return
      WHERE national_id = ${parsed.data.national_id};
    `

    const validated = z.array(nationalRegistrySchema).safeParse(data)
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
