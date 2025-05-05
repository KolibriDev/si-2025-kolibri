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

export type Query = {
  __typename?: 'Query'
  greetings?: Maybe<Scalars['String']['output']>
}

export type QueryGreetingsArgs = {
  nationalId: Scalars['String']['input']
}

export type GetGreetingsQueryVariables = Exact<{
  nationalId: Scalars['String']['input']
}>

export type GetGreetingsQuery = {
  __typename?: 'Query'
  greetings?: string | null
}

export const GetGreetingsDocument = gql`
  query GetGreetings($nationalId: String!) {
    greetings(nationalId: $nationalId)
  }
`

/**
 * __useGetGreetingsQuery__
 *
 * To run a query within a React component, call `useGetGreetingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGreetingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGreetingsQuery({
 *   variables: {
 *      nationalId: // value for 'nationalId'
 *   },
 * });
 */
export function useGetGreetingsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetGreetingsQuery,
    GetGreetingsQueryVariables
  > &
    (
      | { variables: GetGreetingsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetGreetingsQuery, GetGreetingsQueryVariables>(
    GetGreetingsDocument,
    options,
  )
}
export function useGetGreetingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetGreetingsQuery,
    GetGreetingsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetGreetingsQuery, GetGreetingsQueryVariables>(
    GetGreetingsDocument,
    options,
  )
}
export function useGetGreetingsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetGreetingsQuery,
        GetGreetingsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetGreetingsQuery, GetGreetingsQueryVariables>(
    GetGreetingsDocument,
    options,
  )
}
export type GetGreetingsQueryHookResult = ReturnType<
  typeof useGetGreetingsQuery
>
export type GetGreetingsLazyQueryHookResult = ReturnType<
  typeof useGetGreetingsLazyQuery
>
export type GetGreetingsSuspenseQueryHookResult = ReturnType<
  typeof useGetGreetingsSuspenseQuery
>
export type GetGreetingsQueryResult = Apollo.QueryResult<
  GetGreetingsQuery,
  GetGreetingsQueryVariables
>
