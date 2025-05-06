'use client'

import { useRouter, useParams } from 'next/navigation'
import { Box } from '@/components/Box/Box'
import { Text } from '@/components/Text/Text'
import * as styles from './StepsFooter.css'
import { Button } from '@/components/Button/Button'
import { Icon } from '@/components/IconRC/Icon'
import { getNextStep, getPreviousStep } from '@/app/framtal/routeSections'
import { useTaxContext } from '@/components/Utils/context/taxContext'
import { useUserContext } from '@/components/Utils/context/userContext'

export const StepsFooter = () => {
  const params = useParams()
  const currentStep = params?.step as string | undefined
  if (!currentStep) {
    return null
  }

  const router = useRouter()
  const nextStep = getNextStep(currentStep)
  const prevStep = getPreviousStep(currentStep)
  const isFirstStep = currentStep === 'upplysingar'
  const { taxReturn, fetchTaxReturn, isLoading } = useTaxContext()
  const { user } = useUserContext()

  const handleNext = () => {
    if (!nextStep) return

    if (currentStep === 'gagnaoflun' && user?.nationalId) {
      fetchTaxReturn(user.nationalId)
    } else {
      router.push(`${nextStep}`)
    }
  }

  const handleBack = () => {
    if (prevStep) {
      router.push(`${prevStep}`)
    }
  }

  console.log('taxReturn', taxReturn)

  return (
    <Box display="flex" className={styles.footer}>
      <Button
        variant="primary"
        onClick={handleNext}
        disabled={!nextStep}
        loading={isLoading}
      >
        <div className={styles.primaryButton}>
          <Text variant="h5">Halda áfram</Text>
          <Icon icon="arrowForward" />
        </div>
      </Button>
      <Button
        variant="ghost"
        colorScheme={isFirstStep ? 'destructive' : 'default'}
        onClick={handleBack}
      >
        <Text variant="h5">{isFirstStep ? 'Hætta við' : 'Til baka'}</Text>
      </Button>
    </Box>
  )
}
