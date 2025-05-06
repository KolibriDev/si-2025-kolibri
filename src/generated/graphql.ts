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
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Benefit = {
  __typename?: 'Benefit';
  amount?: Maybe<Scalars['Float']['output']>;
  payerName?: Maybe<Scalars['String']['output']>;
  payerNationalId?: Maybe<Scalars['String']['output']>;
};

export type Deduction = {
  __typename?: 'Deduction';
  amount?: Maybe<Scalars['Float']['output']>;
  deductionType?: Maybe<DeductionType>;
};

export enum DeductionType {
  Other = 'OTHER'
}

export type Mortgage = {
  __typename?: 'Mortgage';
  interestPayments?: Maybe<Scalars['Float']['output']>;
  lenderName?: Maybe<Scalars['String']['output']>;
  lenderNationalId?: Maybe<Scalars['String']['output']>;
  loanAmount?: Maybe<Scalars['Float']['output']>;
  loanNumber?: Maybe<Scalars['String']['output']>;
  loanStartDate?: Maybe<Scalars['String']['output']>;
  loanTermYears?: Maybe<Scalars['Int']['output']>;
  principalPayments?: Maybe<Scalars['Float']['output']>;
  realEstateNumber?: Maybe<Scalars['String']['output']>;
  remainingBalance?: Maybe<Scalars['Float']['output']>;
  totalAnnualPayments?: Maybe<Scalars['Float']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  sayHi?: Maybe<Scalars['String']['output']>;
};


export type MutationSayHiArgs = {
  name: Scalars['String']['input']
}

export type Query = {
  __typename?: 'Query';
  taxReturn?: Maybe<TaxReturn>;
};


export type QueryTaxReturnArgs = {
  nationalId: Scalars['String']['input'];
};

export type RealEstate = {
  __typename?: 'RealEstate';
  address?: Maybe<Scalars['String']['output']>;
  appraisal?: Maybe<Scalars['Float']['output']>;
  number?: Maybe<Scalars['String']['output']>;
};

export type Salary = {
  __typename?: 'Salary';
  amount?: Maybe<Scalars['Float']['output']>;
  employerName?: Maybe<Scalars['String']['output']>;
  employerNationalId?: Maybe<Scalars['String']['output']>;
};

export type TaxReturn = {
  __typename?: 'TaxReturn';
  address?: Maybe<Scalars['String']['output']>;
  bankAccount?: Maybe<Scalars['String']['output']>;
  benefits?: Maybe<Array<Benefit>>;
  deductions?: Maybe<Array<Deduction>>;
  email?: Maybe<Scalars['String']['output']>;
  hasAccidentInsurance?: Maybe<Scalars['Boolean']['output']>;
  mortgages?: Maybe<Array<Mortgage>>;
  name?: Maybe<Scalars['String']['output']>;
  nationalId: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  realEstates?: Maybe<Array<RealEstate>>;
  salaries?: Maybe<Array<Salary>>;
  vehicles?: Maybe<Array<Vehicle>>;
};

export type Vehicle = {
  __typename?: 'Vehicle';
  purchasePrice?: Maybe<Scalars['Float']['output']>;
  registrationNumber?: Maybe<Scalars['String']['output']>;
  yearOfPurchase?: Maybe<Scalars['Int']['output']>;
};

export type TaxReturnQueryVariables = Exact<{
  nationalId: Scalars['String']['input'];
}>;


export type TaxReturnQuery = { __typename?: 'Query', taxReturn?: { __typename?: 'TaxReturn', nationalId: string, name?: string | null, email?: string | null, address?: string | null, phoneNumber?: string | null, hasAccidentInsurance?: boolean | null, bankAccount?: string | null, salaries?: Array<{ __typename?: 'Salary', employerName?: string | null, amount?: number | null }> | null, benefits?: Array<{ __typename?: 'Benefit', payerName?: string | null, amount?: number | null }> | null, deductions?: Array<{ __typename?: 'Deduction', deductionType?: DeductionType | null, amount?: number | null }> | null, realEstates?: Array<{ __typename?: 'RealEstate', number?: string | null, address?: string | null, appraisal?: number | null }> | null, vehicles?: Array<{ __typename?: 'Vehicle', registrationNumber?: string | null, purchasePrice?: number | null }> | null, mortgages?: Array<{ __typename?: 'Mortgage', lenderName?: string | null, loanAmount?: number | null, remainingBalance?: number | null }> | null } | null };

export type SayHiMutationVariables = Exact<{
  name: Scalars['String']['input']
}>

export type SayHiMutation = { __typename?: 'Mutation'; sayHi?: string | null }

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
