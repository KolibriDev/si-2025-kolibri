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
} from 'react'

interface UserContextType {
  user: NationalRegisterQuery['individual'] | undefined | null
  setUser: (
    user: NationalRegisterQuery['individual'] | undefined | null,
  ) => void
  fetchNationalRegister: (phoneNumber: string) => void
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<
    NationalRegisterQuery['individual'] | undefined | null
  >(undefined)

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
    user: user,
    setUser: setUser,
    fetchNationalRegister,
    isLoading: loading,
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
