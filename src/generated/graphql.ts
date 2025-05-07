import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

/** Type representing an uploaded attachment file */
export type Attachment = {
  __typename?: 'Attachment';
  /** Type/format of the file (e.g. 'application/pdf') */
  fileType?: Maybe<Scalars['String']['output']>;
  /** Name of the uploaded file */
  name?: Maybe<Scalars['String']['output']>;
  /** Size of the file in bytes */
  size?: Maybe<Scalars['Float']['output']>;
};

/** Input type for attachment file information */
export type AttachmentInput = {
  /** Type/format of the file (e.g. 'application/pdf') */
  fileType?: InputMaybe<Scalars['String']['input']>;
  /** Name of the uploaded file */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Size of the file in bytes */
  size?: InputMaybe<Scalars['Float']['input']>;
};

/** Type representing benefits received from employers or other entities */
export type Benefit = {
  __typename?: 'Benefit';
  /** Total benefit amount for the tax year */
  amount?: Maybe<Scalars['Float']['output']>;
  /** Type of benefit received */
  benefitType?: Maybe<BenefitType>;
  /** Name of the benefit payer */
  payerName?: Maybe<Scalars['String']['output']>;
  /** National ID (kennitala) of the benefit payer */
  payerNationalId?: Maybe<Scalars['String']['output']>;
};

/** Input type for benefits received from employers or other entities */
export type BenefitInput = {
  /** Total benefit amount for the tax year */
  amount?: InputMaybe<Scalars['Float']['input']>;
  /** Type of benefit received */
  benefitType?: InputMaybe<BenefitType>;
  /** Name of the benefit payer */
  payerName?: InputMaybe<Scalars['String']['input']>;
  /** National ID (kennitala) of the benefit payer */
  payerNationalId?: InputMaybe<Scalars['String']['input']>;
};

/** Types of benefits received from employers or other entities */
export enum BenefitType {
  /** Car allowance payments */
  CAR_ALLOWANCE = 'CAR_ALLOWANCE',
  /** Daily allowance payments */
  DAILY_ALLOWANCE = 'DAILY_ALLOWANCE',
  /** Driving allowance payments */
  DRIVING_ALLOWANCE = 'DRIVING_ALLOWANCE',
  /** Housing allowance payments */
  HOUSING_ALLOWANCE = 'HOUSING_ALLOWANCE',
  /** Other miscellaneous benefits */
  OTHER_ALLOWANCE = 'OTHER_ALLOWANCE',
  /** Research or scientific allowance */
  RESEARCH_ALLOWANCE = 'RESEARCH_ALLOWANCE',
  /** Sport and wellness allowance */
  SPORT_ALLOWANCE = 'SPORT_ALLOWANCE',
  /** Educational and study-related allowance */
  STUDY_ALLOWANCE = 'STUDY_ALLOWANCE',
  /** Transport allowance payments */
  TRANSPORT_ALLOWANCE = 'TRANSPORT_ALLOWANCE'
}

/** Type representing tax deductions */
export type Deduction = {
  __typename?: 'Deduction';
  /** Amount of the deduction */
  amount?: Maybe<Scalars['Float']['output']>;
  /** Type of deduction being claimed */
  deductionType?: Maybe<DeductionType>;
};

/** Input type for tax deductions */
export type DeductionInput = {
  /** Amount of the deduction */
  amount?: InputMaybe<Scalars['Float']['input']>;
  /** Type of deduction being claimed */
  deductionType?: InputMaybe<DeductionType>;
};

