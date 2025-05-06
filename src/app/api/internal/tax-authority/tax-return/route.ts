import { NextRequest, NextResponse } from 'next/server'
import {
  createAndUpdateTaxReturnSchema,
  nationalIdQuerySchema,
  sql,
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
    const taxReturns = await sql`
      SELECT id, national_id, name, address, email, phone_number, has_accident_insurance, bank_account
      FROM tax_return
      WHERE national_id = ${parsed.data.nationalId ?? ''};
    `

    if (taxReturns.length === 0) {
      return NextResponse.json({ error: 'Not Found' }, { status: 404 })
    }

    const taxReturn = taxReturns[0]

    taxReturn.salaries = await sql`
      SELECT employer_national_id, employer_name, amount
      FROM tax_authority_salaries
      WHERE tax_return_id = ${taxReturn.id}
    `

    taxReturn.benefits = await sql`
      SELECT payer_national_id, benefit_type, payer_name, amount
      FROM tax_authority_benefits
      WHERE tax_return_id = ${taxReturn.id}
    `

    taxReturn.deductions = await sql`
      select deduction_type, amount
      FROM tax_authority_deductions
      WHERE tax_return_id = ${taxReturn.id}
    `

    taxReturn.realEstates = await sql`
      SELECT number, address, appraisal_amount
      FROM tax_authority_real_estates
      WHERE tax_return_id = ${taxReturn.id}
    `

    taxReturn.vehicles = await sql`
      SELECT registration_number, year_of_purchase, appraisal_amount
      FROM tax_authority_vehicles
      WHERE tax_return_id = ${taxReturn.id}
    `

    taxReturn.morgages = await sql`
      SELECT real_estate_number, lender_national_id, lender_name, loan_number, loan_start_date, loan_amount, loan_term_years, total_annual_payments, principal_payments, interest_payments, remaining_balance
      FROM tax_authority_mortgages
      WHERE tax_return_id = ${taxReturn.id}
    `

    taxReturn.otherDebts = await sql`
      SELECT lender_national_id, lender_name, interest_payments, remaining_balance
      FROM tax_authority_other_debts
      WHERE tax_return_id = ${taxReturn.id}
    `

    // console.log('Data fetched:', taxReturn)
    // const validated = taxReturnSchema.safeParse(taxReturn)
    // if (!validated.success) {
    //   return NextResponse.json(
    //     { error: 'Unexpected data format' },
    //     { status: 500 },
    //   )
    // }

    // return NextResponse.json(validated.data, { status: 200 })
    return NextResponse.json(taxReturn, { status: 200 })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
