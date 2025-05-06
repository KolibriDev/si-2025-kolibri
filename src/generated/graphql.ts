import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type Benefit = {
  __typename?: 'Benefit'
  amount?: Maybe<Scalars['Float']['output']>
  payerName?: Maybe<Scalars['String']['output']>
  payerNationalId?: Maybe<Scalars['String']['output']>
}

export type BenefitInput = {
  amount?: InputMaybe<Scalars['Float']['input']>
  payerName?: InputMaybe<Scalars['String']['input']>
  payerNationalId?: InputMaybe<Scalars['String']['input']>
}

export type Deduction = {
  __typename?: 'Deduction'
  amount?: Maybe<Scalars['Float']['output']>
  deductionType?: Maybe<DeductionType>
}

export type DeductionInput = {
  amount?: InputMaybe<Scalars['Float']['input']>
  deductionType?: InputMaybe<DeductionType>
}

export enum DeductionType {
  Other = 'OTHER',
}

export type Mortgage = {
  __typename?: 'Mortgage'
  interestPayments?: Maybe<Scalars['Float']['output']>
  lenderName?: Maybe<Scalars['String']['output']>
  lenderNationalId?: Maybe<Scalars['String']['output']>
  loanAmount?: Maybe<Scalars['Float']['output']>
  loanNumber?: Maybe<Scalars['String']['output']>
  loanStartDate?: Maybe<Scalars['String']['output']>
  loanTermYears?: Maybe<Scalars['Int']['output']>
  principalPayments?: Maybe<Scalars['Float']['output']>
  realEstateNumber?: Maybe<Scalars['String']['output']>
  remainingBalance?: Maybe<Scalars['Float']['output']>
  totalAnnualPayments?: Maybe<Scalars['Float']['output']>
}

export type MortgageInput = {
  interestPayments?: InputMaybe<Scalars['Float']['input']>
  lenderName?: InputMaybe<Scalars['String']['input']>
  lenderNationalId?: InputMaybe<Scalars['String']['input']>
  loanAmount?: InputMaybe<Scalars['Float']['input']>
  loanNumber?: InputMaybe<Scalars['String']['input']>
  loanStartDate?: InputMaybe<Scalars['String']['input']>
  loanTermYears?: InputMaybe<Scalars['Int']['input']>
  principalPayments?: InputMaybe<Scalars['Float']['input']>
  realEstateNumber?: InputMaybe<Scalars['String']['input']>
  remainingBalance?: InputMaybe<Scalars['Float']['input']>
  totalAnnualPayments?: InputMaybe<Scalars['Float']['input']>
}

export type Mutation = {
  __typename?: 'Mutation'
  createTaxReturn?: Maybe<TaxReturn>
  sayHi?: Maybe<Scalars['String']['output']>
  updateTaxReturn?: Maybe<TaxReturn>
}

export type MutationCreateTaxReturnArgs = {
  nationalId: Scalars['String']['input']
}

export type MutationSayHiArgs = {
  name: Scalars['String']['input']
}

export type MutationUpdateTaxReturnArgs = {
  input: TaxReturnUpdateInput
  nationalId: Scalars['String']['input']
}

export type NationalRegistry = {
  __typename?: 'NationalRegistry'
  name?: Maybe<Scalars['String']['output']>
  nationalId: Scalars['String']['output']
  phoneNumber?: Maybe<Scalars['String']['output']>
}

export type Query = {
  __typename?: 'Query'
  individual?: Maybe<NationalRegistry>
  taxReturn?: Maybe<TaxReturn>
}

export type QueryIndividualArgs = {
  phoneNumber: Scalars['String']['input']
}

export type QueryTaxReturnArgs = {
  nationalId: Scalars['String']['input']
}

export type RealEstate = {
  __typename?: 'RealEstate'
  address?: Maybe<Scalars['String']['output']>
  appraisal?: Maybe<Scalars['Float']['output']>
  number?: Maybe<Scalars['String']['output']>
}

export type RealEstateInput = {
  address?: InputMaybe<Scalars['String']['input']>
  appraisal?: InputMaybe<Scalars['Float']['input']>
  number?: InputMaybe<Scalars['String']['input']>
}

