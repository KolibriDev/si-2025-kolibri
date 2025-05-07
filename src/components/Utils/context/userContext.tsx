'use client'

import {
  NationalRegisterQuery,
  useNationalRegisterLazyQuery,
} from '@/generated/graphql'
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react'
import { useError } from './errorContext'

type User = NationalRegisterQuery['individual'] | undefined | null

interface UserContextType {
  user: User
  setUser: (user: User) => void
  fetchNationalRegister: (phoneNumber: string) => void
  isLoading: boolean
  isAcceptingTerms: boolean
  setIsAcceptingTerms: Dispatch<SetStateAction<boolean>>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(undefined)
  const [isAcceptingTerms, setIsAcceptingTerms] = useState<boolean>(false)

  const [executeFetchNationalRegister, { loading }] =
    useNationalRegisterLazyQuery({
      onCompleted: (data) => {
        setUser(data.individual)
      },
      onError: (error) => {
        console.error('Error fetching tax return:', error)
      },
    })

  const fetchNationalRegister = useCallback(
    (phoneNumber: string) => {
      executeFetchNationalRegister({ variables: { phoneNumber } })
    },
    [executeFetchNationalRegister],
  )

  const value: UserContextType = {
    user,
    setUser,
    fetchNationalRegister,
    isLoading: loading,
    isAcceptingTerms,
    setIsAcceptingTerms,
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
