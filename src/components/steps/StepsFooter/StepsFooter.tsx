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

    if (
      currentStep === 'gagnaoflun' &&
      !taxReturn &&
      isAcceptingTerms &&
      user?.nationalId
    ) {
      createTaxReturn(user.nationalId)
      router.push(`${nextStep}`)
    }

    if (taxReturn) {
      router.push(`${nextStep}`)
      return
    }

    if (!isAcceptingTerms) {
      error?.setError('ACCEPTING_TERMS')
    }
  }

  const handleBack = () => {
    if (prevStep) {
      router.push(`${prevStep}`)
    } else {
      router.push(`${nextStep}`)
    }
  }

  const handleSubmit = async () => {
    if (user?.nationalId) {
      await submitTaxReturn(user.nationalId)
      router.push(`${nextStep}`)
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
            <Icon icon="arrowForward" />
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
            <Text variant="h5">{`Senda framtal`}</Text>
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