export type Salary = {
  __typename?: 'Salary'
  amount?: Maybe<Scalars['Float']['output']>
  employerName?: Maybe<Scalars['String']['output']>
  employerNationalId?: Maybe<Scalars['String']['output']>
}

export type SalaryInput = {
  amount?: InputMaybe<Scalars['Float']['input']>
  employerName?: InputMaybe<Scalars['String']['input']>
  employerNationalId?: InputMaybe<Scalars['String']['input']>
}

export type TaxReturn = {
  __typename?: 'TaxReturn'
  address?: Maybe<Scalars['String']['output']>
  bankAccount?: Maybe<Scalars['String']['output']>
  benefits?: Maybe<Array<Benefit>>
  deductions?: Maybe<Array<Deduction>>
  email?: Maybe<Scalars['String']['output']>
  hasAccidentInsurance?: Maybe<Scalars['Boolean']['output']>
  mortgages?: Maybe<Array<Mortgage>>
  name?: Maybe<Scalars['String']['output']>
  nationalId: Scalars['String']['output']
  phoneNumber?: Maybe<Scalars['String']['output']>
  realEstates?: Maybe<Array<RealEstate>>
  salaries?: Maybe<Array<Salary>>
  vehicles?: Maybe<Array<Vehicle>>
}

export type TaxReturnUpdateInput = {
  address?: InputMaybe<Scalars['String']['input']>
  bankAccount?: InputMaybe<Scalars['String']['input']>
  benefits?: InputMaybe<Array<BenefitInput>>
  deductions?: InputMaybe<Array<DeductionInput>>
  email?: InputMaybe<Scalars['String']['input']>
  hasAccidentInsurance?: InputMaybe<Scalars['Boolean']['input']>
  mortgages?: InputMaybe<Array<MortgageInput>>
  phoneNumber?: InputMaybe<Scalars['String']['input']>
  realEstates?: InputMaybe<Array<RealEstateInput>>
  salaries?: InputMaybe<Array<SalaryInput>>
  vehicles?: InputMaybe<Array<VehicleInput>>
}

export type Vehicle = {
  __typename?: 'Vehicle'
  purchasePrice?: Maybe<Scalars['Float']['output']>
  registrationNumber?: Maybe<Scalars['String']['output']>
  yearOfPurchase?: Maybe<Scalars['Int']['output']>
}

export type VehicleInput = {
  purchasePrice?: InputMaybe<Scalars['Float']['input']>
  registrationNumber?: InputMaybe<Scalars['String']['input']>
  yearOfPurchase?: InputMaybe<Scalars['Int']['input']>
}

export type SayHiMutationVariables = Exact<{
  name: Scalars['String']['input']
}>

export type SayHiMutation = { __typename?: 'Mutation'; sayHi?: string | null }

export type CreateTaxReturnMutationVariables = Exact<{
  nationalId: Scalars['String']['input']
}>

export type CreateTaxReturnMutation = {
  __typename?: 'Mutation'
  createTaxReturn?: {
    __typename?: 'TaxReturn'
    nationalId: string
    name?: string | null
    email?: string | null
  } | null
}

export type NationalRegisterQueryVariables = Exact<{
  phoneNumber: Scalars['String']['input']
}>

export type NationalRegisterQuery = {
  __typename?: 'Query'
  individual?: {
    __typename?: 'NationalRegistry'
    nationalId: string
    name?: string | null
    phoneNumber?: string | null
  } | null
}

export type TaxReturnQueryVariables = Exact<{
  nationalId: Scalars['String']['input']
}>

export type TaxReturnQuery = {
  __typename?: 'Query'
  taxReturn?: {
    __typename?: 'TaxReturn'
    nationalId: string
    name?: string | null
    email?: string | null
    address?: string | null
    phoneNumber?: string | null
    hasAccidentInsurance?: boolean | null
    bankAccount?: string | null
    salaries?: Array<{
      __typename?: 'Salary'
      employerName?: string | null
      amount?: number | null
    }> | null
    benefits?: Array<{
      __typename?: 'Benefit'
      payerName?: string | null
      amount?: number | null
    }> | null
    deductions?: Array<{
      __typename?: 'Deduction'
      deductionType?: DeductionType | null
      amount?: number | null
    }> | null
    realEstates?: Array<{
      __typename?: 'RealEstate'
      number?: string | null
      address?: string | null
      appraisal?: number | null
    }> | null
    vehicles?: Array<{
      __typename?: 'Vehicle'
      registrationNumber?: string | null
      purchasePrice?: number | null
    }> | null
    mortgages?: Array<{
      __typename?: 'Mortgage'
      lenderName?: string | null
      loanAmount?: number | null
      remainingBalance?: number | null
    }> | null
  } | null
}