/** Types of deductions that can be claimed on a tax return */
export enum DeductionType {
  /**
   * Deduction for charity contributions
   * (Frádráttur vegna framlaga til almannaheillafélaga)
   */
  CHARITY_DEDUCTION = 'CHARITY_DEDUCTION',
  /**
   * Deduction for daily allowances
   * (Frádráttur á móti dagpeningum)
   */
  DAILY_ALLOWANCE_DEDUCTION = 'DAILY_ALLOWANCE_DEDUCTION',
  /**
   * Deduction for driving allowances
   * (Frádráttur á móti ökutækjastyrk)
   */
  DRIVING_ALLOWANCE_DEDUCTION = 'DRIVING_ALLOWANCE_DEDUCTION',
  /**
   * Other miscellaneous deductions
   * (Aðrir ýmsir frádrættir)
   */
  OTHER = 'OTHER',
  /**
   * Deduction for pension fund contributions
   * (Frádráttur á móti iðgjaldi í lífeyrissjóð)
   */
  PENSION_FUND_DEDUCTION = 'PENSION_FUND_DEDUCTION',
  /**
   * Deduction for private pension fund contributions
   * (Frádráttur á móti iðgjaldi í séreignarsjóð)
   */
  PRIVATE_PENSION_FUND_DEDUCTION = 'PRIVATE_PENSION_FUND_DEDUCTION',
  /**
   * Deduction for sport and wellness allowances
   * (Frádráttur á móti íþróttastyrk)
   */
  SPORT_ALLOWANCE_DEDUCTION = 'SPORT_ALLOWANCE_DEDUCTION',
  /**
   * Deduction for transport allowances
   * (Frádráttur á móti samgöngustyrk)
   */
  TRANSPORT_ALLOWANCE_DEDUCTION = 'TRANSPORT_ALLOWANCE_DEDUCTION'
}

/** Type representing mortgage loan information */
export type Mortgage = {
  __typename?: 'Mortgage';
  /** Interest payments made during the tax year */
  interestPayments?: Maybe<Scalars['Float']['output']>;
  /** Name of the lending institution */
  lenderName?: Maybe<Scalars['String']['output']>;
  /** National ID (kennitala) of the lending institution */
  lenderNationalId?: Maybe<Scalars['String']['output']>;
  /** Original loan amount */
  loanAmount?: Maybe<Scalars['Float']['output']>;
  /** Loan identification number */
  loanNumber?: Maybe<Scalars['String']['output']>;
  /** Date when the loan was initiated (YYYY-MM-DD) */
  loanStartDate?: Maybe<Scalars['String']['output']>;
  /** Total term of the loan in years */
  loanTermYears?: Maybe<Scalars['Int']['output']>;
  /** Principal payments made during the tax year */
  principalPayments?: Maybe<Scalars['Float']['output']>;
  /** Property number (fasteignanúmer) associated with the mortgage */
  realEstateNumber?: Maybe<Scalars['String']['output']>;
  /** Remaining balance of the loan */
  remainingBalance?: Maybe<Scalars['Float']['output']>;
  /** Total payments made during the tax year */
  totalAnnualPayments?: Maybe<Scalars['Float']['output']>;
};

/** Input type for mortgage loan information */
export type MortgageInput = {
  /** Interest payments made during the tax year */
  interestPayments?: InputMaybe<Scalars['Float']['input']>;
  /** Name of the lending institution */
  lenderName?: InputMaybe<Scalars['String']['input']>;
  /** National ID (kennitala) of the lending institution */
  lenderNationalId?: InputMaybe<Scalars['String']['input']>;
  /** Original loan amount */
  loanAmount?: InputMaybe<Scalars['Float']['input']>;
  /** Loan identification number */
  loanNumber?: InputMaybe<Scalars['String']['input']>;
  /** Date when the loan was initiated (YYYY-MM-DD) */
  loanStartDate?: InputMaybe<Scalars['String']['input']>;
  /** Total term of the loan in years */
  loanTermYears?: InputMaybe<Scalars['Int']['input']>;
  /** Principal payments made during the tax year */
  principalPayments?: InputMaybe<Scalars['Float']['input']>;
  /** Property number (fasteignanúmer) associated with the mortgage */
  realEstateNumber?: InputMaybe<Scalars['String']['input']>;
  /** Remaining balance of the loan */
  remainingBalance?: InputMaybe<Scalars['Float']['input']>;
  /** Total payments made during the tax year */
  totalAnnualPayments?: InputMaybe<Scalars['Float']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new tax return for an individual */
  createTaxReturn?: Maybe<TaxReturn>;
  /** Test mutation that returns a greeting */
  sayHi?: Maybe<Scalars['String']['output']>;
  /** Update an existing tax return with new information */
  submitTaxReturn?: Maybe<TaxReturn>;
  /** Update an existing tax return with new information */
  updateTaxReturn?: Maybe<TaxReturn>;
};


export type MutationCreateTaxReturnArgs = {
  nationalId: Scalars['String']['input'];
};


export type MutationSayHiArgs = {
  name: Scalars['String']['input'];
};


