'use client'

import { useRouter, useParams } from 'next/navigation'
import { Box } from '@/components/Box/Box'
import { Text } from '@/components/Text/Text'
import * as styles from './StepsFooter.css'
import { Button } from '@/components/Button/Button'
import { Icon } from '@/components/IconRC/Icon'
import { getNextStep, getPreviousStep } from '@/app/framtal/routeSections'
// import {
//   TaxReturn,
//   TaxReturnQuery,
//   useTaxReturnQuery,
// } from '@/generated/graphql'
// import { useState } from 'react'

export const StepsFooter = () => {
  const params = useParams()
  const currentStep = params.step as string | undefined
  if (!currentStep) {
    return null
  }

  const router = useRouter()
  const nextStep = getNextStep(currentStep)
  const prevStep = getPreviousStep(currentStep)

  // const [data, setData] = useState<TaxReturn | undefined>(undefined)

  const handleNext = () => {
    if (!nextStep) return

    router.push(`${nextStep}`)

    // console.log('Next step:', nextStep)
    // if (currentStep === 'gagnaoflun') {
    //   useTaxReturnQuery({
    //     variables: {
    //       nationalId: '0000000000',
    //     },
    //     onCompleted: (data: TaxReturnQuery) => {
    //       console.log('Fetched tax return:', data)
    //       router.push(`${nextStep}`)
    //     },
    //     onError: (error: Error) => {
    //       console.error('Error fetching tax return:', error)
    //       setData(undefined)
    //     },
    //   })
    // } else {
    //   router.push(`${nextStep}`)
    // }
  }

  const handleBack = () => {
    if (prevStep) {
      router.push(`${prevStep}`)
    }
  }

  return (
    <Box display="flex" className={styles.footer}>
      <Button variant="primary" onClick={handleNext} disabled={!nextStep}>
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