export type UpdateTaxReturnMutationVariables = Exact<{
  nationalId: Scalars['String']['input']
  input: TaxReturnUpdateInput
}>

export type UpdateTaxReturnMutation = {
  __typename?: 'Mutation'
  updateTaxReturn?: {
    __typename?: 'TaxReturn'
    nationalId: string
    email?: string | null
    address?: string | null
    phoneNumber?: string | null
    hasAccidentInsurance?: boolean | null
    bankAccount?: string | null
    vehicles?: Array<{
      __typename?: 'Vehicle'
      registrationNumber?: string | null
      yearOfPurchase?: number | null
      purchasePrice?: number | null
    }> | null
    salaries?: Array<{
      __typename?: 'Salary'
      employerName?: string | null
      amount?: number | null
    }> | null
    benefits?: Array<{
      __typename?: 'Benefit'
      payerName?: string | null
      amount?: number | null
    }> | null
    deductions?: Array<{
      __typename?: 'Deduction'
      deductionType?: DeductionType | null
      amount?: number | null
    }> | null
    realEstates?: Array<{
      __typename?: 'RealEstate'
      number?: string | null
      address?: string | null
      appraisal?: number | null
    }> | null
    mortgages?: Array<{
      __typename?: 'Mortgage'
      lenderName?: string | null
      loanAmount?: number | null
      remainingBalance?: number | null
    }> | null
  } | null
}

export const SayHiDocument = gql`
  mutation SayHi($name: String!) {
    sayHi(name: $name)
  }
`
export type SayHiMutationFn = Apollo.MutationFunction<
  SayHiMutation,
  SayHiMutationVariables
>

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
export function useSayHiMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SayHiMutation,
    SayHiMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SayHiMutation, SayHiMutationVariables>(
    SayHiDocument,
    options,
  )
}
export type SayHiMutationHookResult = ReturnType<typeof useSayHiMutation>
export type SayHiMutationResult = Apollo.MutationResult<SayHiMutation>
export type SayHiMutationOptions = Apollo.BaseMutationOptions<
  SayHiMutation,
  SayHiMutationVariables
>
export const CreateTaxReturnDocument = gql`
  mutation CreateTaxReturn($nationalId: String!) {
    createTaxReturn(nationalId: $nationalId) {
      nationalId
      name
      email
    }
  }
`
export type CreateTaxReturnMutationFn = Apollo.MutationFunction<
  CreateTaxReturnMutation,
  CreateTaxReturnMutationVariables
>

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
export function useCreateTaxReturnMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTaxReturnMutation,
    CreateTaxReturnMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateTaxReturnMutation,
    CreateTaxReturnMutationVariables
  >(CreateTaxReturnDocument, options)
}
export type CreateTaxReturnMutationHookResult = ReturnType<
  typeof useCreateTaxReturnMutation
>
export type CreateTaxReturnMutationResult =
  Apollo.MutationResult<CreateTaxReturnMutation>
export type CreateTaxReturnMutationOptions = Apollo.BaseMutationOptions<
  CreateTaxReturnMutation,
  CreateTaxReturnMutationVariables