export type MutationSubmitTaxReturnArgs = {
  nationalId: Scalars['String']['input'];
};


export type MutationUpdateTaxReturnArgs = {
  input: TaxReturnUpdateInput;
  nationalId: Scalars['String']['input'];
};

/** Type representing basic information from the National Registry */
export type NationalRegistry = {
  __typename?: 'NationalRegistry';
  /** Full name of the individual */
  name?: Maybe<Scalars['String']['output']>;
  /** National ID (kennitala) of the individual */
  nationalId: Scalars['String']['output'];
  /** Contact phone number */
  phoneNumber?: Maybe<Scalars['String']['output']>;
};

/** Type representing other debts and loans not tied to real estate */
export type OtherDebt = {
  __typename?: 'OtherDebt';
  /** Interest payments made during the tax year */
  interestPayments?: Maybe<Scalars['Float']['output']>;
  /** Name of the lending institution */
  lenderName?: Maybe<Scalars['String']['output']>;
  /** National ID (kennitala) of the lending institution */
  lenderNationalId?: Maybe<Scalars['String']['output']>;
  /** Remaining balance of the loan */
  remainingBalance?: Maybe<Scalars['Float']['output']>;
};

/** Types of other income that may be tax-exempt */
export enum OtherIncomeType {
  FOREIGN_INCOME = 'FOREIGN_INCOME',
  OTHER_TAX_EXEMPT_INCOME = 'OTHER_TAX_EXEMPT_INCOME',
  TAX_EXEMPT_DISPOSAL_FROM_PRIVATE_PENSION_FUND = 'TAX_EXEMPT_DISPOSAL_FROM_PRIVATE_PENSION_FUND',
  TAX_EXEMPT_LOTTERY_PRIZES = 'TAX_EXEMPT_LOTTERY_PRIZES',
  TAX_EXEMPT_SOCIAL_SECURITY = 'TAX_EXEMPT_SOCIAL_SECURITY',
  TAX_EXEMPT_WITHDRAWAL_FROM_PRIVATE_PENSION_FUND = 'TAX_EXEMPT_WITHDRAWAL_FROM_PRIVATE_PENSION_FUND'
}

/** Types of pension and social security benefits */
export enum PensionType {
  MUNICIPAL_FINANCIAL_AID = 'MUNICIPAL_FINANCIAL_AID',
  PENSION_FUND = 'PENSION_FUND',
  PRIVATE_PENSION_FUND = 'PRIVATE_PENSION_FUND',
  SOCIAL_SECURITY = 'SOCIAL_SECURITY',
  UNEMPLOYMENT_BENEFITS = 'UNEMPLOYMENT_BENEFITS'
}

export type Query = {
  __typename?: 'Query';
  /** Look up an individual in the National Registry by phone number */
  individual?: Maybe<NationalRegistry>;
  /** Retrieve the submitted version of a tax return */
  submittedTaxReturn?: Maybe<TaxReturn>;
  /** Retrieve a tax return by national ID */
  taxReturn?: Maybe<TaxReturn>;
  /** Get pre-filled tax return data for an individual */
  taxReturnPrefill?: Maybe<TaxReturn>;
};


export type QueryIndividualArgs = {
  phoneNumber: Scalars['String']['input'];
};


export type QuerySubmittedTaxReturnArgs = {
  nationalId: Scalars['String']['input'];
};


export type QueryTaxReturnArgs = {
  nationalId: Scalars['String']['input'];
};


export type QueryTaxReturnPrefillArgs = {
  nationalId: Scalars['String']['input'];
};

/** Type representing real estate property information */
export type RealEstate = {
  __typename?: 'RealEstate';
  /** Physical address of the property */
  address?: Maybe<Scalars['String']['output']>;
  /** Official property appraisal amount */
  appraisalAmount?: Maybe<Scalars['Float']['output']>;
  /** Property number (fasteignanúmer) */
  number?: Maybe<Scalars['String']['output']>;
  /** Year the property was purchased */
  yearOfPurchase?: Maybe<Scalars['Int']['output']>;
};

/** Input type for real estate property information */
export type RealEstateInput = {
  /** Physical address of the property */
  address?: InputMaybe<Scalars['String']['input']>;
  /** Official property appraisal amount */
  appraisalAmount?: InputMaybe<Scalars['Float']['input']>;
  /** Property number (fasteignanúmer) */
  number?: InputMaybe<Scalars['String']['input']>;
  /** Year the property was purchased */
  yearOfPurchase?: InputMaybe<Scalars['Int']['input']>;
};

