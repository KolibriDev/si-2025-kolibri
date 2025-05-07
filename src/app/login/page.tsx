import { Login } from '@/components/Login/Login'

import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Innskráning | island.is',
}

export default async function LoginPage() {
  return <Login />
}