>
export const NationalRegisterDocument = gql`
  query NationalRegister($phoneNumber: String!) {
    individual(phoneNumber: $phoneNumber) {
      nationalId
      name
      phoneNumber
    }
  }
`

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
export function useNationalRegisterQuery(
  baseOptions: Apollo.QueryHookOptions<
    NationalRegisterQuery,
    NationalRegisterQueryVariables
  > &
    (
      | { variables: NationalRegisterQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<NationalRegisterQuery, NationalRegisterQueryVariables>(
    NationalRegisterDocument,
    options,
  )
}
export function useNationalRegisterLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    NationalRegisterQuery,
    NationalRegisterQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    NationalRegisterQuery,
    NationalRegisterQueryVariables
  >(NationalRegisterDocument, options)
}
export function useNationalRegisterSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        NationalRegisterQuery,
        NationalRegisterQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<
    NationalRegisterQuery,
    NationalRegisterQueryVariables
  >(NationalRegisterDocument, options)
}
export type NationalRegisterQueryHookResult = ReturnType<
  typeof useNationalRegisterQuery
>
export type NationalRegisterLazyQueryHookResult = ReturnType<
  typeof useNationalRegisterLazyQuery
>
export type NationalRegisterSuspenseQueryHookResult = ReturnType<
  typeof useNationalRegisterSuspenseQuery
>
export type NationalRegisterQueryResult = Apollo.QueryResult<
  NationalRegisterQuery,
  NationalRegisterQueryVariables
>
export const TaxReturnDocument = gql`
  query TaxReturn($nationalId: String!) {
    taxReturn(nationalId: $nationalId) {
      nationalId
      name
      email
      address
      phoneNumber
      hasAccidentInsurance
      bankAccount
      salaries {
        employerName
        amount
      }
      benefits {
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
        appraisal
      }
      vehicles {
        registrationNumber
        purchasePrice
      }
      mortgages {
        lenderName
        loanAmount
        remainingBalance
      }
    }
  }
`

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
export function useTaxReturnQuery(
  baseOptions: Apollo.QueryHookOptions<
    TaxReturnQuery,
    TaxReturnQueryVariables
  > &
    (
      | { variables: TaxReturnQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<TaxReturnQuery, TaxReturnQueryVariables>(
    TaxReturnDocument,
    options,
  )
}
export function useTaxReturnLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TaxReturnQuery,
    TaxReturnQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<TaxReturnQuery, TaxReturnQueryVariables>(
    TaxReturnDocument,
    options,
  )
}
export function useTaxReturnSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<TaxReturnQuery, TaxReturnQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<TaxReturnQuery, TaxReturnQueryVariables>(
    TaxReturnDocument,
    options,
  )
}
export type TaxReturnQueryHookResult = ReturnType<typeof useTaxReturnQuery>
export type TaxReturnLazyQueryHookResult = ReturnType<
  typeof useTaxReturnLazyQuery
>
export type TaxReturnSuspenseQueryHookResult = ReturnType<
  typeof useTaxReturnSuspenseQuery
>
export type TaxReturnQueryResult = Apollo.QueryResult<
  TaxReturnQuery,
  TaxReturnQueryVariables
>
export const UpdateTaxReturnDocument = gql`
  mutation UpdateTaxReturn(
    $nationalId: String!
    $input: TaxReturnUpdateInput!
  ) {
    updateTaxReturn(nationalId: $nationalId, input: $input) {
      nationalId
      email
      address
      phoneNumber
      hasAccidentInsurance
      bankAccount
      vehicles {
        registrationNumber
        yearOfPurchase
        purchasePrice
      }
      salaries {
        employerName
        amount
      }
      benefits {
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
        appraisal
      }
      mortgages {
        lenderName
        loanAmount
        remainingBalance
      }
    }
  }
`
export type UpdateTaxReturnMutationFn = Apollo.MutationFunction<
  UpdateTaxReturnMutation,
  UpdateTaxReturnMutationVariables
>

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
export function useUpdateTaxReturnMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateTaxReturnMutation,
    UpdateTaxReturnMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateTaxReturnMutation,
    UpdateTaxReturnMutationVariables
  >(UpdateTaxReturnDocument, options)
}
export type UpdateTaxReturnMutationHookResult = ReturnType<
  typeof useUpdateTaxReturnMutation
>
export type UpdateTaxReturnMutationResult =
  Apollo.MutationResult<UpdateTaxReturnMutation>
export type UpdateTaxReturnMutationOptions = Apollo.BaseMutationOptions<
  UpdateTaxReturnMutation,
  UpdateTaxReturnMutationVariables
>