/** Type representing salary information from an employer */
export type Salary = {
  __typename?: 'Salary';
  /** Total salary amount for the tax year */
  amount?: Maybe<Scalars['Float']['output']>;
  /** Name of the employer */
  employerName?: Maybe<Scalars['String']['output']>;
  /** National ID (kennitala) of the employer */
  employerNationalId?: Maybe<Scalars['String']['output']>;
};

/** Input type for salary information from an employer */
export type SalaryInput = {
  /** Total salary amount for the tax year */
  amount?: InputMaybe<Scalars['Float']['input']>;
  /** Name of the employer */
  employerName?: InputMaybe<Scalars['String']['input']>;
  /** National ID (kennitala) of the employer */
  employerNationalId?: InputMaybe<Scalars['String']['input']>;
};

/** Type representing a complete tax return for an individual */
export type TaxReturn = {
  __typename?: 'TaxReturn';
  /** Current residential address */
  address?: Maybe<Scalars['String']['output']>;
  /** List of uploaded attachments */
  attachments?: Maybe<Array<Attachment>>;
  /** Bank account number for tax refunds */
  bankAccount?: Maybe<Scalars['String']['output']>;
  /** List of benefits received during the tax year */
  benefits?: Maybe<Array<Benefit>>;
  /** List of tax deductions being claimed */
  deductions?: Maybe<Array<Deduction>>;
  /** Contact email address */
  email?: Maybe<Scalars['String']['output']>;
  /** Indicates if the individual has accident insurance */
  hasAccidentInsurance?: Maybe<Scalars['Boolean']['output']>;
  /** List of mortgages and housing loans */
  mortgages?: Maybe<Array<Mortgage>>;
  /** Full name of the tax payer */
  name?: Maybe<Scalars['String']['output']>;
  /** National ID (kennitala) of the tax payer */
  nationalId: Scalars['String']['output'];
  /** List of other debts not tied to real estate */
  otherDebts?: Maybe<Array<OtherDebt>>;
  /** Contact phone number */
  phoneNumber?: Maybe<Scalars['String']['output']>;
  /** List of real estate properties owned */
  realEstates?: Maybe<Array<RealEstate>>;
  /** List of salaries received during the tax year */
  salaries?: Maybe<Array<Salary>>;
  /** List of vehicles owned */
  vehicles?: Maybe<Array<Vehicle>>;
};

/** Input type for updating tax return information */
export type TaxReturnUpdateInput = {
  /** Current residential address */
  address?: InputMaybe<Scalars['String']['input']>;
  /** List of uploaded attachments */
  attachments?: InputMaybe<Array<AttachmentInput>>;
  /** Bank account number for tax refunds */
  bankAccount?: InputMaybe<Scalars['String']['input']>;
  /** List of benefits received during the tax year */
  benefits?: InputMaybe<Array<BenefitInput>>;
  /** List of tax deductions being claimed */
  deductions?: InputMaybe<Array<DeductionInput>>;
  /** Contact email address */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Indicates if the individual has accident insurance */
  hasAccidentInsurance?: InputMaybe<Scalars['Boolean']['input']>;
  /** List of mortgages and housing loans */
  mortgages?: InputMaybe<Array<MortgageInput>>;
  /** Contact phone number */
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  /** List of real estate properties owned */
  realEstates?: InputMaybe<Array<RealEstateInput>>;
  /** List of salaries received during the tax year */
  salaries?: InputMaybe<Array<SalaryInput>>;
  /** List of vehicles owned */
  vehicles?: InputMaybe<Array<VehicleInput>>;
};

/** Type representing vehicle information */
export type Vehicle = {
  __typename?: 'Vehicle';
  /** Original purchase price of the vehicle */
  appraisalAmount?: Maybe<Scalars['Float']['output']>;
  /** Vehicle registration number */
  registrationNumber?: Maybe<Scalars['String']['output']>;
  /** Year the vehicle was purchased */
  yearOfPurchase?: Maybe<Scalars['Int']['output']>;
};

