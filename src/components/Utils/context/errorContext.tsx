'use client'

import React, { createContext, ReactNode, useContext, useState } from 'react'

interface ErrorType {
  errors: string[]
  setError: (field: string) => void
  clearError: (field: string) => void
  clearAllErrors: () => void
}

const ErrorContext = createContext<ErrorType | undefined>(undefined)

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [errors, setErrors] = useState<string[]>([])

  const setError = (field: string) => {
    setErrors((prev) => [...prev, field])
  }

  const clearError = (field: string) => {
    setErrors((prev) => prev.filter((a) => a !== field))
  }

  const clearAllErrors = () => {
    setErrors([])
  }

  return (
    <ErrorContext.Provider
      value={{ errors, setError, clearError, clearAllErrors }}
    >
      {children}
    </ErrorContext.Provider>
  )
}

export const useError = () => useContext(ErrorContext)
