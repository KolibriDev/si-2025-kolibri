import { NextRequest, NextResponse } from 'next/server'
import { nationalIdQuerySchema, sql, validateSecret } from '@/lib/apiHelper'
import { taxReturnSchema } from '@/lib/application'

export async function POST(req: NextRequest) {
  if (!validateSecret(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const parsed = taxReturnSchema.safeParse(body)

  if (!parsed.success) {
    console.error('Validation error:', parsed.error)
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  await sql
    .begin(async (sql) => {
      const result = await sql`
        INSERT INTO tax_authority_tax_return (national_id, name, address, email, phone_number, has_accident_insurance, bank_account)
        VALUES (${parsed.data.nationalId}, ${parsed.data.name ?? null}, ${parsed.data.address ?? null}, ${parsed.data.email ?? null}, ${parsed.data.phoneNumber ?? null}, ${parsed.data.hasAccidentInsurance ?? null}, ${parsed.data.bankAccount ?? null})
        RETURNING id
      `

      const taxReturnId = result[0].id

      for (const salary of parsed.data.salaries ?? []) {
        await sql`
        INSERT INTO tax_authority_salaries (tax_return_id, employer_national_id, employer_name, amount)
        VALUES (${taxReturnId}, ${salary.employerNationalId ?? null}, ${salary.employerName ?? null}, ${salary.amount ?? null})
      `
      }

      for (const benefit of parsed.data.benefits ?? []) {
        await sql`
        INSERT INTO tax_authority_benefits (tax_return_id, payer_national_id, benefit_type, payer_name, amount)
        VALUES (${taxReturnId}, ${benefit.payerNationalId ?? null}, ${benefit.benefitType ?? null}, ${benefit.payerName ?? null}, ${benefit.amount ?? null})
      `
      }

      for (const deduction of parsed.data.deductions ?? []) {
        await sql`
        INSERT INTO tax_authority_deductions (tax_return_id, deduction_type, amount)
        VALUES (${taxReturnId}, ${deduction.deductionType ?? null}, ${deduction.amount ?? null})
      `
      }

      for (const realEstate of parsed.data.realEstates ?? []) {
        await sql`
        INSERT INTO tax_authority_real_estates (tax_return_id, number, address, appraisal_amount)
        VALUES (${taxReturnId}, ${realEstate.number ?? null}, ${realEstate.address ?? null}, ${realEstate.appraisalAmount ?? null})
      `
      }

      for (const vehicle of parsed.data.vehicles ?? []) {
        await sql`
        INSERT INTO tax_authority_vehicles (tax_return_id, registration_number, year_of_purchase, appraisal_amount)
        VALUES (${taxReturnId}, ${vehicle.registrationNumber ?? null}, ${vehicle.yearOfPurchase ?? null}, ${vehicle.appraisalAmount ?? null})
      `
      }

      for (const mortgage of parsed.data.mortgages ?? []) {
        await sql`
        INSERT INTO tax_authority_mortgages (tax_return_id, real_estate_number, lender_national_id, lender_name, loan_number, loan_start_date, loan_amount, loan_term_years, total_annual_payments, principal_payments, interest_payments, remaining_balance)
        VALUES (${taxReturnId}, ${mortgage.realEstateNumber ?? null}, ${mortgage.lenderNationalId ?? null}, ${mortgage.lenderName ?? null}, ${mortgage.loanNumber ?? null}, ${mortgage.loanStartDate ?? null}, ${mortgage.loanAmount ?? null}, ${mortgage.loanTermYears ?? null}, ${mortgage.totalAnnualPayments ?? null}, ${mortgage.principalPayments ?? null}, ${mortgage.interestPayments ?? null}, ${mortgage.remainingBalance ?? null})
      `
      }

      for (const otherDebt of parsed.data.otherDebts ?? []) {
        await sql`
        INSERT INTO tax_authority_other_debts (tax_return_id, lender_national_id, lender_name, interest_payments, remaining_balance)
        VALUES (${taxReturnId}, ${otherDebt.lenderNationalId ?? null}, ${otherDebt.lenderName ?? null}, ${otherDebt.interestPayments ?? null}, ${otherDebt.remainingBalance ?? null})
      `
      }
    })
    .catch((error) => {
      console.error('Error creating record:', error)
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 },
      )
    })

  return NextResponse.json({ message: 'Created' }, { status: 201 })
}

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
    const taxReturns = await sql`
      SELECT id, national_id, name, address, email, phone_number, has_accident_insurance, bank_account
      FROM tax_authority_tax_return
      WHERE national_id = ${parsed.data.nationalId}
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
