'use client'

import { NationalRegisterQuery } from '@/generated/graphql'
import { createContext, useContext, ReactNode, useState } from 'react'

interface UserContextType {
  user: NationalRegisterQuery | undefined | null
  setUser: (user: NationalRegisterQuery | undefined | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<NationalRegisterQuery | undefined | null>(
    undefined,
  )

  const value: UserContextType = {
    user: user,
    setUser: setUser,
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}
