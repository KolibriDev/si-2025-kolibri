'use client'

import { TaxReturnQuery } from '@/generated/graphql'
import { createContext, useContext, ReactNode, useState } from 'react'

interface TaxReturnContextType {
  taxReturn: TaxReturnQuery | undefined | null
  setTaxReturn: (taxReturn: TaxReturnQuery | undefined | null) => void
}

const TaxContext = createContext<TaxReturnContextType | undefined>(undefined)

export const TaxContextProvider = ({ children }: { children: ReactNode }) => {
  const [taxReturn, setTaxReturn] = useState<TaxReturnQuery | undefined | null>(
    undefined,
  )

  const value: TaxReturnContextType = {
    taxReturn: taxReturn,
    setTaxReturn: setTaxReturn,
  }
  return <TaxContext.Provider value={value}>{children}</TaxContext.Provider>
}
export const useTaxContext = () => {
  const context = useContext(TaxContext)
  if (!context) {
    throw new Error('useTaxContext must be used within a TaxProvider')
  }
  return context
}
