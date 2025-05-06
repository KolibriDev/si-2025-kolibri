'use client'

import {
  TaxReturnDocument,
  TaxReturnQuery,
  useCreateTaxReturnMutation,
  useTaxReturnLazyQuery,
  useUpdateTaxReturnMutation,
} from '@/generated/graphql'
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useMemo,
} from 'react'
import { mapTaxReturnToUpdateInput } from './mappers'
import { useApolloClient } from '@apollo/client'

interface TaxReturnContextType {
  taxReturn: TaxReturnQuery['taxReturn'] | undefined | null
  setTaxReturn: (
    taxReturn: TaxReturnQuery['taxReturn'] | undefined | null,
  ) => void
  fetchTaxReturn: (nationalId: string) => void
  createTaxReturn: (nationalId: string) => void
  updateTaxReturn: (taxReturn: TaxReturnQuery['taxReturn']) => void
  isLoading: boolean
}

const TaxContext = createContext<TaxReturnContextType | undefined>(undefined)
export const TaxContextProvider = ({ children }: { children: ReactNode }) => {
  const [taxReturn, setTaxReturn] = useState<
    TaxReturnQuery['taxReturn'] | undefined | null
  >(undefined)
  const apolloClient = useApolloClient()

  const [executeFetchTaxReturn, { loading }] = useTaxReturnLazyQuery({
    onCompleted: (data) => {
      console.log('Fetched tax return:', data)
      setTaxReturn(data?.taxReturn)
    },
    onError: (error) => {
      console.error('Error fetching tax return:', error)
    },
  })

  const [executeCreateTaxReturn] = useCreateTaxReturnMutation({
    onCompleted: (data) => {
      setTaxReturn(data?.createTaxReturn)
    },
    onError: (error) => {
      console.error('Error creating tax return:', error)
    },
  })

  const [executePutTaxReturn] = useUpdateTaxReturnMutation({
    onCompleted: (data) => {
      setTaxReturn(data?.updateTaxReturn)
      if (!data?.updateTaxReturn) {
        console.error('No tax return data returned from update')
        return
      }
      apolloClient.writeQuery({
        query: TaxReturnDocument,
        variables: { nationalId: data.updateTaxReturn.nationalId },
        data: { taxReturn: data.updateTaxReturn },
      })
    },
    onError: (error) => {
      console.error('Error updating tax return:', error)
    },
  })
  const updateTaxReturn = useCallback(
    (taxReturn: TaxReturnQuery['taxReturn']) => {
      if (!taxReturn) {
        console.error('No tax return provided for update')
        return
      }
      const taxReturnUpdateInput = mapTaxReturnToUpdateInput(taxReturn)
      executePutTaxReturn({
        variables: {
          nationalId: taxReturn.nationalId,
          input: taxReturnUpdateInput,
        },
      })
    },
    [executePutTaxReturn],
  )

  const createTaxReturn = useCallback(
    (nationalId: string) => {
      executeCreateTaxReturn({ variables: { nationalId } })
    },
    [executeCreateTaxReturn],
  )

  const fetchTaxReturn = useCallback(
    (nationalId: string) => {
      executeFetchTaxReturn({ variables: { nationalId } })
    },
    [executeFetchTaxReturn],
  )

  const value = useMemo(
    () => ({
      taxReturn,
      setTaxReturn,
      fetchTaxReturn,
      createTaxReturn,
      updateTaxReturn,
      isLoading: loading,
    }),
    [taxReturn, fetchTaxReturn, loading],
  )

  return <TaxContext.Provider value={value}>{children}</TaxContext.Provider>
}
export const useTaxContext = () => {
  const context = useContext(TaxContext)
  if (!context) {
    throw new Error('useTaxContext must be used within a TaxProvider')
  }
  return context
}
