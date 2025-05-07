export enum DeductionType {
  OTHER = 'OTHER',
}

export enum BenefitType {
  DAILY_ALLOWANCE = 'DAILY_ALLOWANCE',
  SPORT_ALLOWANCE = 'SPORT_ALLOWANCE',
  STUDY_ALLOWANCE = 'STUDY_ALLOWANCE',
  OTHER = 'OTHER',
}

export interface NationalRegistry {
  nationalId: string
  name: string
  phoneNumber?: string
}

import { z } from 'zod'

const deductionTypeSchema = z.enum([
  'OTHER',
  'SPORT_ALLOWANCE_DEDUCTION',
  'PENSION_FUND_DEDUCTION',
  'DAILY_ALLOWANCE_DEDUCTION',
  'PRIVATE_PENSION_FUND_DEDUCTION',
  'CHARITY_DEDUCTION',
  'DRIVING_ALLOWANCE_DEDUCTION',
  'TRANSPORT_ALLOWANCE_DEDUCTION',
])
const benefitTypeSchema = z.enum([
  'DAILY_ALLOWANCE',
  'SPORT_ALLOWANCE',
  'STUDY_ALLOWANCE',
  'OTHER',
])

const salarySchema = z.object({
  employerNationalId: z.string().optional(),
  employerName: z.string().optional(),
  amount: z.number().optional(),
})

const benefitSchema = z.object({
  benefitType: benefitTypeSchema.optional(),
  payerNationalId: z.string().optional(),
  payerName: z.string().optional(),
  amount: z.number().optional(),
})

const deductionSchema = z.object({
  deductionType: deductionTypeSchema.optional(),
  amount: z.number().optional(),
})

const realEstateSchema = z.object({
  number: z.string().optional(),
  address: z.string().optional(),
  appraisalAmount: z.number().optional(),
  yearOfPurchase: z.number().optional(),
})

const vehicleSchema = z.object({
  registrationNumber: z.string().optional(),
  yearOfPurchase: z.number().optional(),
  appraisalAmount: z.number().optional(),
})

const mortgageSchema = z.object({
  realEstateNumber: z.string().optional(),
  lenderNationalId: z.string().optional(),
  lenderName: z.string().optional(),
  loanNumber: z.string().optional(),
  loanStartDate: z.coerce.date().optional(),
  loanAmount: z.number().optional(),
  loanTermYears: z.number().optional(),
  totalAnnualPayments: z.number().optional(),
  principalPayments: z.number().optional(),
  interestPayments: z.number().optional(),
  remainingBalance: z.number().optional(),
})

const otherDebtSchema = z.object({
  lenderNationalId: z.string().optional(),
  lenderName: z.string().optional(),
  interestPayments: z.number().optional(),
  remainingBalance: z.number().optional(),
})

const attachmentSchema = z.object({
  name: z.string().optional(),
  size: z.number().optional(),
  fileType: z.string().optional(),
})

export const taxReturnSchema = z.object({
  nationalId: z.string().nullable(),
  name: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  phoneNumber: z.string().optional().nullable(),
  hasAccidentInsurance: z.boolean().optional().nullable(),
  bankAccount: z.string().optional().nullable(),
  salaries: z.array(salarySchema).optional().nullable(),
  benefits: z.array(benefitSchema).optional().nullable(),
  deductions: z.array(deductionSchema).optional().nullable(),
  realEstates: z.array(realEstateSchema).optional().nullable(),
  vehicles: z.array(vehicleSchema).optional().nullable(),
  mortgages: z.array(mortgageSchema).optional().nullable(),
  otherDebts: z.array(otherDebtSchema).optional().nullable(),
  attachments: z.array(attachmentSchema).optional().nullable(),
})

export type Salary = z.infer<typeof salarySchema>
export type Benefit = z.infer<typeof benefitSchema>
export type Deduction = z.infer<typeof deductionSchema>
export type RealEstate = z.infer<typeof realEstateSchema>
export type Vehicle = z.infer<typeof vehicleSchema>
export type Mortgage = z.infer<typeof mortgageSchema>
export type OtherDebt = z.infer<typeof otherDebtSchema>
export type Attachment = z.infer<typeof attachmentSchema>
export type TaxReturn = z.infer<typeof taxReturnSchema>
