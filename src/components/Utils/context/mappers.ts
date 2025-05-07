import {
  TaxReturn,
  TaxReturnUpdateInput,
  BenefitInput,
  DeductionInput,
  MortgageInput,
  RealEstateInput,
  SalaryInput,
  VehicleInput,
  Attachment,
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

    benefits: taxReturn.benefits?.map((b) => {
      const result: BenefitInput = {
        amount: b.amount ?? undefined,
        payerName: b.payerName ?? undefined,
        payerNationalId: b.payerNationalId ?? undefined,
        benefitType: b.benefitType ?? undefined,
      }
      return result
    }),

    deductions: taxReturn.deductions?.map((d) => {
      const result: DeductionInput = {
        amount: d.amount ?? undefined,
        deductionType: d.deductionType ?? undefined,
      }
      return result
    }),

    mortgages: taxReturn.mortgages?.map((m) => {
      const result: MortgageInput = {
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
      }
      return result
    }),

    realEstates: taxReturn.realEstates?.map((r) => {
      const result: RealEstateInput = {
        address: r.address ?? undefined,
        appraisalAmount: r.appraisalAmount ?? undefined,
        number: r.number ?? undefined,
      }
      return result
    }),

    salaries: taxReturn.salaries?.map((s) => {
      const result: SalaryInput = {
        amount: s.amount ?? undefined,
        employerName: s.employerName ?? undefined,
        employerNationalId: s.employerNationalId ?? undefined,
      }
      return result
    }),

    vehicles: taxReturn.vehicles?.map((v) => {
      const result: VehicleInput = {
        appraisalAmount: v.appraisalAmount ?? undefined,
        registrationNumber: v.registrationNumber ?? undefined,
        yearOfPurchase: v.yearOfPurchase ?? undefined,
      }
      return result
    }),

    attachments: taxReturn.attachments?.map((f) => {
      const result: Attachment = {
        name: f.name ?? undefined,
        size: f.size ?? undefined,
        fileType: f.fileType ?? undefined,
      }
      return result
    }),
  }
}
