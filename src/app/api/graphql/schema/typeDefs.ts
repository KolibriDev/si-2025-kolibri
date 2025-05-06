export const typeDefs = /* GraphQL */ `
  enum DeductionType {
    OTHER
  }

  input SalaryInput {
    employerNationalId: String
    employerName: String
    amount: Float
  }

  input BenefitInput {
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
    appraisal: Float
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
    appraisal: Float
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