/** Input type for vehicle information */
export type VehicleInput = {
  /** Original purchase price of the vehicle */
  appraisalAmount?: InputMaybe<Scalars['Float']['input']>;
  /** Vehicle registration number */
  registrationNumber?: InputMaybe<Scalars['String']['input']>;
  /** Year the vehicle was purchased */
  yearOfPurchase?: InputMaybe<Scalars['Int']['input']>;
};

export type SayHiMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type SayHiMutation = { __typename?: 'Mutation', sayHi?: string | null };

export type CreateTaxReturnMutationVariables = Exact<{
  nationalId: Scalars['String']['input'];
}>;


export type CreateTaxReturnMutation = { __typename?: 'Mutation', createTaxReturn?: { __typename?: 'TaxReturn', nationalId: string, name?: string | null, address?: string | null, email?: string | null, phoneNumber?: string | null, hasAccidentInsurance?: boolean | null, bankAccount?: string | null, salaries?: Array<{ __typename?: 'Salary', employerName?: string | null, employerNationalId?: string | null, amount?: number | null }> | null, benefits?: Array<{ __typename?: 'Benefit', benefitType?: BenefitType | null, payerNationalId?: string | null, payerName?: string | null, amount?: number | null }> | null, deductions?: Array<{ __typename?: 'Deduction', deductionType?: DeductionType | null, amount?: number | null }> | null, realEstates?: Array<{ __typename?: 'RealEstate', number?: string | null, address?: string | null, appraisalAmount?: number | null, yearOfPurchase?: number | null }> | null, vehicles?: Array<{ __typename?: 'Vehicle', registrationNumber?: string | null, yearOfPurchase?: number | null, appraisalAmount?: number | null }> | null, mortgages?: Array<{ __typename?: 'Mortgage', realEstateNumber?: string | null, lenderNationalId?: string | null, lenderName?: string | null, loanNumber?: string | null, loanStartDate?: string | null, loanAmount?: number | null, loanTermYears?: number | null, totalAnnualPayments?: number | null, principalPayments?: number | null, interestPayments?: number | null, remainingBalance?: number | null }> | null, otherDebts?: Array<{ __typename?: 'OtherDebt', lenderNationalId?: string | null, lenderName?: string | null, interestPayments?: number | null, remainingBalance?: number | null }> | null } | null };

export type NationalRegisterQueryVariables = Exact<{
  phoneNumber: Scalars['String']['input'];
}>;


export type NationalRegisterQuery = { __typename?: 'Query', individual?: { __typename?: 'NationalRegistry', nationalId: string, name?: string | null, phoneNumber?: string | null } | null };

export type SubmitTaxReturnMutationVariables = Exact<{
  nationalId: Scalars['String']['input'];
}>;


export type SubmitTaxReturnMutation = { __typename?: 'Mutation', submitTaxReturn?: { __typename?: 'TaxReturn', nationalId: string } | null };

export type TaxReturnQueryVariables = Exact<{
  nationalId: Scalars['String']['input'];
}>;


export type TaxReturnQuery = { __typename?: 'Query', taxReturn?: { __typename?: 'TaxReturn', nationalId: string, name?: string | null, address?: string | null, email?: string | null, phoneNumber?: string | null, hasAccidentInsurance?: boolean | null, bankAccount?: string | null, salaries?: Array<{ __typename?: 'Salary', employerName?: string | null, employerNationalId?: string | null, amount?: number | null }> | null, benefits?: Array<{ __typename?: 'Benefit', payerNationalId?: string | null, payerName?: string | null, amount?: number | null, benefitType?: BenefitType | null }> | null, deductions?: Array<{ __typename?: 'Deduction', deductionType?: DeductionType | null, amount?: number | null }> | null, realEstates?: Array<{ __typename?: 'RealEstate', number?: string | null, address?: string | null, appraisalAmount?: number | null, yearOfPurchase?: number | null }> | null, vehicles?: Array<{ __typename?: 'Vehicle', registrationNumber?: string | null, yearOfPurchase?: number | null, appraisalAmount?: number | null }> | null, mortgages?: Array<{ __typename?: 'Mortgage', realEstateNumber?: string | null, lenderNationalId?: string | null, lenderName?: string | null, loanNumber?: string | null, loanStartDate?: string | null, loanAmount?: number | null, loanTermYears?: number | null, totalAnnualPayments?: number | null, principalPayments?: number | null, interestPayments?: number | null, remainingBalance?: number | null }> | null, otherDebts?: Array<{ __typename?: 'OtherDebt', lenderNationalId?: string | null, lenderName?: string | null, interestPayments?: number | null, remainingBalance?: number | null }> | null, attachments?: Array<{ __typename?: 'Attachment', name?: string | null, size?: number | null, fileType?: string | null }> | null } | null };

