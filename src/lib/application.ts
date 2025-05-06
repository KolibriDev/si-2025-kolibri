export enum DeductionType {
  OTHER = 'OTHER',
}

export enum BenefitType {
  DAILY_ALLOWANCE = 'DAILY_ALLOWANCE',
  SPORT_ALLOWANCE = 'SPORT_ALLOWANCE',
  STUDY_ALLOWANCE = 'STUDY_ALLOWANCE',
  OTHER = 'OTHER',
}

export interface Salary {
  employerNationalId?: string
  employerName?: string
  amount?: number
}

export interface Benefit {
  benefitType?: BenefitType
  payerNationalId?: string
  payerName?: string
  amount?: number
}

export interface Deduction {
  deductionType?: DeductionType
  amount?: number
}

export interface RealEstate {
  number?: string
  address?: string
  appraisalAmount?: number
}

export interface Vehicle {
  registrationNumber?: string
  yearOfPurchase?: number
  appraisalAmount?: number
}

export interface Mortgage {
  realEstateNumber?: string
  lenderNationalId?: string
  lenderName?: string
  loanNumber?: string
  loanStartDate?: Date
  loanAmount?: number
  loanTermYears?: number
  totalAnnualPayments?: number
  principalPayments?: number
  interestPayments?: number
  remainingBalance?: number
}

export interface OtherDebt {
  lenderNationalId?: string
  lenderName?: string
  interestPayments?: number
  remainingBalance?: number
}

export interface TaxReturn {
  nationalId: string
  name?: string
  address?: string
  email?: string
  phoneNumber?: string
  hasAccidentInsurance?: boolean
  bankAccount?: string
  salaries?: Salary[]
  benefits?: Benefit[]
  deductions?: Deduction[]
  realEstates?: RealEstate[]
  vehicles?: Vehicle[]
  mortgages?: Mortgage[]
  otherDebts?: OtherDebt[]
}

export interface NationalRegistry {
  nationalId: string
  name: string
  phoneNumber?: string
}
import { z } from 'zod'

const deductionTypeSchema = z.enum(['OTHER'])
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
