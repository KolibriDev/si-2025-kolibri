export const typeDefs = /* GraphQL */ `
  """
  Types of deductions that can be claimed on a tax return
  """
  enum DeductionType {
    """
    Other miscellaneous deductions
    (Aðrir ýmsir frádrættir)
    """
    OTHER

    """
    Deduction for daily allowances
    (Frádráttur á móti dagpeningum)
    """
    DAILY_ALLOWANCE_DEDUCTION

    """
    Deduction for driving allowances
    (Frádráttur á móti ökutækjastyrk)
    """
    DRIVING_ALLOWANCE_DEDUCTION

    """
    Deduction for pension fund contributions
    (Frádráttur á móti iðgjaldi í lífeyrissjóð)
    """
    PENSION_FUND_DEDUCTION

    """
    Deduction for private pension fund contributions
    (Frádráttur á móti iðgjaldi í séreignarsjóð)
    """
    PRIVATE_PENSION_FUND_DEDUCTION

    """
    Deduction for sport and wellness allowances
    (Frádráttur á móti íþróttastyrk)
    """
    SPORT_ALLOWANCE_DEDUCTION

    """
    Deduction for transport allowances
    (Frádráttur á móti samgöngustyrk)
    """
    TRANSPORT_ALLOWANCE_DEDUCTION

    """
    Deduction for charity contributions
    (Frádráttur vegna framlaga til almannaheillafélaga)
    """
    CHARITY_DEDUCTION
  }

  """
  Types of benefits received from employers or other entities
  """
  enum BenefitType {
    "Daily allowance payments"
    DAILY_ALLOWANCE
    "Driving allowance payments"
    DRIVING_ALLOWANCE
    "Car allowance payments"
    CAR_ALLOWANCE
    "Housing allowance payments"
    HOUSING_ALLOWANCE
    "Sport and wellness allowance"
    SPORT_ALLOWANCE
    "Transport allowance payments"
    TRANSPORT_ALLOWANCE
    "Educational and study-related allowance"
    STUDY_ALLOWANCE
    "Research or scientific allowance"
    RESEARCH_ALLOWANCE
    "Other miscellaneous benefits"
    OTHER_ALLOWANCE
  }

  """
  Types of pension and social security benefits
  """
  enum PensionType {
    PENSION_FUND
    PRIVATE_PENSION_FUND
    SOCIAL_SECURITY
    UNEMPLOYMENT_BENEFITS
    MUNICIPAL_FINANCIAL_AID
  }

  """
  Types of other income that may be tax-exempt
  """
  enum OtherIncomeType {
    FOREIGN_INCOME
    TAX_EXEMPT_SOCIAL_SECURITY
    TAX_EXEMPT_LOTTERY_PRIZES
    OTHER_TAX_EXEMPT_INCOME
    TAX_EXEMPT_DISPOSAL_FROM_PRIVATE_PENSION_FUND
    TAX_EXEMPT_WITHDRAWAL_FROM_PRIVATE_PENSION_FUND
  }

  """
  Input type for salary information from an employer
  """
  input SalaryInput {
    "National ID (kennitala) of the employer"
    employerNationalId: String
    "Name of the employer"
    employerName: String
    "Total salary amount for the tax year"
    amount: Float
  }

  """
  Input type for benefits received from employers or other entities
  """
  input BenefitInput {
    "Type of benefit received"
    benefitType: BenefitType
    "National ID (kennitala) of the benefit payer"
    payerNationalId: String
    "Name of the benefit payer"
    payerName: String
    "Total benefit amount for the tax year"
    amount: Float
  }

  """
  Input type for tax deductions
  """
  input DeductionInput {
    "Type of deduction being claimed"
    deductionType: DeductionType
    "Amount of the deduction"
    amount: Float
  }

  """
  Input type for real estate property information
  """
  input RealEstateInput {
    "Property number (fasteignanúmer)"
    number: String
    "Physical address of the property"
    address: String
    "Official property appraisal amount"
    appraisalAmount: Float
  }

  """
  Input type for vehicle information
  """
  input VehicleInput {
    "Vehicle registration number"
    registrationNumber: String
    "Year the vehicle was purchased"
    yearOfPurchase: Int
    "Original purchase price of the vehicle"
    purchasePrice: Float
  }

  """
  Input type for mortgage loan information
  """
  input MortgageInput {
    "Property number (fasteignanúmer) associated with the mortgage"
    realEstateNumber: String
    "National ID (kennitala) of the lending institution"
    lenderNationalId: String
    "Name of the lending institution"
    lenderName: String
    "Loan identification number"
    loanNumber: String
    "Date when the loan was initiated (YYYY-MM-DD)"
    loanStartDate: String
    "Original loan amount"
    loanAmount: Float
    "Total term of the loan in years"
    loanTermYears: Int
    "Total payments made during the tax year"
    totalAnnualPayments: Float
    "Principal payments made during the tax year"
    principalPayments: Float
    "Interest payments made during the tax year"
    interestPayments: Float
    "Remaining balance of the loan"
    remainingBalance: Float
  }

  """
  Input type for updating tax return information
  """
  input TaxReturnUpdateInput {
    "List of uploaded attachments"
    attachments: [AttachmentInput!]
    "Current residential address"
    address: String
    "Contact email address"
    email: String
    "Contact phone number"
    phoneNumber: String
    "Indicates if the individual has accident insurance"
    hasAccidentInsurance: Boolean
    "Bank account number for tax refunds"
    bankAccount: String
    "List of salaries received during the tax year"
    salaries: [SalaryInput!]
    "List of benefits received during the tax year"
    benefits: [BenefitInput!]
    "List of tax deductions being claimed"
    deductions: [DeductionInput!]
    "List of real estate properties owned"
    realEstates: [RealEstateInput!]
    "List of vehicles owned"
    vehicles: [VehicleInput!]
    "List of mortgages and housing loans"
    mortgages: [MortgageInput!]
  }

  """
  Type representing salary information from an employer
  """
  type Salary {
    "National ID (kennitala) of the employer"
    employerNationalId: String
    "Name of the employer"
    employerName: String
    "Total salary amount for the tax year"
    amount: Float
  }

  """
  Type representing benefits received from employers or other entities
  """
  type Benefit {
    "Type of benefit received"
    benefitType: BenefitType
    "National ID (kennitala) of the benefit payer"
    payerNationalId: String
    "Name of the benefit payer"
    payerName: String
    "Total benefit amount for the tax year"
    amount: Float
  }

  """
  Type representing tax deductions
  """
  type Deduction {
    "Type of deduction being claimed"
    deductionType: DeductionType
    "Amount of the deduction"
    amount: Float
  }

  """
  Type representing real estate property information
  """
  type RealEstate {
    "Property number (fasteignanúmer)"
    number: String
    "Physical address of the property"
    address: String
    "Official property appraisal amount"
    appraisalAmount: Float
  }

  """
  Type representing vehicle information
  """
  type Vehicle {
    "Vehicle registration number"
    registrationNumber: String
    "Year the vehicle was purchased"
    yearOfPurchase: Int
    "Original purchase price of the vehicle"
    purchasePrice: Float
  }

  """
  Type representing mortgage loan information
  """
  type Mortgage {
    "Property number (fasteignanúmer) associated with the mortgage"
    realEstateNumber: String
    "National ID (kennitala) of the lending institution"
    lenderNationalId: String
    "Name of the lending institution"
    lenderName: String
    "Loan identification number"
    loanNumber: String
    "Date when the loan was initiated (YYYY-MM-DD)"
    loanStartDate: String
    "Original loan amount"
    loanAmount: Float
    "Total term of the loan in years"
    loanTermYears: Int
    "Total payments made during the tax year"
    totalAnnualPayments: Float
    "Principal payments made during the tax year"
    principalPayments: Float
    "Interest payments made during the tax year"
    interestPayments: Float
    "Remaining balance of the loan"
    remainingBalance: Float
  }

  """
  Type representing an uploaded attachment file
  """
  type Attachment {
    "Name of the uploaded file"
    name: String
    "Size of the file in bytes"
    size: Float
    "Type/format of the file (e.g. 'application/pdf')"
    fileType: String
  }

  """
  Input type for attachment file information
  """
  input AttachmentInput {
    "Name of the uploaded file"
    name: String
    "Size of the file in bytes"
    size: Float
    "Type/format of the file (e.g. 'application/pdf')"
    fileType: String
  }

  """
  Type representing other debts and loans not tied to real estate
  """
  type OtherDebt {
    "National ID (kennitala) of the lending institution"
    lenderNationalId: String
    "Name of the lending institution"
    lenderName: String
    "Interest payments made during the tax year"
    interestPayments: Float
    "Remaining balance of the loan"
    remainingBalance: Float
  }

  """
  Type representing a complete tax return for an individual
  """
  type TaxReturn {
    "List of uploaded attachments"
    attachments: [Attachment!]
    "National ID (kennitala) of the tax payer"
    nationalId: String!
    "Full name of the tax payer"
    name: String
    "Current residential address"
    address: String
    "Contact email address"
    email: String
    "Contact phone number"
    phoneNumber: String
    "Indicates if the individual has accident insurance"
    hasAccidentInsurance: Boolean
    "Bank account number for tax refunds"
    bankAccount: String
    "List of salaries received during the tax year"
    salaries: [Salary!]
    "List of benefits received during the tax year"
    benefits: [Benefit!]
    "List of tax deductions being claimed"
    deductions: [Deduction!]
    "List of real estate properties owned"
    realEstates: [RealEstate!]
    "List of vehicles owned"
    vehicles: [Vehicle!]
    "List of mortgages and housing loans"
    mortgages: [Mortgage!]
    "List of other debts not tied to real estate"
    otherDebts: [OtherDebt!]
  }

  """
  Type representing basic information from the National Registry
  """
  type NationalRegistry {
    "National ID (kennitala) of the individual"
    nationalId: String!
    "Full name of the individual"
    name: String
    "Contact phone number"
    phoneNumber: String
  }

  type Query {
    """
    Retrieve a tax return by national ID
    """
    taxReturn(nationalId: String!): TaxReturn

    """
    Look up an individual in the National Registry by phone number
    """
    individual(phoneNumber: String!): NationalRegistry

    """
    Get pre-filled tax return data for an individual
    """
    taxReturnPrefill(nationalId: String!): TaxReturn

    """
    Retrieve the submitted version of a tax return
    """
    submittedTaxReturn(nationalId: String!): TaxReturn
  }

  type Mutation {
    """
    Test mutation that returns a greeting
    """
    sayHi(name: String!): String

    """
    Create a new tax return for an individual
    """
    createTaxReturn(
      "National ID (kennitala) of the tax payer"
      nationalId: String!
    ): TaxReturn

    """
    Update an existing tax return with new information
    """
    updateTaxReturn(
      "National ID (kennitala) of the tax payer"
      nationalId: String!
      "Updated tax return information"
      input: TaxReturnUpdateInput!
    ): TaxReturn
  }
`
