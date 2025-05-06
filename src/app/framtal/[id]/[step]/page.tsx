'use client'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import { getFlatRouteSteps } from '../../routeSections'
import { useTaxContext } from '@/components/Utils/context/taxContext'
import { useEffect } from 'react'
import { useUserContext } from '@/components/Utils/context/userContext'

const stepComponentMap: Record<string, React.ComponentType<unknown>> = {
  upplysingar: dynamic(() => import('@/components/steps/Upplysingar')),
  gagnaoflun: dynamic(() => import('@/components/steps/Gagnaoflun')),
  personuupplysingar: dynamic(
    () => import('@/components/steps/PersonuUpplysingar'),
  ),
  bankareikningur: dynamic(() => import('@/components/steps/Bankareikningur')),
  slysatrygging: dynamic(() => import('@/components/steps/Slysatrygging')),
  laun: dynamic(() => import('@/components/steps/Laun')),
  'hlunnindi-og-styrkir': dynamic(
    () => import('@/components/steps/HlunnindiOgStyrkir'),
  ),
  'lifeyrir-og-baetur': dynamic(() => import('@/components/steps/Lifeyrir')),
  fradrattur: dynamic(() => import('@/components/steps/Fradrattur')),
  'adrar-tekjur': dynamic(() => import('@/components/steps/AdrarTekjur')),

  eignir: dynamic(() => import('@/components/steps/Eignir')),
  okutaeki: dynamic(() => import('@/components/steps/Okutaeki')),
  'adrar-eignir': dynamic(() => import('@/components/steps/AdrarEignir')),
  ibudalan: dynamic(() => import('@/components/steps/Ibudalan')),
  'adrar-skuldir': dynamic(() => import('@/components/steps/AdrarSkuldir')),
  fylgiskjol: dynamic(() => import('@/components/steps/Fylgiskjol')),
  samantekt: dynamic(() => import('@/components/steps/Samantekt')),
  stadfesting: dynamic(() => import('@/components/steps/Stadfesting')),
}

export default function StepPage() {
  const params = useParams()
  const step = params?.step as string | undefined
  const validSteps = getFlatRouteSteps()

  const { fetchTaxReturn } = useTaxContext()
  const { user, fetchNationalRegister } = useUserContext()

  useEffect(() => {
    fetchTaxReturn(user?.nationalId ?? '0000000000')
  }, [fetchTaxReturn, user?.nationalId])

  useEffect(() => {
    fetchNationalRegister(user?.phoneNumber ?? '7884888')
  }, [fetchNationalRegister, user?.phoneNumber])

  if (!step || !validSteps.includes(step)) {
    notFound()
  }

  const StepComponent = stepComponentMap[step]

  if (!StepComponent) {
    notFound()
  }

  return (
    <div className="p-4">
      <StepComponent />
    </div>
  )
}
