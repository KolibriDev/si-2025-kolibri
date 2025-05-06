import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import {
  nationalIdQuerySchema,
  taxReturnSchema,
  validateSecret,
} from '@/lib/apiHelper'
import { BenefitType, TaxReturn } from '@/lib/application'

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

    if (data.nationalId === '1203894569') {
      data = {
        ...data,
        name: 'Jökull Þórðarson',
        address: 'Bláfjallagata 12, 105 Reykjavík',
        email: 'jokull.thordarson@email.is',
        phoneNumber: '7728391',
        salaries: [
          { employerName: 'Norðurljós Software ehf', amount: 9360000 },
          { employerName: 'Mús & Merki ehf.', amount: 900000 },
        ],
        benefits: [
          { benefitType: BenefitType.DAILY_ALLOWANCE, amount: 120000 },
          { benefitType: BenefitType.SPORT_ALLOWANCE, amount: 75000 },
          { benefitType: BenefitType.STUDY_ALLOWANCE, amount: 130000 },
        ],
        realEstates: [
          {
            number: '210-9876',
            address: 'Bláfjallagata 12',
            appraisalAmount: 52000000,
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
            yearOfPurchase: 2021,
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
      }
    }

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
