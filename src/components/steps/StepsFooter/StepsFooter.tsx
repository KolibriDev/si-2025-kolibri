'use client'

import { useRouter, useParams } from 'next/navigation'
import { Box } from '@/components/Box/Box'
import { Text } from '@/components/Text/Text'
import * as styles from './StepsFooter.css'
import { Button } from '@/components/Button/Button'
import { Icon } from '@/components/IconRC/Icon'
import { getNextStep, getPreviousStep } from '@/app/framtal/routeSections'
import { useTaxReturnLazyQuery } from '@/generated/graphql'

export const StepsFooter = () => {
  const params = useParams()
  const currentStep = params?.step as string | undefined
  if (!currentStep) {
    return null
  }

  const router = useRouter()
  const nextStep = getNextStep(currentStep)
  const prevStep = getPreviousStep(currentStep)

  const [fetchTaxReturn, { loading }] = useTaxReturnLazyQuery({
    variables: { nationalId: '0000000000' },
    onCompleted: (data) => {
      console.log('Fetched tax return:', data)
      router.push(`${nextStep}`)
    },
    onError: (error) => {
      console.error('Error fetching tax return:', error)
    },
  })

  const handleNext = () => {
    if (!nextStep) return

    if (currentStep === 'gagnaoflun') {
      fetchTaxReturn()
    } else {
      router.push(`${nextStep}`)
    }
  }

  const handleBack = () => {
    if (prevStep) {
      router.push(`${prevStep}`)
    }
  }

  return (
    <Box display="flex" className={styles.footer}>
      <Button
        variant="primary"
        onClick={handleNext}
        disabled={!nextStep}
        loading={loading}
      >
        <div className={styles.primaryButton}>
          <Text variant="h5">Halda áfram</Text>
          <Icon icon="arrowForward" />
        </div>
      </Button>
      <Button variant="ghost" onClick={handleBack} disabled={!prevStep}>
        <Text variant="h5">Tilbaka</Text>
      </Button>
    </Box>
  )
}
