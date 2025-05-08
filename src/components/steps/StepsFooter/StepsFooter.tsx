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
import { useError } from '@/components/Utils/context/errorContext'
import { StaticIcon } from '@/components/IconRC/StaticIcon'

export const StepsFooter = () => {
  const params = useParams()
  const currentStep = params?.step as string | undefined
  if (!currentStep) {
    return null
  }

  const error = useError()
  const router = useRouter()
  const nextStep = getNextStep(currentStep)
  const prevStep = getPreviousStep(currentStep)
  const isFirstStep = currentStep === 'upplysingar'
  const { user, isAcceptingTerms } = useUserContext()
  const {
    taxReturn,
    createTaxReturn,
    submitTaxReturn,
    isLoading,
    isSubmitting,
  } = useTaxContext()
  const isFinalStep = currentStep === 'samantekt'

  const handleNext = async () => {
    if (!nextStep) return

    localStorage.setItem('currentStep', nextStep)
    if (
      currentStep === 'gagnaoflun' &&
      !taxReturn &&
      isAcceptingTerms &&
      user?.nationalId
    ) {
      await createTaxReturn(user.nationalId)
      router.push(`${nextStep}`)
    } else if (
      currentStep === 'gagnaoflun' &&
      !isAcceptingTerms &&
      !taxReturn
    ) {
      error?.setError('ACCEPTING_TERMS')
    } else {
      router.push(`${nextStep}`)
      return
    }
  }

  const handleBack = () => {
    const targetStep = prevStep ?? nextStep
    if (targetStep) {
      localStorage.setItem('currentStep', targetStep)
      router.push(`${targetStep}`)
    }
  }

  const handleSubmit = async () => {
    if (user?.nationalId) {
      await submitTaxReturn(user.nationalId)
      if (nextStep) {
        localStorage.setItem('currentStep', nextStep)
        router.push(`${nextStep}`)
      }
    }
  }

  if (currentStep === 'stadfesting') {
    return (
      <Box display="flex" className={styles.footer}>
        <Button variant="primary" onClick={() => router.push('/umsoknir')}>
          <div className={styles.primaryButton}>
            <Text variant="h5">Mínar síður</Text>
            <Icon icon="arrowForward" />
          </div>
        </Button>
      </Box>
    )
  }

  return (
    <Box display="flex" className={styles.footer}>
      {!isFinalStep ? (
        <Button
          variant="primary"
          onClick={handleNext}
          disabled={!nextStep}
          loading={isLoading}
        >
          <div className={styles.primaryButton}>
            <Text variant="h5">Halda áfram</Text>
            <StaticIcon icon="arrowForward" />
          </div>
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!nextStep}
          loading={isSubmitting}
        >
          <div className={styles.primaryButton}>
            <Text variant="h5">{`Skila framtali`}</Text>
          </div>
        </Button>
      )}
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