export type UpdateTaxReturnMutationVariables = Exact<{
  nationalId: Scalars['String']['input'];
  input: TaxReturnUpdateInput;
}>;


export type UpdateTaxReturnMutation = { __typename?: 'Mutation', updateTaxReturn?: { __typename?: 'TaxReturn', nationalId: string, name?: string | null, address?: string | null, email?: string | null, phoneNumber?: string | null, hasAccidentInsurance?: boolean | null, bankAccount?: string | null, salaries?: Array<{ __typename?: 'Salary', employerName?: string | null, employerNationalId?: string | null, amount?: number | null }> | null, benefits?: Array<{ __typename?: 'Benefit', payerNationalId?: string | null, payerName?: string | null, amount?: number | null, benefitType?: BenefitType | null }> | null, deductions?: Array<{ __typename?: 'Deduction', deductionType?: DeductionType | null, amount?: number | null }> | null, realEstates?: Array<{ __typename?: 'RealEstate', number?: string | null, address?: string | null, appraisalAmount?: number | null, yearOfPurchase?: number | null }> | null, vehicles?: Array<{ __typename?: 'Vehicle', registrationNumber?: string | null, yearOfPurchase?: number | null, appraisalAmount?: number | null }> | null, mortgages?: Array<{ __typename?: 'Mortgage', realEstateNumber?: string | null, lenderNationalId?: string | null, lenderName?: string | null, loanNumber?: string | null, loanStartDate?: string | null, loanAmount?: number | null, loanTermYears?: number | null, totalAnnualPayments?: number | null, principalPayments?: number | null, interestPayments?: number | null, remainingBalance?: number | null }> | null, otherDebts?: Array<{ __typename?: 'OtherDebt', lenderNationalId?: string | null, lenderName?: string | null, interestPayments?: number | null, remainingBalance?: number | null }> | null, attachments?: Array<{ __typename?: 'Attachment', name?: string | null, size?: number | null, fileType?: string | null }> | null } | null };


export const SayHiDocument = gql`
    mutation SayHi($name: String!) {
  sayHi(name: $name)
}
    `;
export type SayHiMutationFn = Apollo.MutationFunction<SayHiMutation, SayHiMutationVariables>;

/**
 * __useSayHiMutation__
 *
 * To run a mutation, you first call `useSayHiMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSayHiMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sayHiMutation, { data, loading, error }] = useSayHiMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSayHiMutation(baseOptions?: Apollo.MutationHookOptions<SayHiMutation, SayHiMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SayHiMutation, SayHiMutationVariables>(SayHiDocument, options);
      }
export type SayHiMutationHookResult = ReturnType<typeof useSayHiMutation>;
export type SayHiMutationResult = Apollo.MutationResult<SayHiMutation>;
export type SayHiMutationOptions = Apollo.BaseMutationOptions<SayHiMutation, SayHiMutationVariables>;
export const CreateTaxReturnDocument = gql`
    mutation CreateTaxReturn($nationalId: String!) {
  createTaxReturn(nationalId: $nationalId) {
    nationalId
    name
    address
    email
    phoneNumber
    hasAccidentInsurance
    bankAccount
    salaries {
      employerName
      employerNationalId
      amount
    }
    benefits {
      benefitType
      payerNationalId
      payerName
      amount
    }
    deductions {
      deductionType
      amount
    }
    realEstates {
      number
      address
      appraisalAmount
      yearOfPurchase
    }
    vehicles {
      registrationNumber
      yearOfPurchase
      appraisalAmount
    }
    mortgages {
      realEstateNumber
      lenderNationalId
      lenderName
      loanNumber
      loanStartDate
      loanAmount
      loanTermYears
      totalAnnualPayments
      principalPayments
      interestPayments
      remainingBalance
    }
    otherDebts {
      lenderNationalId
      lenderName
      interestPayments
      remainingBalance
    }
  }
}
    `;
export type CreateTaxReturnMutationFn = Apollo.MutationFunction<CreateTaxReturnMutation, CreateTaxReturnMutationVariables>;

/**
 * __useCreateTaxReturnMutation__
 *
 * To run a mutation, you first call `useCreateTaxReturnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaxReturnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaxReturnMutation, { data, loading, error }] = useCreateTaxReturnMutation({
 *   variables: {
 *      nationalId: // value for 'nationalId'
 *   },
 * });
 */
