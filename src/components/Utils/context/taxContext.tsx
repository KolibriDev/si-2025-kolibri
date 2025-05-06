'use client'

import { TaxReturnQuery, useTaxReturnLazyQuery } from '@/generated/graphql'
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useMemo,
} from 'react'

interface TaxReturnContextType {
  taxReturn: TaxReturnQuery['taxReturn'] | undefined | null
  setTaxReturn: (
    taxReturn: TaxReturnQuery['taxReturn'] | undefined | null,
  ) => void
  fetchTaxReturn: (nationalId: string) => void
  isLoading: boolean
}

const TaxContext = createContext<TaxReturnContextType | undefined>(undefined)
export const TaxContextProvider = ({ children }: { children: ReactNode }) => {
  const [taxReturn, setTaxReturn] = useState<
    TaxReturnQuery['taxReturn'] | undefined | null
  >(undefined)

  const [executeFetchTaxReturn, { loading }] = useTaxReturnLazyQuery({
    onCompleted: (data) => {
      console.log('Fetched tax return:', data)
      setTaxReturn(data?.taxReturn)
    },
    onError: (error) => {
      console.error('Error fetching tax return:', error)
    },
  })

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
