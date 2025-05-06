import {
  TaxReturn,
  TaxReturnUpdateInput,
  BenefitInput,
  DeductionInput,
  MortgageInput,
  RealEstateInput,
  SalaryInput,
  VehicleInput,
} from '@/generated/graphql'

export function mapTaxReturnToUpdateInput(
  taxReturn: TaxReturn,
): TaxReturnUpdateInput {
  return {
    address: taxReturn.address ?? undefined,
    bankAccount: taxReturn.bankAccount ?? undefined,
    email: taxReturn.email ?? undefined,
    phoneNumber: taxReturn.phoneNumber ?? undefined,
    hasAccidentInsurance: taxReturn.hasAccidentInsurance ?? undefined,

    benefits: taxReturn.benefits?.map(
      (b) =>
        ({
          amount: b.amount ?? undefined,
          payerName: b.payerName ?? undefined,
          payerNationalId: b.payerNationalId ?? undefined,
          benefitType: b.benefitType ?? undefined,
        }) as BenefitInput,
    ),

    deductions: taxReturn.deductions?.map(
      (d) =>
        ({
          amount: d.amount ?? undefined,
          deductionType: d.deductionType ?? undefined,
        }) as DeductionInput,
    ),

    mortgages: taxReturn.mortgages?.map(
      (m) =>
        ({
          interestPayments: m.interestPayments ?? undefined,
          lenderName: m.lenderName ?? undefined,
          lenderNationalId: m.lenderNationalId ?? undefined,
          loanAmount: m.loanAmount ?? undefined,
          loanNumber: m.loanNumber ?? undefined,
          loanStartDate: m.loanStartDate ?? undefined,
          loanTermYears: m.loanTermYears ?? undefined,
          principalPayments: m.principalPayments ?? undefined,
          realEstateNumber: m.realEstateNumber ?? undefined,
          remainingBalance: m.remainingBalance ?? undefined,
          totalAnnualPayments: m.totalAnnualPayments ?? undefined,
        }) as MortgageInput,
    ),

    realEstates: taxReturn.realEstates?.map(
      (r) =>
        ({
          address: r.address ?? undefined,
          appraisal: r.appraisalAmount ?? undefined,
          number: r.number ?? undefined,
        }) as RealEstateInput,
    ),

    salaries: taxReturn.salaries?.map(
      (s) =>
        ({
          amount: s.amount ?? undefined,
          employerName: s.employerName ?? undefined,
          employerNationalId: s.employerNationalId ?? undefined,
        }) as SalaryInput,
    ),

    vehicles: taxReturn.vehicles?.map(
      (v) =>
        ({
          purchasePrice: v.purchasePrice ?? undefined,
          registrationNumber: v.registrationNumber ?? undefined,
          yearOfPurchase: v.yearOfPurchase ?? undefined,
        }) as VehicleInput,
    ),
  }
}