export function useCreateTaxReturnMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaxReturnMutation, CreateTaxReturnMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaxReturnMutation, CreateTaxReturnMutationVariables>(CreateTaxReturnDocument, options);
      }
export type CreateTaxReturnMutationHookResult = ReturnType<typeof useCreateTaxReturnMutation>;
export type CreateTaxReturnMutationResult = Apollo.MutationResult<CreateTaxReturnMutation>;
export type CreateTaxReturnMutationOptions = Apollo.BaseMutationOptions<CreateTaxReturnMutation, CreateTaxReturnMutationVariables>;
export const NationalRegisterDocument = gql`
    query NationalRegister($phoneNumber: String!) {
  individual(phoneNumber: $phoneNumber) {
    nationalId
    name
    phoneNumber
  }
}
    `;

/**
 * __useNationalRegisterQuery__
 *
 * To run a query within a React component, call `useNationalRegisterQuery` and pass it any options that fit your needs.
 * When your component renders, `useNationalRegisterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNationalRegisterQuery({
 *   variables: {
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useNationalRegisterQuery(baseOptions: Apollo.QueryHookOptions<NationalRegisterQuery, NationalRegisterQueryVariables> & ({ variables: NationalRegisterQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NationalRegisterQuery, NationalRegisterQueryVariables>(NationalRegisterDocument, options);
      }
export function useNationalRegisterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NationalRegisterQuery, NationalRegisterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NationalRegisterQuery, NationalRegisterQueryVariables>(NationalRegisterDocument, options);
        }
export function useNationalRegisterSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<NationalRegisterQuery, NationalRegisterQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NationalRegisterQuery, NationalRegisterQueryVariables>(NationalRegisterDocument, options);
        }
export type NationalRegisterQueryHookResult = ReturnType<typeof useNationalRegisterQuery>;
export type NationalRegisterLazyQueryHookResult = ReturnType<typeof useNationalRegisterLazyQuery>;
export type NationalRegisterSuspenseQueryHookResult = ReturnType<typeof useNationalRegisterSuspenseQuery>;
export type NationalRegisterQueryResult = Apollo.QueryResult<NationalRegisterQuery, NationalRegisterQueryVariables>;
export const SubmitTaxReturnDocument = gql`
    mutation SubmitTaxReturn($nationalId: String!) {
  submitTaxReturn(nationalId: $nationalId) {
    nationalId
  }
}
    `;
export type SubmitTaxReturnMutationFn = Apollo.MutationFunction<SubmitTaxReturnMutation, SubmitTaxReturnMutationVariables>;

/**
 * __useSubmitTaxReturnMutation__
 *
 * To run a mutation, you first call `useSubmitTaxReturnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitTaxReturnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitTaxReturnMutation, { data, loading, error }] = useSubmitTaxReturnMutation({
 *   variables: {
 *      nationalId: // value for 'nationalId'
 *   },
 * });
 */
export function useSubmitTaxReturnMutation(baseOptions?: Apollo.MutationHookOptions<SubmitTaxReturnMutation, SubmitTaxReturnMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitTaxReturnMutation, SubmitTaxReturnMutationVariables>(SubmitTaxReturnDocument, options);
      }
