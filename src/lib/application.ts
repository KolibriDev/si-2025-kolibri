export enum DeductionType {
  OTHER = 'OTHER',
}

export interface Salary {
  employerNationalId?: string
  employerName?: string
  amount?: number
}

export interface Benefit {
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
  appraisal?: number
}

export interface Vehicle {
  registrationNumber?: string
  yearOfPurchase?: number
  purchasePrice?: number
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
}
