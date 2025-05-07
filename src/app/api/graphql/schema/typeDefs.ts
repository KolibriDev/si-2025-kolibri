export const typeDefs = /* GraphQL */ `
  enum DeductionType {
    DAILY_ALLOWANCE_DEDUCTION
    DRIVING_ALLOWANCE_DEDUCTION
    PENSION_FUND_DEDUCTION
    PRIVATE_PENSION_FUND_DEDUCTION
    SPORT_ALLOWANCE_DEDUCTION
    TRANSPORT_ALLOWANCE_DEDUCTION
    CHARITY_DEDUCTION
  }

  enum BenefitType {
    DAILY_ALLOWANCE
    DRIVING_ALLOWANCE
    CAR_ALLOWANCE
    HOUSING_ALLOWANCE
    SPORT_ALLOWANCE
    TRANSPORT_ALLOWANCE
    STUDY_ALLOWANCE
    RESEARCH_ALLOWANCE
    OTHER_ALLOWANCE
  }

  enum PensionType {
    PENSION_FUND
    PRIVATE_PENSION_FUND
    SOCIAL_SECURITY
    UNEMPLOYMENT_BENEFITS
    MUNICIPAL_FINANCIAL_AID
  }

  enum OtherIncomeType {
    FOREIGN_INCOME
    TAX_EXEMPT_SOCIAL_SECURITY
    TAX_EXEMPT_LOTTERY_PRIZES
    OTHER_TAX_EXEMPT_INCOME
    TAX_EXEMPT_DISPOSAL_FROM_PRIVATE_PENSION_FUND
    TAX_EXEMPT_WITHDRAWAL_FROM_PRIVATE_PENSION_FUND
  }

  input SalaryInput {
    employerNationalId: String
    employerName: String
    amount: Float
  }

  input BenefitInput {
    benefitType: BenefitType
    payerNationalId: String
    payerName: String
    amount: Float
  }

  input DeductionInput {
    deductionType: DeductionType
    amount: Float
  }

  input RealEstateInput {
    number: String
    address: String
    appraisalAmount: Float
  }

  input VehicleInput {
    registrationNumber: String
    yearOfPurchase: Int
    purchasePrice: Float
  }

  input MortgageInput {
    realEstateNumber: String
    lenderNationalId: String
    lenderName: String
    loanNumber: String
    loanStartDate: String
    loanAmount: Float
    loanTermYears: Int
    totalAnnualPayments: Float
    principalPayments: Float
    interestPayments: Float
    remainingBalance: Float
  }

  input TaxReturnUpdateInput {
    address: String
    email: String
    phoneNumber: String
    hasAccidentInsurance: Boolean
    bankAccount: String
    salaries: [SalaryInput!]
    benefits: [BenefitInput!]
    deductions: [DeductionInput!]
    realEstates: [RealEstateInput!]
    vehicles: [VehicleInput!]
    mortgages: [MortgageInput!]
  }

  type Salary {
    employerNationalId: String
    employerName: String
    amount: Float
  }

  type Benefit {
    benefitType: BenefitType
    payerNationalId: String
    payerName: String
    amount: Float
  }

  type Deduction {
    deductionType: DeductionType
    amount: Float
  }

  type RealEstate {
    number: String
    address: String
    appraisalAmount: Float
  }

  type Vehicle {
    registrationNumber: String
    yearOfPurchase: Int
    purchasePrice: Float
  }

  type Mortgage {
    realEstateNumber: String
    lenderNationalId: String
    lenderName: String
    loanNumber: String
    loanStartDate: String
    loanAmount: Float
    loanTermYears: Int
    totalAnnualPayments: Float
    principalPayments: Float
    interestPayments: Float
    remainingBalance: Float
  }

  type OtherDebt {
    lenderNationalId: String
    lenderName: String
    interestPayments: Float
    remainingBalance: Float
  }

  type TaxReturn {
    nationalId: String!
    name: String
    address: String
    email: String
    phoneNumber: String
    hasAccidentInsurance: Boolean
    bankAccount: String
    salaries: [Salary!]
    benefits: [Benefit!]
    deductions: [Deduction!]
    realEstates: [RealEstate!]
    vehicles: [Vehicle!]
    mortgages: [Mortgage!]
    otherDebts: [OtherDebt!]
  }

  type NationalRegistry {
    nationalId: String!
    name: String
    phoneNumber: String
  }

  type Query {
    taxReturn(nationalId: String!): TaxReturn
    individual(phoneNumber: String!): NationalRegistry
    taxReturnPrefill(nationalId: String!): TaxReturn
    submittedTaxReturn(nationalId: String!): TaxReturn
  }

  type Mutation {
    sayHi(name: String!): String
    createTaxReturn(nationalId: String!): TaxReturn
    updateTaxReturn(
      nationalId: String!
      input: TaxReturnUpdateInput!
    ): TaxReturn
  }
`