export type SubmitTaxReturnMutationHookResult = ReturnType<typeof useSubmitTaxReturnMutation>;
export type SubmitTaxReturnMutationResult = Apollo.MutationResult<SubmitTaxReturnMutation>;
export type SubmitTaxReturnMutationOptions = Apollo.BaseMutationOptions<SubmitTaxReturnMutation, SubmitTaxReturnMutationVariables>;
export const TaxReturnDocument = gql`
    query TaxReturn($nationalId: String!) {
  taxReturn(nationalId: $nationalId) {
    nationalId
    name
    address
    email
    phoneNumber
    hasAccidentInsurance
    bankAccount
    salaries {
      employerName
      employerNationalId
      amount
    }
    benefits {
      payerNationalId
      payerName
      amount
      benefitType
    }
    deductions {
      deductionType
      amount
    }
    realEstates {
      number
      address
      appraisalAmount
      yearOfPurchase
    }
    vehicles {
      registrationNumber
      yearOfPurchase
      appraisalAmount
    }
    mortgages {
      realEstateNumber
      lenderNationalId
      lenderName
      loanNumber
      loanStartDate
      loanAmount
      loanTermYears
      totalAnnualPayments
      principalPayments
      interestPayments
      remainingBalance
    }
    otherDebts {
      lenderNationalId
      lenderName
      interestPayments
      remainingBalance
    }
    attachments {
      name
      size
      fileType
    }
  }
}
    `;

/**
 * __useTaxReturnQuery__
 *
 * To run a query within a React component, call `useTaxReturnQuery` and pass it any options that fit your needs.
 * When your component renders, `useTaxReturnQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTaxReturnQuery({
 *   variables: {
 *      nationalId: // value for 'nationalId'
 *   },
 * });
 */
export function useTaxReturnQuery(baseOptions: Apollo.QueryHookOptions<TaxReturnQuery, TaxReturnQueryVariables> & ({ variables: TaxReturnQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TaxReturnQuery, TaxReturnQueryVariables>(TaxReturnDocument, options);
      }
export function useTaxReturnLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TaxReturnQuery, TaxReturnQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TaxReturnQuery, TaxReturnQueryVariables>(TaxReturnDocument, options);
        }
export function useTaxReturnSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TaxReturnQuery, TaxReturnQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TaxReturnQuery, TaxReturnQueryVariables>(TaxReturnDocument, options);
        }
export type TaxReturnQueryHookResult = ReturnType<typeof useTaxReturnQuery>;
export type TaxReturnLazyQueryHookResult = ReturnType<typeof useTaxReturnLazyQuery>;
export type TaxReturnSuspenseQueryHookResult = ReturnType<typeof useTaxReturnSuspenseQuery>;
export type TaxReturnQueryResult = Apollo.QueryResult<TaxReturnQuery, TaxReturnQueryVariables>;
export const UpdateTaxReturnDocument = gql`
    mutation UpdateTaxReturn($nationalId: String!, $input: TaxReturnUpdateInput!) {
  updateTaxReturn(nationalId: $nationalId, input: $input) {
    nationalId
    name
    address
    email
    phoneNumber
    hasAccidentInsurance
    bankAccount
    salaries {
      employerName
      employerNationalId
      amount
    }
    benefits {
      payerNationalId
      payerName
      amount
      benefitType
    }
    deductions {
      deductionType
      amount
    }
    realEstates {
      number
      address
      appraisalAmount
      yearOfPurchase
    }
    vehicles {
      registrationNumber
      yearOfPurchase
      appraisalAmount
    }
    mortgages {
      realEstateNumber
      lenderNationalId
      lenderName
      loanNumber
      loanStartDate
      loanAmount
      loanTermYears
      totalAnnualPayments
      principalPayments
      interestPayments
      remainingBalance
    }
    otherDebts {
      lenderNationalId
      lenderName
      interestPayments
      remainingBalance
    }
    attachments {
      name
      size
      fileType
    }
  }
}
    `;
export type UpdateTaxReturnMutationFn = Apollo.MutationFunction<UpdateTaxReturnMutation, UpdateTaxReturnMutationVariables>;

/**
 * __useUpdateTaxReturnMutation__
 *
 * To run a mutation, you first call `useUpdateTaxReturnMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaxReturnMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaxReturnMutation, { data, loading, error }] = useUpdateTaxReturnMutation({
 *   variables: {
 *      nationalId: // value for 'nationalId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTaxReturnMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaxReturnMutation, UpdateTaxReturnMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaxReturnMutation, UpdateTaxReturnMutationVariables>(UpdateTaxReturnDocument, options);
      }
export type UpdateTaxReturnMutationHookResult = ReturnType<typeof useUpdateTaxReturnMutation>;
export type UpdateTaxReturnMutationResult = Apollo.MutationResult<UpdateTaxReturnMutation>;
export type UpdateTaxReturnMutationOptions = Apollo.BaseMutationOptions<UpdateTaxReturnMutation, UpdateTaxReturnMutationVariables>;