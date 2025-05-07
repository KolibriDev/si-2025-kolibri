import { BenefitType, DeductionType } from '@/generated/graphql'
import { z } from 'zod'

export interface NationalRegistry {
  nationalId: string
  name: string
  phoneNumber?: string
}

const deductionType = Object.values(DeductionType) as [string, ...string[]]
const deductionTypeSchema = z.enum(deductionType)

const benefitType = Object.values(BenefitType) as [string, ...string[]]
const benefitTypeSchema = z.enum(benefitType)

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
  loanStartDate: z.date().optional(),
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

export const taxReturnSchema = z.object({
  nationalId: z.string(),
  name: z.string().optional(),
  address: z.string().optional(),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
  hasAccidentInsurance: z.boolean().optional(),
  bankAccount: z.string().optional(),
  salaries: z.array(salarySchema).optional(),
  benefits: z.array(benefitSchema).optional(),
  deductions: z.array(deductionSchema).optional(),
  realEstates: z.array(realEstateSchema).optional(),
  vehicles: z.array(vehicleSchema).optional(),
  mortgages: z.array(mortgageSchema).optional(),
  otherDebts: z.array(otherDebtSchema).optional(),
})

export type Salary = z.infer<typeof salarySchema>
export type Benefit = z.infer<typeof benefitSchema>
export type Deduction = z.infer<typeof deductionSchema>
export type RealEstate = z.infer<typeof realEstateSchema>
export type Vehicle = z.infer<typeof vehicleSchema>
export type Mortgage = z.infer<typeof mortgageSchema>
export type OtherDebt = z.infer<typeof otherDebtSchema>
export type TaxReturn = z.infer<typeof taxReturnSchema>
