import { NextRequest, NextResponse } from 'next/server'
import { nationalIdQuerySchema, validateSecret } from '@/lib/apiHelper'
import { TaxReturn, taxReturnSchema } from '@/lib/application'
import { BenefitType, DeductionType } from '@/generated/graphql'

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

    if (data.nationalId === '1203894569' || data.nationalId === '0108912488') {
      data = {
        ...data,
        name: 'Jökull Þórðarson',
        address: 'Bláfjallagata 12, 105 Reykjavík',
        email: 'jokull.thordarson@email.is',
        phoneNumber: '7728391',
        bankAccount: '123426004321',
        salaries: [
          {
            employerName: 'Norðurljós Software ehf',
            amount: 9360000,
            employerNationalId: '5305082559',
          },
          {
            employerName: 'Mús & Merki ehf.',
            amount: 900000,
            employerNationalId: '4802101249',
          },
        ],
        benefits: [
          {
            payerName: 'Norðurljós Software ehf.',
            benefitType: BenefitType.DAILY_ALLOWANCE,
            amount: 120000,
          },
          {
            payerName: 'Norðurljós Software ehf.',
            benefitType: BenefitType.SPORT_ALLOWANCE,
            amount: 75000,
          },
          {
            payerName: 'VR',
            benefitType: BenefitType.STUDY_ALLOWANCE,
            amount: 130000,
          },
        ],
        realEstates: [
          {
            number: '210-9876',
            address: 'Bláfjallagata 12',
            appraisalAmount: 52000000,
            yearOfPurchase: 2021,
          },
        ],
        vehicles: [
          {
            registrationNumber: 'KB-521',
            yearOfPurchase: 2021,
            appraisalAmount: 3100000,
          },
          {
            registrationNumber: 'JU-329',
            yearOfPurchase: 2012,
            appraisalAmount: 430000,
          },
        ],
        mortgages: [
          {
            realEstateNumber: '210-9876',
            lenderNationalId: '491008-0160',
            lenderName: 'Íslandsbanki hf.',
            loanNumber: '56783900123',
            loanStartDate: new Date('2021-06-21'),
            loanTermYears: 30,
            totalAnnualPayments: 2280000,
            principalPayments: 1360000,
            interestPayments: 920000,
            remainingBalance: 28540000,
          },
        ],
        deductions: [
          {
            deductionType: DeductionType.DAILY_ALLOWANCE_DEDUCTION,
            amount: 120000,
          },
          {
            deductionType: DeductionType.SPORT_ALLOWANCE_DEDUCTION,
            amount: 75000,
          },
          {
            deductionType: DeductionType.PENSION_FUND_DEDUCTION,
            amount: 130000,
          },
          {
            deductionType: DeductionType.PRIVATE_PENSION_FUND_DEDUCTION,
            amount: 50000,
          },
        ],
        otherDebts: [
          {
            lenderName: 'Eftirstöðvar á korti númer: 4469 88XX XXXX 4567',
            interestPayments: 39200,
            remainingBalance: 217000,
          },
          {
            lenderName: 'Aukalán',
            interestPayments: 86000,
            remainingBalance: 980000,
          },
          {
            lenderName: '0142-26-732645 Varðan',
            interestPayments: 14500,
            remainingBalance: 62000,
          },
          {
            lenderName: 'Kílómetragjald, Skatturinn',
            interestPayments: 0,
            remainingBalance: 2370,
          },
          {
            lenderName: 'Þing- og sveitarsjóðsgjöld, Skatturinn',
            interestPayments: 224,
            remainingBalance: 0,
          },
        ],
      }
    }

    const validated = taxReturnSchema.safeParse(data)

    return NextResponse.json(validated.data, { status: 200 })
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
